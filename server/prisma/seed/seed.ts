import { PrismaClient } from '@prisma/client';
import { reset } from './reset';
import { user } from './user';
import { post } from './post';

const prisma = new PrismaClient();

async function main() {
  await reset();
  await user();
  await post();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
