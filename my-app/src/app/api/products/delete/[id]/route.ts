import { connectToDataBase } from "@/lib/db/db";
import { NextResponse } from "next/server";
import Product from "@/lib/model/products";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await connectToDataBase();
  const { id } = params;
  console.log("Product Id: ", id);
  try {
    const productDeleteById = await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { productDeleteById, message: "Delete Successfull!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed the fetch id delete by product" },
      { status: 500 },
    );
  }
}
