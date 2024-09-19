import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Search, ShoppingCart, User } from "lucide-react";
import { ProductType } from "@/types/productTypes";
import { productAll } from "@/http/api";

const HeaderPage = () => {
  const categories = ["Men", "Women", "Sports", "Electronic"];
  const [products, setProducts] = useState<ProductType[]>([]);
  const [menuItems, setMenuItems] = useState<{ [key: string]: string[] }>({
    Men: [],
    Women: [],
    Sports: [],
    Electronic: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productAll();
        setProducts(response.data.productsAll);
        updateMenuItems(response.data.productsAll);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, [products]);

  const updateMenuItems = (products: ProductType[]) => {
    const newMenuItems = { ...menuItems };
    products.forEach((product) => {
      if (product.option && categories.includes(product.option)) {
        if (!newMenuItems[product.option].includes(product.name)) {
          newMenuItems[product.option].push(product.name);
        }
      }
    });
    setMenuItems(newMenuItems);
  };

  return (
    <header>
      <div className="bg-black bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="border-2 border-white rounded-md p-2">
                <h1 className="text-2xl font-bold text-white">Fast Shopping</h1>
              </div>
              <p className="text-white text-sm font-light tracking-wide">
                YOUR HOME FOR FAST SHOPPING
              </p>
            </Link>
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Search products"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                  size={18}
                />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                >
                  <ShoppingCart size={20} />
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                >
                  <User size={20} />
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
                  Signup
                </Button>
              </Link>
            </div>
          </div>
          <nav className="flex justify-center space-x-8">
            {categories.map((category) => (
              <Menubar key={category} className="bg-transparent border-none">
                <MenubarMenu>
                  <MenubarTrigger className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wide">
                    {category}
                  </MenubarTrigger>
                  <MenubarContent className="bg-black bg-opacity-90 backdrop-blur-md text-white">
                    {menuItems[category].map((item) => (
                      <MenubarItem
                        key={item}
                        className="hover:bg-white hover:bg-opacity-20"
                      >
                        {item}
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
