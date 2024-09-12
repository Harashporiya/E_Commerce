import { connectToDataBase } from "@/lib/db/db";
import Product from "@/lib/model/products";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{id:string}}){
    await connectToDataBase()
    const {id} = params
     try {
      const productsId = await Product.findById(id);
      if(!productsId){
        return NextResponse.json({message:"Product not found"},{status:404})
      }
      return NextResponse.json({productsId,message:"Product find"},{status:200})
     } catch (error) {
      return NextResponse.json({message:"Product are not fetch failed"},{status:500})
     }
  }