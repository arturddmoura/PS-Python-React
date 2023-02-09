import { create } from 'zustand';

type AddModal = {
    showLogin: boolean;
    showRegister: boolean;
    snackbar: boolean;
    snackbarError: boolean;
    toggleShowLogin: () => void;
    toggleShowRegister: () => void;
    toggleSnackbar: () => void;
    toggleSnackbarError: () => void;
};

export const useStore = create<AddModal>((set) => ({
    showLogin: false,
    showRegister: false,
    snackbar: false,
    snackbarError: false,
    toggleShowLogin: () => set((state) => ({ showLogin: !state.showLogin })),
    toggleShowRegister: () => set((state) => ({ showRegister: !state.showRegister })),
    toggleSnackbar: () => set((state) => ({ snackbar: !state.snackbar })),
    toggleSnackbarError: () => set((state) => ({ snackbarError: !state.snackbarError })),
}));
