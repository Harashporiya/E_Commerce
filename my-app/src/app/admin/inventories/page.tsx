"use client"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SideHeader from "../_components/sideheader";
import Header from "../_components/header";
import DownHeader from "./_components/downheader";
import { useEffect, useState } from "react";
import { inventoryAddAll } from "@/http/api";
import { inventoriesTypes } from "@/types/inventoryType";

const Customers = () => {
  const [inventory, setInventory]=useState([])
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await inventoryAddAll()
        setInventory(response.data.inventoryAll)
        // console.log(response.data)
      } catch (error) {
        console.log("Error",error);
      }
    }
    fetchData()
  },[])
   
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-white">
      <SideHeader/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
       <Header/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <DownHeader/>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Product name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Sku</TableHead>
                        <TableHead>Inventory Add</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                  {
                    inventory.map((item:any)=>(
                     <TableRow key={item.id}>
                      <TableCell className="hidden w-[100px] sm:table-cell">
                            <Image
                              src={`${item.productId.image}`}
                              alt=''
                              width={50}
                              height={50}
                              className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                            />
                          </TableCell>
                       <TableCell>{item.productId.name}</TableCell>
                       <TableCell>{item.productId.prise}$</TableCell>
                       <TableCell>{item.sku}</TableCell>
                       <TableCell>{item.inventory}</TableCell>
                       <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                     </TableRow>
                    ))
                  }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Customers;
