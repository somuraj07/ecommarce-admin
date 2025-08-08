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
            <Separator className="my-4" />
            
        </>

    )
}
export default SettingsForm;