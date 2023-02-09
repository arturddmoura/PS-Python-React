import { create } from 'zustand';

type AddModal = {
    loggedIn: boolean;
    showLogin: boolean;
    showRegister: boolean;
    snackbar: boolean;
    snackbarError: boolean;
    cartItems: number;
    toggleLoggedIn: () => void;
    toggleShowLogin: () => void;
    toggleShowRegister: () => void;
    toggleSnackbar: () => void;
    toggleSnackbarError: () => void;
    addCartItem: () => void;
};

export const useStore = create<AddModal>((set) => ({
    loggedIn: false,
    showLogin: false,
    showRegister: false,
    snackbar: false,
    snackbarError: false,
    cartItems: 0,
    toggleLoggedIn: () => set((state) => ({ loggedIn: !state.loggedIn })),
    toggleShowLogin: () => set((state) => ({ showLogin: !state.showLogin })),
    toggleShowRegister: () => set((state) => ({ showRegister: !state.showRegister })),
    toggleSnackbar: () => set((state) => ({ snackbar: !state.snackbar })),
    toggleSnackbarError: () => set((state) => ({ snackbarError: !state.snackbarError })),
    addCartItem: () => set((state) => ({ cartItems: state.cartItems + 1 })),
}));
