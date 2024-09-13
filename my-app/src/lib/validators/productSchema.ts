import { z } from "zod";
const isServer = typeof window === 'undefined';
export const productFieldSchema = z.object({
    name: z.string( { message: "Product name is required" }).min(1),
    brandName: z.string().min(1, { message: "Brand name is required" }),
    prise: z.string({ message: "Price must be a positive number" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.instanceof(isServer ? File : FileList, { message: "Image must be a valid file" }),
    size: z.enum(['S', 'M', 'L', 'XL', 'XXL'], { message: "Invalid size" }),
    option: z.enum(["Men", "Women"], { message: "Option must be either 'Men' or 'Women'" })
  });