import { z } from "zod";
import { createStockMovement, getAllProducts } from "../lib/api.ts"; // Adjust import path to your API file
import { MovementsResponse, ProductResponse } from "../lib/types.ts";
import { server } from "../index.ts";

const createStockMovementSchema = z.object({
  productName: z
    .string()
    .min(1)
    .describe('The full name of the product (e.g., "Laptop Dell XPS")'),
  quantity: z
    .number()
    .nonnegative()
    .describe("The quantity of the stock movement"),
  type: z
    .enum(["ENTRY", "EXIT"])
    .describe("The type of stock movement (ENTRY or EXIT)"),
});

async function resolveProductId(productName: string): Promise<number> {
  try {
    const response: ProductResponse = await getAllProducts(100, 1);
    const products = response.products;
    const product = products.find(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
    if (!product) {
      throw new Error(`Product "${productName}" not found`);
    }
    return product.id;
  } catch (error) {
    throw new Error(
      `Failed to resolve product "${productName}": ${(error as Error).message}`
    );
  }
}

server.tool(
  "create-stock-movement",
  {
    title: "Create Stock Movement",
    description:
      "Creates a stock movement (entry or exit) for a product by its name in the inventory",
    parameters: createStockMovementSchema,
  },
  async ({
    productName,
    quantity,
    type,
  }: z.infer<typeof createStockMovementSchema>) => {
    try {
      const productId = await resolveProductId(productName);

      const response: MovementsResponse = await createStockMovement(
        productId,
        quantity,
        type
      );

      return {
        content: [
          {
            type: "text",
            text: `Stock movement created successfully for "${productName}": ${JSON.stringify(
              response
            )}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error creating stock movement for "${productName}": ${
              (error as Error).message
            }`,
          },
        ],
        isError: true,
      };
    }
  }
);
