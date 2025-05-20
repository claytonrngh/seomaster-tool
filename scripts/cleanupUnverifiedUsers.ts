// scripts/cleanupUnverifiedUsers.ts
import { prisma } from '../lib/prisma';

async function cleanupUnverifiedUsers() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 1000 * 60 * 60 * 24); // 24 小时前

  const unverifiedUsers = await prisma.user.findMany({
    where: {
      emailVerified: null,
      createdAt: { lt: cutoff },
    },
    select: { id: true, email: true },
  });

  if (unverifiedUsers.length === 0) {
    console.log('✅ No unverified users to clean up.');
    return;
  }

  const ids = unverifiedUsers.map((u) => u.id);

  await prisma.verificationToken.deleteMany({
    where: { userId: { in: ids } },
  });

  await prisma.user.deleteMany({
    where: { id: { in: ids } },
  });

  console.log(`🧹 Cleaned up ${ids.length} unverified user(s):`);
  unverifiedUsers.forEach((u) => {
    console.log(` - ${u.email}`);
  });
}

cleanupUnverifiedUsers()
  .catch((err) => {
    console.error('❌ Cleanup failed:', err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });