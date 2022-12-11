import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const reset = async () => {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
};
