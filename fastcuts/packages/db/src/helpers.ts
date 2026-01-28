import { prisma } from './client';

function generateAffiliateCode(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function ensureUserSetup(userId: string, email?: string | null) {
  const workspace = await prisma.workspace.findFirst({
    where: { ownerId: userId }
  });

  if (!workspace) {
    await prisma.workspace.create({
      data: {
        ownerId: userId,
        name: email ? `${email.split('@')[0]}'s Workspace` : 'My Workspace'
      }
    });
  }

  const affiliate = await prisma.affiliate.findUnique({
    where: { userId }
  });

  if (!affiliate) {
    let code = generateAffiliateCode(6);
    let exists = await prisma.affiliate.findUnique({ where: { code } });
    while (exists) {
      code = generateAffiliateCode(7);
      exists = await prisma.affiliate.findUnique({ where: { code } });
    }

    await prisma.affiliate.create({
      data: {
        userId,
        code
      }
    });
  }
}
