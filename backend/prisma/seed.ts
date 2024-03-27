import * as argon2 from 'argon2';

import usersSeed from './seedsMock/users.json';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.configuration.create({
      data: {
        tokenExpireDuration: '1d',
        appExpireAfter: 15,
      },
    });
  } catch (error) {
    console.log({ error });
  }
  console.log('SEEDED CONFIGURATION');

  const hash = await argon2.hash('user');

  for (const user of usersSeed) {
    await prisma.user.create({
      data: {
        ...user,
        password: hash,
      },
    });
  }
  console.log('SEEDED USERS');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
