"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { productAll } from "@/http/api";
import { ProductType } from "@/types/productTypes";

const ShowProduct = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productAll();
        setProduct(response.data.productsAll);
      } catch (err) {
        console.log("Failed to fetch products");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {product.map((item: ProductType) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-2xl font-bold text-black mb-4">
                  ${item.prise}
                </p>
                <Link href={`/product/${item._id}`}>
                  <Button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
