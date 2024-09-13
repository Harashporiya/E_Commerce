
import { connectToDataBase } from "@/lib/db/db";
import Customer from "@/lib/model/customers";
import Order from "@/lib/model/order";
import { User } from "@/lib/model/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const customerSchema = z.object({
    userId: z.string({ message: "UserId is required" }),
    orderId: z.string({ message: "OrderId is required" })
});

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        const validatedData = customerSchema.parse(requestData);

        await connectToDataBase();
        const { userId, orderId } = validatedData;

        const userExist = await User.findById(userId);
        if (!userExist) {
            return NextResponse.json({ message: "User does not exist" }, { status: 404 });
        }
        const orderExist =await Order.findById(orderId)
        if (!orderExist) {
            return NextResponse.json({ message: "Order does not exist" }, { status: 404 });
        }

        const newCustomer = new Customer({
            userId,
            orderId,
        });
        await newCustomer.save();

        return NextResponse.json({ newCustomer, message: "Customer created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "An error occurred", error: error }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDataBase();
        const customerDetails = await Customer.find()
            .populate({ path: 'userId', select: ['firstName', 'lastName', 'email'] })
            .populate({path:"orderId",select:['phone','address']})

        if (!customerDetails || customerDetails.length === 0) {
            return NextResponse.json({ message: "No customers found" }, { status: 404 });
        }

        return NextResponse.json({ customerDetails, message: "Customer details retrieved successfully" }, { status: 200 });
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "Failed to fetch data", error: error}, { status: 500 });
    }
}