"use client";
import { Input } from "@/components/ui/input";
import { SingleProduct } from "@/http/api";
import { ProductType } from "@/types/productTypes";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";

const ProductId = () => {
  const [productId, setProductId] = useState<ProductType | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await SingleProduct(id as string);
        setProductId(response.data.productsId);
        // setIsLoading(true);
      } catch (error) {
        console.log("Error", error);
        // setIsLoading(false);
      }
    };

    fetchProductId();
  }, [id]);

  return (
    <>
      <div className="bg-gray-200 min-h-screen space-x-10 p-10 flex justify-center ">
        <div className="flex  space-x-10">
          {
            // isLoading ? (
            //   <Skeleton className="aspect-square w-[400px] h-[500px] bg-gray-50 rounded-xl" />
            // ) : (
            productId && (
              <img
                src={productId.image}
                width={0}
                height={0}
                alt=""
                style={{ width: 400, height: 500, borderRadius: 20 }}
              />
            )
            // )
          }
        </div>
        {
          // isLoading ? (
          //   <div className="p-2 space-y-2">
          //     <Skeleton className="aspect-square w-24 h-12 bg-gray-50 rounded-xl" />
          //     <Skeleton className="aspect-square w-80 h-12 bg-gray-50 rounded-xl" />
          //     <Skeleton className="aspect-square w-40 h-12 bg-gray-50 rounded-xl" />
          //     <Skeleton className="aspect-square w-80 h-12 bg-gray-50 rounded-xl" />
          //   </div>
          // ) : (
          productId && (
            <div>
              <p className="text-2xl text-black">Name: {productId.name}</p>
              <p className="text-2xl text-black">
                Brand name: {productId.brandName}
              </p>
              <p className="text-2xl text-black">Price: {productId.prise}</p>
            </div>
          )
          // )
        }

        <div>
          <Input placeholder="qty" className="border-2 border-black" />
        </div>
      </div>
    </>
  );
};

export default ProductId;
