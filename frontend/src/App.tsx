import './App.css';
import CartModal from './components/modals/cartModal';
import OrderHistory from './components/modals/orderHistory';
import NavBar from './components/navBar';
import SnackBar from './components/snackbars/snackBar';
import SnackBarError from './components/snackbars/snackBarError';
import Products from './pages/products';
import { useStore } from './store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
    const { snackbar, snackbarError, showCart, showOrderHistory } = useStore();

    return (
        <QueryClientProvider client={queryClient}>
            {snackbarError && <SnackBarError />}
            {snackbar && <SnackBar />}
            {showCart && <CartModal />}
            {showOrderHistory && <OrderHistory />}
            <NavBar />
            <Products />
        </QueryClientProvider>
    );
}
