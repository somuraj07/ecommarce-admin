"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../model";


export const StoreModal = ()=>{
    const StoreModal = useStoreModal();

    return(
    <Modal
    title="craete a store"
    description="Add a new store to manage products and categories"
    isOpen={StoreModal.isOpen}
    onClose={StoreModal.onClose}
    >
        future will create 
    </Modal>)
}