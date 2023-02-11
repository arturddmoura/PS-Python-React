import ProductCard from '../components/cardComponent';
import Loading from '../components/loading/loading';
import LoginModal from '../components/modals/loginModal';
import RegistrationModal from '../components/modals/registrationModal';
import NotFound from '../components/pageNotFound';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Products() {
    const [sort, setSort] = useState('name');
    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value);
    };

    const fetchProducts = async () => {
        const res = await fetch(`/api/products/list/${sort}`);
        return res.json();
    };
    const { isLoading, isError, data } = useQuery(['products', sort], fetchProducts);
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <FormControl sx={{ mx: 3, mt: 2, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Sort</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={sort}
                        label="Sort"
                        onChange={handleChange}
                    >
                        <MenuItem value={'name'}>Name</MenuItem>
                        <MenuItem value={'price'}>Price</MenuItem>
                        <MenuItem value={'score'}>Score</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <RegistrationModal />
            <LoginModal />
            {isLoading && <Loading />}
            {data && data.length == 0 && (
                <>
                    <NotFound text={'Empty database. Please add products and try again!'} />
                </>
            )}
            {data && <ProductCard products={data} />}
        </>
    );
}
