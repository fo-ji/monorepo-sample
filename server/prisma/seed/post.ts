import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const post = async () => {
  const users = await prisma.user.findMany();
  users.forEach(async (user, idx) => {
    await prisma.post.create({
      data: {
        title: `タイトル${idx}`,
        text: `Hello!\n${idx}回目の投稿です！`,
        userId: user.id,
      },
    });
  });
};
