import { connectToDataBase } from "@/lib/db/db";
import { writeFile, } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import Product from "@/lib/model/products"; 
import { z } from "zod";
import fs from "fs"

const isServer = typeof window === 'undefined';

export const productSchema = z.object({
  name: z.string( { message: "Product name is required" }).min(1),
  brandName: z.string().min(1, { message: "Brand name is required" }),
  prise: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, { message: "Price must be a positive number" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.instanceof(isServer ? File : FileList, { message: "Image must be a valid file" }),
  size: z.enum(['S', 'M', 'L', 'XL', 'XXL'], { message: "Invalid size" }),
  option: z.enum(["Men", "Women"], { message: "Option must be either 'Men' or 'Women'" })
});

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get('image') as File;

  try {
    productSchema.parse({
      name: data.get("name"),
      brandName: data.get("brandName"),
      prise: data.get("prise"),
      description: data.get("description"),
      image: data.get("image"),
      size: data.get("size"),
      option: data.get("option"),
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const fileName = `${Date.now()}.${image.name.split(".").splice(-1)}`;
  const filePath = path.join(process.cwd(), "public/assets", fileName);

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const assetsPath = path.dirname(filePath);
    if (!fs.existsSync(assetsPath)) {
      fs.mkdirSync(assetsPath, { recursive: true });
    }
    await writeFile(filePath, buffer);

    await connectToDataBase(); 

    
    const newProduct = new Product({
      name: data.get("name"),
      brandName: data.get("brandName"),
      prise: parseFloat(data.get("prise") as string),
      description: data.get("description"),
      image: `/assets/${fileName}`,
      size: data.get("size"),
      option: data.get("option"),
    });

    await newProduct.save(); 

    return NextResponse.json({ message: "Product created successfully!", product: newProduct }, { status: 200 });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Failed to save the file system" }, { status: 500 });
  }
}

export async function GET(){
  await connectToDataBase()
   try {
    const productsAll = await Product.find();
    return NextResponse.json({productsAll,message:"All product fetch"},{status:200})
   } catch (error) {
    return NextResponse.json({message:"Product are not fetch failed"},{status:500})
   }
}