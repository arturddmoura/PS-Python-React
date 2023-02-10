import { cartStyles, currencyFormatter } from '../../helpers/helpers';
import { useStore } from '../../store';
import CartTable from '../table/cartTable';
import { Box, Button, Modal, Typography } from '@mui/material/';
import { useQuery } from 'react-query';

function subtotal(items: any) {
    return (items || []).map(({ price }: { price: GLfloat }) => price).reduce((sum: any, i: any) => sum + i, 0);
}

function shipping(items: any) {
    return (items || []).map(({ price }: { price: GLfloat }) => price).reduce((sum: any, i: any) => sum + 10, 0);
}

export default function CartModal() {
    const { email, showCart, toggleShowCart } = useStore();

    const fetchCart = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(`http://localhost:8000/cart/get?email=${email}`, requestOptions);
        return res.json();
    };
    const { isLoading, isError, data } = useQuery(['cart'], fetchCart);

    const invoiceSubtotal = subtotal(data);
    const shippingTotal = shipping(data);
    const cartTotal = (invoiceSubtotal: any, shippingTotal: any) => {
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
                            <Button variant="contained">Checkout</Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}
