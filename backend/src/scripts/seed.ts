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
    // Cria categorias
    const categories = await Promise.all([
      prisma.category.create({ data: { name: 'Eletrônicos' } }),
      prisma.category.create({ data: { name: 'Roupas' } }),
      prisma.category.create({ data: { name: 'Alimentos' } }),
      prisma.category.create({ data: { name: 'Móveis' } }),
      prisma.category.create({ data: { name: 'Livros' } }),
    ]);

    // Cria produtos
    const products: Product[] = [];
    for (let i = 0; i < 30; i++) {
      const category = faker.helpers.arrayElement(categories);
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          stock: faker.number.int({ min: 0, max: 1000 }),
          unitPrice: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
          categoryId: category.id,
        },
      });
      products.push(product);
    }

    // Cria movimentações
    for (let i = 0; i < 500; i++) {
      const product = faker.helpers.arrayElement(products);
      const type = faker.helpers.arrayElement(['ENTRY', 'EXIT'] as const);
      const quantity = faker.number.int({ min: 1, max: 100 });
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

      // Atualizar estoque do produto
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

// Execute the seed function
seedDatabase().catch((error) => {
  console.error('Unhandled error in seed script:', error);
  process.exit(1);
});
