/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  const userId = 'test-user-id';
  const testUser = 'Test User';
  await prisma.user.create({
    data: {
      id: userId,
      name: testUser,
      email: testUser,
    },
  });

  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      userId: userId,
      id: firstPostId,
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`',
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
