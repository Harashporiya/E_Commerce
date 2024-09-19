export interface ProductType {
  _id: string;
  name: string;
  brandName: string;
  prise: string;
  size: string;
  option: string;
  image: string;
  createdAt: string;
  description: string;
}
export interface OrderType {
  address: string;
  phone: string;
  qty: number;
  productId: string;
}
