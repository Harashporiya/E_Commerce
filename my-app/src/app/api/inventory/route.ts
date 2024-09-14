import { connectToDataBase } from "@/lib/db/db";
import Inventory from "@/lib/model/inventories";
import Product from "@/lib/model/products";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { NextResponse } from "next/server";


export async function POST(request:Request){
    const requestData = await request.json();
    let vaildation;
    try {
        vaildation = inventorySchema.parse(requestData)
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }

    try {
        const {sku, productId, inventory} = vaildation
        await connectToDataBase()
        const product = await Product.findOne({name:productId});
        if(!product){
            return NextResponse.json({message:"Product not found"},{status:404})
        }
       
        const newInventory = await Inventory.create({
            sku,
            productId:product["_id"],
           inventory: Number(inventory) 
        })
        await newInventory.save();
        
        return NextResponse.json({newInventory, message:"Inventory add successfull"},{status:200})
    } catch (error) {
        
        return NextResponse.json({error,message:"Inventory is not add"},{status:500})
    }
}

export async function GET(){
    try {
        const inventoryAll = await Inventory.find().populate({path:"productId",select:['name','image','prise']})
        return NextResponse.json({inventoryAll,message:"Fetch the data"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Failed the fetch data"},{status:500})
    }
}