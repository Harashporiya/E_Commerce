"use client"
// import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import SideHeader from "../_components/sideheader"
import Header from "../_components/header"
import DownHeader from "../_components/downHeader"
import { useEffect, useState } from "react"
import { productAll } from "@/http/api"

const Dashboard = () => {
  const [products, setProducts] = useState([]) 
  
  useEffect(() => {
    const productFetchData = async () => {
      try {
        const response = await productAll()
        console.log(response.data.productsAll)
        setProducts(response.data.productsAll) 
      } catch (error) {
        console.log("error", error)
      }
    }
    productFetchData()
  }, []) 

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
                <CardHeader />
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Brand name</TableHead>
                        <TableHead className="hidden md:table-cell">  Price</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Size
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Gender
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product: any) => (
                        <TableRow key={product._id}>
                          <TableCell className="hidden w-[100px] sm:table-cell">
                            {/* <Image
                              src={`/assets/${product.image}`}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-md"
                            /> */}
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.brandName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.prise}$
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {product.size}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {product.option}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
  )
}

export default Dashboard
