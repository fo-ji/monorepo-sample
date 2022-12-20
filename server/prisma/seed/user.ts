import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const user = async () => {
  await prisma.user.createMany({
    data: Array(50)
      .fill('')
      .map((_, idx) => ({
        name: `ユーザー（${idx + 1}）`,
        email: `test${idx + 1}@example.com`,
        password: `password${idx + 1}`,
      })),
  });
};
