import { prisma } from '../src/client';
import { ensureUserSetup } from '../src/helpers';

async function main() {
  const users = await prisma.user.findMany();
  for (const user of users) {
    await ensureUserSetup(user.id, user.email);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
