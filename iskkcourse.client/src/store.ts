import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { IStore } from "@/interfaces/IStore";

export const useStore = create<IStore>((set) => ({
    auth: undefined,
    setAuth: (auth) => set((state) => ({ auth })),
}));
