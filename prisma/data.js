const { Prisma } = require('@prisma/client');

const categories = [
  {
    name: 'Haircut',
  },
  {
    name: 'Massage',
  },
  {
    name: 'Facial',
  },
  {
    name: 'Colour, Wash & Style',
  },
];

const services = [
  {
    name: 'Adult Haircut',
    price: new Prisma.Decimal(15.00),
    category_id: 1,
  },
  {
    name: 'Kids Haircut',
    description: 'Kids under 12',
    price: new Prisma.Decimal(8.00),
    category_id: 1,
  },
  {
    name: 'Head Massage',
    price: new Prisma.Decimal(10.00),
    category_id: 2,
  },
  {
    name: 'Gold Mask Facial',
    price: new Prisma.Decimal(15.00),
    category_id: 3,
  },
  {
    name: 'Black Mask',
    price: new Prisma.Decimal(10.00),
    category_id: 3,
  },
  {
    name: 'Aloevera Mask',
    price: new Prisma.Decimal(20.00),
    category_id: 3,
  },
  {
    name: 'Wash and Style',
    price: new Prisma.Decimal(10.00),
    category_id: 4,
  },
  {
    name: 'Shave and Trim',
    price: new Prisma.Decimal(10.00),
    category_id: 4,
  },
];

module.exports = {
  services,
  categories,
};