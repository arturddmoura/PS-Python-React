import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './pages/products';
import NavBar from './components/navBar';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavBar />
            <Products />
        </QueryClientProvider>
    );
}
