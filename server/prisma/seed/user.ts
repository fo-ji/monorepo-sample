import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const user = async () => {
  await prisma.user.createMany({
    data: Array(10)
      .fill(0)
      .map((v, idx) => ({
        name: `テスト${idx}`,
        email: `test${idx}@example.com`,
        password: `password${idx}`,
      })),
  });
};
