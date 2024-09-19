import { NextResponse } from "next/server";
import { z } from "zod";
import Order from "@/lib/model/order";
import { User } from "@/lib/model/user";
import Product from "@/lib/model/products";
import { connectToDataBase } from "@/lib/db/db";

const orderValidation = z.object({
  address: z.string({ message: "Order address is required" }),
  qty: z.number({ message: "Order quantity is required" }),
  phone: z.string({ message: "Phone number should be 10 digits" }).length(10),
  size: z.enum(["S", "M", "L", "XL", "XXL"], { message: "Invalid size" }),
  userId: z.string({ message: "User ID is required" }),
  productId: z.string({ message: "Product ID is required" }),
});

export async function POST(request: Request) {
  const requestData = await request.json();

  let validation;
  try {
    validation = orderValidation.parse(requestData);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  try {
    const { address, qty, phone, size, userId, productId } = validation;

    await connectToDataBase();

    const userExists = await User.findById(userId);
    console.log(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const productExists = await Product.findById(productId);
    console.log(productId);
    if (!productExists) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const newOrder = new Order({
      address,
      qty,
      phone,
      size,
      userId,
      productId,
    });

    await newOrder.save();
    return NextResponse.json(
      { newOrder, message: "Order successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Order not successful", error: error },
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectToDataBase();
  try {
    const order = await Order.find()
      .populate({ path: "userId", select: ["firstName", "lastName", "email"] })
      .populate({
        path: "productId",
        select: [
          "name",
          "prise",
          "brandName",
          "image",
          "description",
          "size",
          "option",
        ],
      });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Falied the fetch data" },
      { status: 404 },
    );
  }
}
