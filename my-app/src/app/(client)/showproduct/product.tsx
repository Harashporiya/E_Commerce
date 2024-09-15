"use client";
import { Button } from "@/components/ui/button";
import { productAll } from "@/http/api";
import { ProductType } from "@/types/productTypes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ShowProduct = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productAll();
        setProduct(response.data.productsAll);
        setLoading(false);
        // console.log(response.data.productsAll._id);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-4 p-10 space-y-1 justify-around space-x-10 bg-gray-200 min-h-screen">
      {product.map((item: ProductType) => (
        <div key={item._id} className="border-8  items-center border-black">
          <img
            src={item.image}
            width={0}
            height={0}
            alt=""
            style={{ width: 500, height: 500 }}
            className="cursor-pointer"
          />
          <div className="bg-black p-2 cursor-pointer">
            <p className="text-2xl text-white text-center font-serif">
              {item.name}
            </p>
            <p className="text-2xl text-white text-center font-serif">
              Pice: {item.prise}$
            </p>
            <Link href={`/product/${item._id}`}>
              <Button className="w-full p-2 font-bold">Buy now</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowProduct;
