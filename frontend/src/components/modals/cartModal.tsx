import { cartStyles, currencyFormatter } from '../../helpers/helpers';
import { useStore } from '../../store';
import { cartItem } from '../../types';
import CartTable from '../table/cartTable';
import { Box, Button, Modal, Typography } from '@mui/material/';
import { useMutation, useQuery, useQueryClient } from 'react-query';

function subtotal(items: Array<cartItem>) {
    return (items || []).map(({ price }: { price: number }) => price).reduce((sum: number, i: number) => sum + i, 0);
}

function shipping(items: Array<cartItem>) {
    return (items || []).map(({ price }: { price: number }) => price).reduce((sum: number, i: number) => sum + 10, 0);
}

export default function CartModal() {
    const { email, showCart, toggleShowCart, toggleSnackbarError, toggleSnackbar, setCartItems } = useStore();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (email: string) => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            return fetch(`/api/cart/checkout/${email}`, requestOptions);
        },
        onSuccess: async (data: { status: number }) => {
            if (data.status == 200) {
                toggleSnackbar();
                setCartItems(0);
                toggleShowCart();
            } else if (data.status == 404) {
                toggleSnackbarError();
            }
            queryClient.invalidateQueries('cart');
        },
        onError: async (error) => {
            toggleSnackbarError();
        },
    });

    const fetchCart = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(`/api/cart/get?email=${email}`, requestOptions);
        return res.json();
    };
    const { isLoading, isError, data } = useQuery(['cart'], fetchCart);

    const invoiceSubtotal = subtotal(data);
    const shippingTotal = shipping(data);
    const cartTotal = (invoiceSubtotal: number, shippingTotal: number) => {
        if (invoiceSubtotal >= 250.0) {
            shippingTotal = 0;
        }
        return invoiceSubtotal + shippingTotal;
    };

    return (
        <Modal
            open={showCart}
            onClose={() => {
                toggleShowCart();
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={cartStyles}>
                <Typography textAlign="center" variant="h5">
                    Cart
                </Typography>
                {data && <CartTable cartItems={data} />}
                {data && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">
                                Products: {currencyFormatter.format(Number(invoiceSubtotal))}
                            </Typography>
                            <Typography variant="subtitle2">
                                Shipping:{' '}
                                {invoiceSubtotal >= 250.0
                                    ? currencyFormatter.format(Number(0))
                                    : currencyFormatter.format(Number(shippingTotal))}
                            </Typography>
                            <Typography variant="subtitle2">
                                Total: {currencyFormatter.format(Number(cartTotal(invoiceSubtotal, shippingTotal)))}
                            </Typography>
                        </Box>
                        <Box sx={{ alignSelf: 'flex-end' }}>
                            <Button onClick={() => mutate(email)} variant="contained">
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}
