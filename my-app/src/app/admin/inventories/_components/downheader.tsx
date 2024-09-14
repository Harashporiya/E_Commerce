import { Button } from '@/components/ui/button'
import { useNewInventory } from '@/store/inventoryStroe/inventoryStore'
import React from 'react'
import InventorySheet from './inventories-sheet'
const DownHeader = () => {
     const {onOpen} = useNewInventory()
  return (
    <div>
       <div className="flex items-center">
              <p className='text-3xl text-black font-bold'>Inventory</p>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1" onClick={onOpen}>
                    Add Inventory 
                </Button>
              </div>
              <InventorySheet/>
            </div>
           
    </div>
  )
}

export default DownHeader