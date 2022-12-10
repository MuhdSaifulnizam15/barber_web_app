const { PrismaClient } = require('@prisma/client');
const { categories, services } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.category.deleteMany();
    console.log('Deleted records in categories table');

    await prisma.service.deleteMany();
    console.log('Deleted records in servicse table');

    await prisma.$queryRaw`ALTER TABLE Service AUTO_INCREMENT = 1`;
    console.log('reset service auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
    console.log('reset category auto increment to 1');

    await prisma.category.createMany({
      data: categories,
    });
    console.log('Added category data');

    await prisma.service.createMany({
      data: services,
    });
    console.log('Added service data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();