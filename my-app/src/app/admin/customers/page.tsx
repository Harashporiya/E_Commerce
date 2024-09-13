"use client"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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
import { ordersAll } from "@/http/api";


const Customers = () => {
    const [customer, setCustomer] = useState([])
    useEffect(()=>{
        const fetchCustomer =async()=>{
        try {
           
                const response = await ordersAll()
                setCustomer(response.data.order)
            }
         catch (error) {
            console.log("error",error)
        }
    }
        fetchCustomer()
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
                        <TableHead>Customer name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Phone no.</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                   {
                    customer.map((customers:any)=>(
                        <TableRow key={customers.id}>
                          <TableCell>{customers.userId.firstName} {customers.userId.lastName}</TableCell>
                          <TableCell>{customers.userId.email}</TableCell>
                          <TableCell>{customers.address}</TableCell>
                          <TableCell>{customers.phone}</TableCell>
                          <TableCell>{new Date(customers.createdAt).toLocaleString()}</TableCell>
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
