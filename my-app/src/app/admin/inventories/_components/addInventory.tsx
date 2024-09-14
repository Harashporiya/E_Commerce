"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { CreateInventoryAdd, productAll } from "@/http/api";
import toast, { Toaster } from "react-hot-toast";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { useEffect, useState } from "react";
import { useNewInventory } from "@/store/inventoryStroe/inventoryStore";
import { inventoriesTypes } from "@/types/inventoryType";

export type FormValues = z.input<typeof inventorySchema>;

const AddInventory = () => {
  const { onOpen, onClose } = useNewInventory();
  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      sku: "",
      inventory: "2",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    console.log(formData);
    // const formData = new FormData();
    // formData.append("sku", data.sku);
    // formData.append("inventory", String(data.inventory));
    // formData.append("productId", String(data.productId));

    // console.log("data form wala" + formData);
    try {
      const response = await CreateInventoryAdd(formData);
      toast.success("Inventory created successfully");
      onClose();
    } catch (error) {
      toast.error("Error: Check the field data");
    }
  };

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productAll();
        setProduct(response.data.productsAll);
       
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="sku"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Product SKU</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. CH1230"
                    className="text-white placeholder-red-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inventory"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="text-white placeholder-red-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Product ID</FormLabel>
                <Select
               onValueChange={(value) => field.onChange(value)}
               defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                   
                      {product && product.map((item: any) => (
                          <SelectItem key={item.id}  value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                 
                </Select>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-white text-black font-bold hover:bg-gray-400"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
      <Toaster />
    </div>
  );
};

export default AddInventory;
