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
    const origin = useOrigin();
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData
    })
    const onsubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }

    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.push("/");
            router.refresh();
            toast.success("Store deleted successfully");
        } catch (error) {
            toast.error("Make sure you removed all products and categories first");

        }finally{
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
            <div
                className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences and settings"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true) }
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator className="my-4" />
            
        </>

    )
}
export default SettingsForm;