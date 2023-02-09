import { useQuery } from 'react-query';
import ProductCard from '../components/cardComponent';
import RegistrationModal from '../components/modals/registrationModal';

export default function Products() {
    const fetchProducts = async () => {
        const res = await fetch('http://localhost:8000/products/list/all');
        return res.json();
    };
    const { isLoading, isError, data } = useQuery('products', fetchProducts);

    return (
        <>
            <RegistrationModal />
            <div>{data && <ProductCard products={data} />}</div>
        </>
    );
}