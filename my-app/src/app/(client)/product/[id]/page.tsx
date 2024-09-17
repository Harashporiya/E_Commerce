"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SingleProduct } from "@/http/api";
import { ProductType } from "@/types/productTypes";
import HeaderPage from "./header";
import FooterPage from "../../footer/page";

const ProductId = () => {
  const [productId, setProductId] = useState<ProductType | null>(null);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await SingleProduct(id as string);
        setProductId(response.data.productsId);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchProductId();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPage />
      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {productId && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    src={productId.image}
                    alt={productId.name}
                    className="h-full w-full object-cover md:w-96"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-black font-semibold">
                    {productId.brandName}
                  </div>
                  <h1 className="mt-2 text-3xl font-bold text-gray-900">
                    {productId.name}
                  </h1>
                  <p className="mt-4 text-2xl font-bold text-gray-900">
                    ${productId.prise}
                  </p>
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Product Description
                    </h2>
                    <p className="mt-2 text-gray-600">
                      {productId.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterPage />
    </div>
  );
};

export default ProductId;
