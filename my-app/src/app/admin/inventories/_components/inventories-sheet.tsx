import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { useNewInventory } from '@/store/inventoryStroe/inventoryStore'
import AddInventory from './addInventory'

const InventorySheet = () => {
    const {isOpen, onClose}  =  useNewInventory()   
    return (
        <div className='overflow-x-scroll'>
            <Sheet  open={isOpen} onOpenChange={onClose} >
              
                <SheetContent className='min-w-[28rem] space-y-4 bg-[#171717]'>
                    <SheetHeader>
                        <SheetTitle >Inventory Add</SheetTitle>
                        <SheetDescription >
                          Inventory Add new
                        </SheetDescription>
                    </SheetHeader>
                 <AddInventory/>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default InventorySheet

