import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './pages/products';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Products />
        </QueryClientProvider>
    );
}
