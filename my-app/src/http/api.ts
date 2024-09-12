import { api } from "./client"

export const productAll = async()=>{
    const response = await api.get("/products");
    return response.data
}

export const ordersAll = async()=>{
    const response = await api.get("/orders");
    return response
}