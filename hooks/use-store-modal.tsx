import { create } from "zustand";


interface useStoremodalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};
export const useStoreModal = create<useStoremodalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));