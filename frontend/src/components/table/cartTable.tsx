import { currencyFormatter } from '../../helpers/helpers';
import { useStore } from '../../store';
import { cartItem } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from 'react-query';

export default function CartTable({ cartItems }: { cartItems: Array<cartItem> }) {
    const { removeCartItem, toggleSnackbarError, toggleSnackbar } = useStore();
    const queryClient = useQueryClient();

    const { mutate, isLoading, isSuccess, isError } = useMutation({
        mutationFn: (formData: cartItem) => {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            return fetch(`/api/cart/delete/${formData.id}`, requestOptions);
        },
        onSuccess: async (data: { status: number }) => {
            if (data.status == 200) {
                toggleSnackbar();
                removeCartItem();
            } else if (data.status == 404) {
                toggleSnackbarError();
            }
            queryClient.invalidateQueries('cart');
        },
        onError: async (error) => {
            toggleSnackbarError();
        },
    });
    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                <TableContainer sx={{ mt: 2, maxHeight: '50vh', minWidth: '50vw' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((row: cartItem) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">
                                        <img
                                            style={{ maxWidth: '10vw' }}
                                            src={`/src/assets/${row.image}?w=161&fit=crop&auto=format`}
                                            alt={row.name}
                                            loading="lazy"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{currencyFormatter.format(Number(row.price))}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => {
                                                mutate(row);
                                            }}
                                            aria-label="add to shopping cart"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography sx={{ m: 5 }} textAlign={'center'}>
                    Your shopping cart is empty.
                </Typography>
            )}
        </>
    );
}
