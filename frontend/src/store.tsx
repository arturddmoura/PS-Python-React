import { create } from 'zustand';

type AddModal = {
    showLogin: boolean;
    showRegister: boolean;
    toggleShowLogin: () => void;
    toggleShowRegister: () => void;
};

export const useStore = create<AddModal>((set) => ({
    showLogin: false,
    showRegister: false,
    toggleShowLogin: () => set((state) => ({ showLogin: !state.showLogin })),
    toggleShowRegister: () => set((state) => ({ showRegister: !state.showRegister })),
}));
