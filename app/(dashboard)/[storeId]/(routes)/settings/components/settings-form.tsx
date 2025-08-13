"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface SettingsFormProps {
    initialData: Store;
}
const formSchema =  z.object({
    name: z.string().min(1, {
        message: "Name is required"
    })
});
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData
    })
    const onsubmit = async (data: SettingsFormValues) => {
        console.log(data);
    }
    return (
        <>
            <div
                className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences and settings"
                />
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => { }}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 w-full">
                   <div className="grid grid-cols-3 gap-8">
                    <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>
                            Name
                         </FormLabel>
                         <FormControl>
                            <Input disabled={loading} placeholder="Store Name" {...field} />
                         </FormControl>
                         <FormMessage  />
                       </FormItem>
                     )}
                    />

                   </div>
                </form>
                <Button 
                    disabled={loading}
                    className="ml-auto"
                    type="submit"
                    >Save Changes</Button>
            </Form>         
        </>

    )
}
export default SettingsForm;