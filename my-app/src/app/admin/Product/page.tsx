"use client";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import DownHeader from "../_components/downHeader";
import { useEffect, useState } from "react";
import { deleteSingleProduct, productAll, updateProduct } from "@/http/api";
import { ProductType } from "@/types/productTypes";
import { newProduct } from "@/store/productStore/productStore";

const Dashboard = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { onOpen } = newProduct();
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const productFetchData = async () => {
      try {
        const response = await productAll();
        setProducts(response.data.productsAll);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    productFetchData();
  }, []);

  const deleteByIdProduct = async (id: string) => {
    try {
      await deleteSingleProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const upDateProductById = async (id: string) => {
    try {
      const response = await updateProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditClick = () => {
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-white">
      <SideHeader />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <DownHeader />
            <TabsContent value="all">
              <Card>
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
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
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
                      {products.map((product: ProductType) => (
                        <TableRow key={product._id}>
                          <TableCell className="hidden w-[100px] sm:table-cell">
                            <Image
                              src={`${product.image}`}
                              alt=""
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "100%" }}
                              className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                            />
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
                                <DropdownMenuItem onClick={handleEditClick}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteByIdProduct(product._id)}
                                >
                                  Delete
                                </DropdownMenuItem>
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

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-black">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                // value="Pedro Duarte"
                placeholder="product name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brandname" className="text-right">
                Brand name
              </Label>
              <Input
                id="brandname"
                // value="@peduarte"
                placeholder="brand name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prise" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                // value="@peduarte"
                placeholder="add price"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                // value="@peduarte"
                placeholder="add description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Size
              </Label>
              <Input
                id="size"
                // value="@peduarte"
                placeholder="size"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => upDateProductById(product._id)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
