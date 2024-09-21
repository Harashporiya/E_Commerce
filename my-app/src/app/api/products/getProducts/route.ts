import { connectToDataBase } from "@/lib/db/db";
import Product from "@/lib/model/products";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDataBase();
  try {
    const productsAll = await Product.find();
    return NextResponse.json(
      { productsAll, message: "Product fetch" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed fetch the data" },
      { status: 500 },
    );
  }
}
