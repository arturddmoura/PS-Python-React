import './App.css';
import NavBar from './components/navBar';
import SnackBar from './components/snackbars/snackBar';
import SnackBarError from './components/snackbars/snackBarError';
import Products from './pages/products';
import { useStore } from './store';
import { QueryClient, QueryClientProvider } from 'react-query';

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
