import { z } from "zod";
const orderSchema = z.object({
  address: z.string({ message: "Order address is required" }),
  qty: z.number({ message: "Order quantity is required" }),
  phone: z.string({ message: "Phone number should be 10 digits" }).length(10),
  productId: z.string({ message: "Product ID is required" }),
});
export default orderSchema;
