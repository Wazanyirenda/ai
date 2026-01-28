import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/db/client';
import { projectSchema } from '@/lib/validators';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
  }

  const workspace = await prisma.workspace.findFirst({
    where: { ownerId: session.user.id }
  });

  if (!workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  const project = await prisma.project.create({
    data: {
      title: parsed.data.title,
      sourceType: parsed.data.sourceType,
      sourceUrl: parsed.data.sourceUrl ?? undefined,
      workspaceId: workspace.id,
      userId: session.user.id
    }
  });

  return NextResponse.json({ project }, { status: 201 });
}
