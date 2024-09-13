"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { createProduct } from "@/http/api";
import { productFieldSchema } from "@/lib/validators/productSchema";
import { newProduct } from "@/store/productStore/productStore";
import toast,{Toaster} from "react-hot-toast";
export type FormValues = z.input<typeof productFieldSchema>;

const CreateProductForm = () => {
  const {onOpen, onClose} = newProduct();
  const form = useForm<z.infer<typeof productFieldSchema>>({
    resolver: zodResolver(productFieldSchema),
    defaultValues: {
      name: "",
      prise: "1",
      description: "",
      brandName: "",
      size: "M", 
      option: "Men", 
    },
  });
  const fileRef = form.register("image");
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brandName", data.brandName);
    formData.append("prise", String(data.prise));
    formData.append("description", data.description);
    formData.append("image", (data.image as FileList)[0]);
    formData.append("size", data.size);
    formData.append("option", data.option);

    try {
      const response = await createProduct(formData);
      toast.success("Create product successfull")
      onClose();
    } catch (error) {
      console.error("Product creation failed", error);
      toast.error("Error check the field data")
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="T-Shirt eg..."
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
            name="brandName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Brand name</FormLabel>
                <FormControl>
                  <Input placeholder="Brand" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prise"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Prise" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file"  {...fileRef} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Size Select</SelectLabel>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender Select</SelectLabel>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Men">Men</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
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
      <Toaster/>
    </div>
  );
};

export default CreateProductForm