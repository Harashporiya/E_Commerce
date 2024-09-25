"use client"
import SideHeader from "../_components/sideheader";
import Header from "../_components/header";
import DownHeader from "./_components/downheader";
import { useEffect, useState } from "react";
import { productAll } from "@/http/api";
import { ProductType } from "@/types/productTypes";
import Image from "next/image";

const Deshboard = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productAll();
        setProduct(response.data.productsAll);
        console.log(response.data.productsAll);
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
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
          {product.map((item: ProductType) => (
            <div
              key={item._id}
              className="flex flex-col items-center bg-white shadow-lg p-2"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={0}
                height={0}
                sizes="100vw"
                  style={{ width: 400 }}
                  className="aspect-square rounded-t-md object-cover"
              />
              <p className="text-lg font-semibold text-black mt-2">{item.name}</p>
              <p className="text-md font-medium text-gray-700">{item.prise}$</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deshboard;
