"use client";
import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = ()=>{
   const StoreModal = useStoreModal();

   const [loading,setLoading]=useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        name: "",

    }
   })


   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    

    try {
      setLoading(true);
      const response = await axios.post('/api/stores',values);
      toast.success("Store created succesfully.")
    } catch (error) {
      toast.error("something went wrong");
    } finally{
      setLoading(false);
    }
   }


    return(
    <Modal
    title="craete a store"
    description="Add a new store to manage products and categories"
    isOpen={StoreModal.isOpen}
    onClose={StoreModal.onClose}
    >
       <div>
        <div className="space-y-4 py-2 pb-4">
         <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)}>
             <FormField 
             control={form.control}
             name="name"
             render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                    disabled={loading}
                      {...field}
                      placeholder="E-commerce"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
             )}
             />
             <div className="pt-6 space-x-2 flex items-center justify-end w-full">
               <Button disabled={loading} variant="outline" onClick={StoreModal.onClose}>cancel</Button>
               <Button disabled={loading} type="submit" >continue</Button>
             </div>
             
           </form>
         </Form>
        </div>
       </div>
    </Modal>)
}