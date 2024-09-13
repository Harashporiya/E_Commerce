import React from 'react'
import {
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { newProduct } from '@/store/productStore/productStore'
import ProductSheet from '../Product/_components/product-sheet'
const DownHeader = () => {
  const {onOpen} = newProduct()
  return (
    <div>
       <div className="flex items-center">
              <p className='text-3xl text-black font-bold' >Product</p>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1" onClick={onOpen}>
              
                    Add Product
                 
                </Button>
              </div>
              <ProductSheet/>
            </div>
    </div>
  )
}

export default DownHeader