import { cartStyles, currencyFormatter } from '../../helpers/helpers';
import { useStore } from '../../store';
import { orderType } from '../../types';
import OrderTable from '../table/orderTable';
import { Box, Modal, Typography } from '@mui/material/';
import { useQuery, useQueryClient } from 'react-query';

function subtotal(items: Array<orderType>) {
    return (items || []).map(({ price }: { price: number }) => price).reduce((sum: number, i: number) => sum + i, 0);
}

function shipping(items: Array<orderType>) {
    return (items || []).map(({ price }: { price: number }) => price).reduce((sum: number, i: number) => sum + 10, 0);
}

export default function OrderDetails({ order }: { order: orderType }) {
    const { orderDetails, toggleOrderDetails } = useStore();
    const queryClient = useQueryClient();

    const fetchSingleOrder = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(`/api/orders/get/${order.order_id}`, requestOptions);
        return res.json();
    };
    const { data } = useQuery(['singleOrder', orderDetails], fetchSingleOrder);

    const invoiceSubtotal = subtotal(data);
    const shippingTotal = shipping(data);
    const cartTotal = (invoiceSubtotal: number, shippingTotal: number) => {
        if (invoiceSubtotal >= 250.0) {
            shippingTotal = 0;
        }
        return invoiceSubtotal + shippingTotal;
    };

    return (
        <>
            {data && (
                <Modal
                    open={orderDetails}
                    onClose={() => {
                        toggleOrderDetails();
                        queryClient.removeQueries('singleOrder');
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={cartStyles}>
                        <Typography textAlign="center" variant="h5">
                            Order details
                        </Typography>
                        <Typography textAlign="center" variant="subtitle1">
                            Order date: {new Date(order.date).toLocaleString('en-UK')}
                        </Typography>

                        <OrderTable orderDetails={data} />
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
                        <Box sx={{ alignSelf: 'flex-end' }}></Box>
                    </Box>
                </Modal>
            )}
        </>
    );
}
