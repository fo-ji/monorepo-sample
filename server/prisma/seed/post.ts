import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const post = async () => {
  const users = await prisma.user.findMany();
  users.forEach(async (user) => {
    await prisma.post.createMany({
      data: Array(10)
        .fill('')
        .map((_, idx) => {
          return {
            title: `${user.name}のタイトル（${idx + 1}）`,
            text: `Hello!\n${user.name}の${idx + 1}回目の投稿です！`,
            userId: user.id,
          };
        }),
    });
  });
};
