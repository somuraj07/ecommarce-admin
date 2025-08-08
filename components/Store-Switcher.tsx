"use client";
import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandSeparator } from "./ui/command";
import { CommandItem } from "cmdk";

type popoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends popoverTriggerProps {
    items: Store[]; 
}




export default function StoreSwitcher({
   className,
    items = [],
}: StoreSwitcherProps ) {

    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();


    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));
    // comparaing
    const currentStore = formattedItems.find(
        (item) => item.value === params.storeId
    );

    const [open,setOpen] = useState(false);    
    const onStoreSelect = (store:{value: string; label: string}) => {
    setOpen(false);
    router.push(`/${store.value}`);
    }
    return(
         <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            role="combobox"
            aria-expanded={open}
            aria-label="Select a store"
            className={cn("w-[200px] justify-between", className)}

            >
                <StoreIcon className="mr-2 h-4 w-4" />
                {currentStore?.label || "Select a store"}
                <ChevronsUpDown className="ml-2 h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandList>
                    <CommandInput placeholder="Search store..." />
                    <CommandEmpty>No store found</CommandEmpty>
                    <CommandGroup heading="Stores">
                       {formattedItems.map((store) => (
                        <CommandItem
                        key={store.value}
                        onSelect={()=> onStoreSelect(store)}
                        className="text-sm"
                        >
                         <StoreIcon className="mr-2 h-4 w-4" />
                            {store.label}
                            <Check className={cn(
                                "ml-auto h-5 w-5",
                                currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                            )}/>
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                        onSelect={() => {
                            setOpen(false);
                            storeModal.onOpen();
                        }}
                        >
                         <PlusCircle className="mr-2 h-4 w-4" />
                         crete Store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>

          </PopoverContent>
         </Popover>
    );
}
       