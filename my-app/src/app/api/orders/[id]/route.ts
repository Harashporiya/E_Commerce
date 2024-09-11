import { connectToDataBase } from "@/lib/db/db";
import Order from "@/lib/model/order"
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{id:string}}){
  const { id } = params;
 
  await connectToDataBase()
  try {
    // const order = await Order.findById(id).populate({path:'userId',select:['firstName','lastName']}).populate({path:'productId',select:['name','prise']})
    const order = await Order.findById(id);
    if (!order) {
        return NextResponse.json({ message: "Order not found" },{status:404});
    }
    return NextResponse.json({order},{status:200})
  } catch (error) {
    return NextResponse.json({error,message:"Failed the fetch data"},{status:500})
  }
}