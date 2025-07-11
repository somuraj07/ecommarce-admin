"use client";
import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = ()=>{
   const StoreModal = useStoreModal();
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        name: "",

    }
   })
   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                      {...field}
                      placeholder="E-commerce"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
             )}
             />
             <div className="pt-6 space-x-2 flex items-center justify-end w-full">
               <Button variant="outline" onClick={StoreModal.onClose}>cancel</Button>
               <Button type="submit" >continue</Button>
             </div>
             
           </form>
         </Form>
        </div>
       </div>
    </Modal>)
}