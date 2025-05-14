import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

interface Product {
  id: number;
  name: string;
  description: string | null;
  stock: number;
  unitPrice: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

async function seedDatabase() {
  try {
    const categories = await Promise.all([
      prisma.category.create({ data: { name: 'Eletrônicos' } }),
      prisma.category.create({ data: { name: 'Roupas' } }),
      prisma.category.create({ data: { name: 'Alimentos' } }),
      prisma.category.create({ data: { name: 'Móveis' } }),
      prisma.category.create({ data: { name: 'Livros' } }),
    ]);

    const products: Product[] = [];
    for (let i = 0; i < 100; i++) {
      const category = faker.helpers.arrayElement(categories);
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          stock: faker.number.int({ min: 0, max: 1000 }),
          unitPrice: parseFloat(faker.commerce.price({ min: 1, max: 50 })),
          categoryId: category.id,
        },
      });
      products.push(product);
    }

    for (let i = 0; i < 200; i++) {
      const product = faker.helpers.arrayElement(products);
      const type = faker.helpers.arrayElement(['ENTRY', 'EXIT'] as const);
      const quantity = faker.number.int({ min: 1, max: 30 });
      const totalValue = quantity * product.unitPrice;

      await prisma.movement.create({
        data: {
          productId: product.id,
          quantity,
          totalValue,
          type,
          date: faker.date.recent({ days: 30 }),
        },
      });

      const newStock =
        type === 'ENTRY' ? product.stock + quantity : product.stock - quantity;

      await prisma.product.update({
        where: { id: product.id },
        data: { stock: newStock },
      });
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('Unhandled error in seed script:', error);
  process.exit(1);
});
