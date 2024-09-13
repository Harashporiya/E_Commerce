import { api } from "./client"

export const productAll = async()=>{
    const response = await api.get("/products");
    return response
}

export const createProduct = async(data:FormData)=>{
    const response = await api.post("/products",data,{
        headers:{
            'Content-Type':"multipart/form-data"
        },
    })
    return response.data
}

export const ordersAll = async()=>{
    const response = await api.get("/orders");
    return response
}