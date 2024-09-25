import { OrderType, ProductType } from "@/types/productTypes";
import { api } from "./client";

export const productAll = async () => {
  const response = await api.get("/products");
  return response;
};

export const createProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const ordersAll = async () => {
  const response = await api.get("/orders");
  return response;
};

export const orderByIdProduct = async (data: OrderType) => {
  const response = await api.post("/orders", data);
  console.log(data);
  return response;
};

export const customerAll = async () => {
  const response = await api.get("customers");
  return response;
};

export const inventoryAddAll = async () => {
  const response = await api.get("/inventory");
  return response;
};
export const CreateInventoryAdd = async (data: {
  sku: string;
  productId: string;
  inventory: string;
}) => {
  // console.log(data);
  const response = await api.post("/inventory", data);
  console.log(response);
  return response.data;
};

export const SingleProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response;
};

export const deleteSingleProduct = async (id: string) => {
  const response = await api.delete(`/products/delete/${id}`);
  return response;
};

export const updateProduct = async (id: string, productData: ProductType) => {
  const response = await api.put(`/products/update/${id}`, productData);
  return response;
};

export const userProfile = async (id: string) => {
  const response = await api.get(`signup/profile/${id}`);
  return response;
};
