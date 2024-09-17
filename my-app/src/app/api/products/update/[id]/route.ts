import Product from "@/lib/model/products";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const requestedData = await request.json();
  const { id } = params;
  console.log("Product Id: ", id);
  const { name, brandName, prise, description, size } = requestedData;
  try {
    const productUpdate = await Product.findByIdAndUpdate(
      id,
      {
        name,
        brandName,
        prise,
        description,
        size,
      },
      { new: true },
    );
    if (!productUpdate) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Product Update successfull!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Product not update" },
      { status: 500 },
    );
  }
}
