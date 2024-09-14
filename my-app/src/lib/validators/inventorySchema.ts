import { z } from "zod";

export const inventorySchema = z.object({
  sku: z
    .string()
    .length(6, { message: "SKU must be exactly 6 characters long." }),
  productId: z.string({ message: "Product ID is required." }),
  inventory: z
    .string({ required_error: "Inventory is required." }),
});
