import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/db/client';
import { affiliateTrackSchema } from '@/lib/validators';

const ANON_COOKIE = 'fastcuts_anon';

function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? 'fastcuts';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = affiliateTrackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { code: parsed.data.code }
  });

  if (!affiliate) {
    return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
  }

  const cookieStore = cookies();
  let anonId = cookieStore.get(ANON_COOKIE)?.value;
  const isNewAnon = !anonId;
  if (!anonId) {
    anonId = crypto.randomUUID();
  }

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const existing = await prisma.affiliateClick.findFirst({
    where: {
      affiliateId: affiliate.id,
      anonId,
      createdAt: {
        gte: startOfDay
      }
    }
  });

  if (!existing) {
    const headerStore = headers();
    const forwardedFor = headerStore.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? null;
    const userAgent = headerStore.get('user-agent');
    await prisma.affiliateClick.create({
      data: {
        affiliateId: affiliate.id,
        anonId,
        ipHash: hashIp(ip),
        userAgent
      }
    });
  }

  const response = NextResponse.json({ ok: true });
  if (isNewAnon) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    response.cookies.set(ANON_COOKIE, anonId, {
      path: '/',
      expires
    });
  }

  return response;
}
