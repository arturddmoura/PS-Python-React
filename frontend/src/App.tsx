import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './pages/products';
import NavBar from './components/navBar';
import { useStore } from './store';
import SnackBarError from './components/snackbars/snackBarError';
import SnackBar from './components/snackbars/snackBar';
const queryClient = new QueryClient();

export default function App() {
    const { snackbar, snackbarError } = useStore();

    return (
        <QueryClientProvider client={queryClient}>
            {snackbarError && <SnackBarError />}
            {snackbar && <SnackBar />}
            <NavBar />
            <Products />
        </QueryClientProvider>
    );
}
