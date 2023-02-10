import { create } from 'zustand';

type AddModal = {
    loggedIn: boolean;
    showLogin: boolean;
    showRegister: boolean;
    snackbar: boolean;
    snackbarError: boolean;
    showCart: boolean;
    cartItems: number;
    email: string;
    toggleLoggedIn: () => void;
    toggleShowLogin: () => void;
    toggleShowRegister: () => void;
    toggleSnackbar: () => void;
    toggleSnackbarError: () => void;
    toggleShowCart: () => void;
    addCartItem: () => void;
    setEmail: (newValue: string) => void;
};

export const useStore = create<AddModal>((set) => ({
    loggedIn: false,
    showLogin: false,
    showRegister: false,
    snackbar: false,
    snackbarError: false,
    showCart: false,
    cartItems: 0,
    email: '',
    toggleLoggedIn: () => set((state) => ({ loggedIn: !state.loggedIn })),
    toggleShowLogin: () => set((state) => ({ showLogin: !state.showLogin })),
    toggleShowRegister: () => set((state) => ({ showRegister: !state.showRegister })),
    toggleSnackbar: () => set((state) => ({ snackbar: !state.snackbar })),
    toggleSnackbarError: () => set((state) => ({ snackbarError: !state.snackbarError })),
    toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
    addCartItem: () => set((state) => ({ cartItems: state.cartItems + 1 })),
    setEmail: (newValue) => set({ email: newValue }),
}));
