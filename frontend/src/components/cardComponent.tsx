import { currencyFormatter } from '../helpers/helpers';
import { useStore } from '../store';
import { cartItem } from '../types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useMutation } from 'react-query';

export default function ProductCard({ products }: { products: Array<cartItem> }) {
    const { email, loggedIn, addCartItem, toggleSnackbar, toggleSnackbarError } = useStore();

    const handleAddCart = (item: cartItem) => {
        mutate(item);
    };

    const { mutate, isLoading, isSuccess, isError } = useMutation({
        mutationFn: (formData: cartItem) => {
            formData['email'] = email;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            return fetch('/api/cart/add', requestOptions);
        },
        onSuccess: async (data) => {
            if (data.status == 201) {
                toggleSnackbar();
            } else if (data.status != 201) {
                toggleSnackbarError();
            }
            addCartItem();
        },
        onError: async () => toggleSnackbarError(),
    });

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
            }}
        >
            {products.map((item: cartItem) => {
                return (
                    <Card key={item.id} sx={{ m: 1, width: 245 }}>
                        <CardMedia
                            sx={{ mt: 2, objectFit: 'contain' }}
                            component="img"
                            height="200"
                            image={`/src/assets/${item.image}`}
                            alt="product picture"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                                {item.name}
                            </Typography>
                        </CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 1,
                                m: 1,
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }} align="left" variant="body2" component="div">
                                    Price: {currencyFormatter.format(Number(item.price))}
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} align="left" variant="body2" component="div">
                                    Score: {item.score}
                                </Typography>
                            </Box>
                            <Box>
                                {loggedIn ? (
                                    <>
                                        <IconButton
                                            onClick={() => {
                                                handleAddCart(item);
                                            }}
                                            aria-label="add to shopping cart"
                                        >
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </>
                                ) : null}
                            </Box>
                        </Box>
                    </Card>
                );
            })}
        </Box>
    );
}
