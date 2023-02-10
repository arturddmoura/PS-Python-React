import { create } from 'zustand';

type AddModal = {
    loggedIn: boolean;
    showLogin: boolean;
    showRegister: boolean;
    showOrderHistory: boolean;
    snackbar: boolean;
    snackbarError: boolean;
    showCart: boolean;
    cartItems: number;
    email: string;
    orderDetails: boolean;
    toggleLoggedIn: () => void;
    toggleShowLogin: () => void;
    toggleShowRegister: () => void;
    toggleShowOrderHistory: () => void;
    toggleSnackbar: () => void;
    toggleSnackbarError: () => void;
    toggleShowCart: () => void;
    toggleOrderDetails: () => void;
    addCartItem: () => void;
    setEmail: (newValue: string) => void;
    setCartItems: (newValue: number) => void;
    removeCartItem: () => void;
};

export const useStore = create<AddModal>((set) => ({
    loggedIn: false,
    showLogin: false,
    showRegister: false,
    showOrderHistory: false,
    snackbar: false,
    snackbarError: false,
    showCart: false,
    orderDetails: false,
    cartItems: 0,
    email: '',
    toggleLoggedIn: () => set((state) => ({ loggedIn: !state.loggedIn })),
    toggleShowLogin: () => set((state) => ({ showLogin: !state.showLogin })),
    toggleShowRegister: () => set((state) => ({ showRegister: !state.showRegister })),
    toggleShowOrderHistory: () => set((state) => ({ showOrderHistory: !state.showOrderHistory })),
    toggleSnackbar: () => set((state) => ({ snackbar: !state.snackbar })),
    toggleSnackbarError: () => set((state) => ({ snackbarError: !state.snackbarError })),
    toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
    toggleOrderDetails: () => set((state) => ({ orderDetails: !state.orderDetails })),
    addCartItem: () => set((state) => ({ cartItems: state.cartItems + 1 })),
    removeCartItem: () => set((state) => ({ cartItems: state.cartItems - 1 })),
    setEmail: (newValue) => set({ email: newValue }),
    setCartItems: (newValue) => set({ cartItems: newValue }),
}));
