"use client";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import DownHeader from "./_components/button";
import { useEffect, useState } from "react";
import { ordersAll } from "@/http/api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ordersAll();
        setOrders(response.data.order);
        console.log(response.data.order);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-white">
      <SideHeader />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <DownHeader />
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
                        <TableHead>Product Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order: any) => (
                        <TableRow key={order._id}>
                          <TableCell className="hidden w-[100px] sm:table-cell">
                            <Image
                              src={`${order.productId.image}`}
                              alt=""
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "100%" }}
                              className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                            />
                          </TableCell>
                          <TableCell>{order.productId.name}</TableCell>
                          <TableCell>{order.productId.brandName}</TableCell>
                          <TableCell>{order.qty}</TableCell>
                          <TableCell>{order.productId.prise}$</TableCell>
                          <TableCell>{order.productId.size}</TableCell>
                          <TableCell>{order.productId.option}</TableCell>
                          <TableCell>
                            {`${order.userId.firstName} ${order.userId.lastName}`}
                          </TableCell>

                          <TableCell>{order.phone}</TableCell>
                          <TableCell>{order.address}</TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
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

export default Dashboard;
