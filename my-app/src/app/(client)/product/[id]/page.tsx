"use client";
import { SingleProduct } from "@/http/api";
import { ProductType } from "@/types/productTypes";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductId = () => {
  const [productId, setProductId] = useState<ProductType[]>([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await SingleProduct(id as string);
        setProductId(response.data.productsId);
        console.log(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchProductId();
  }, [id]);

  return (
    <div className="bg-gray-200 min-h-screen p-10">
      {productId && (
        <div className="flex">
          <img
            src={productId.image}
            width={0}
            height={0}
            alt=""
            style={{ width: 400, height: 500, borderRadius: 20 }}
          />
          <div>
            <p className="text-4xl text-black">Name: {productId.name}</p>
            <p className="text-4xl text-black">
              Brand name: {productId.brandName}
            </p>
            <p className="text-4xl text-black">Price: {productId.prise}</p>
            <p className="text-4xl text-black">
              Description: {productId.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductId;
