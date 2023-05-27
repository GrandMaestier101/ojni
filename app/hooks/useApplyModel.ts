import { create } from "zustand";

interface ApplyModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useApplyModel = create<ApplyModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useApplyModel;