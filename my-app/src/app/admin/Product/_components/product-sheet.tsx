import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { newProduct } from '@/store/productStore/productStore'

import CreateProductForm from './createProduct'


const ProductSheet = () => {
    const {isOpen, onClose}  =  newProduct()   
    return (
        <div>
            <Sheet open={isOpen} onOpenChange={onClose} >
              
                <SheetContent className='min-w-[28rem] space-y-4 bg-[#171717]'>
                    <SheetHeader>
                        <SheetTitle >Create Product</SheetTitle>
                        <SheetDescription >
                           Create a new product
                        </SheetDescription>
                    </SheetHeader>
                  <CreateProductForm/>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default ProductSheet

