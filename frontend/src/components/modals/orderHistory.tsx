import { cartStyles } from '../../helpers/helpers';
import { useStore } from '../../store';
import OrderDetails from './orderDetails';
import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Modal, Typography } from '@mui/material/';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function OrderHistory() {
    const { email, showOrderHistory, toggleShowOrderHistory, toggleOrderDetails } = useStore();
    const [orderId, setOrderId] = useState();
    const fetchHistory = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(`/api/orders/get/?email=${email}`, requestOptions);
        return res.json();
    };
    const { data } = useQuery(['orderHistory'], fetchHistory);
    return (
        <>
            {orderId && <OrderDetails order={orderId} />}

            <Modal
                open={showOrderHistory}
                onClose={() => {
                    toggleShowOrderHistory();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={cartStyles}>
                    <Typography textAlign="center" variant="h5">
                        Order history
                    </Typography>
                    <TableContainer sx={{ mt: 2, maxHeight: '50vh', minWidth: '50vw' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order number</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data &&
                                    data.map((row: any, index: number) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.order_id}
                                            </TableCell>
                                            <TableCell>{new Date(row.date).toLocaleString('en-UK')}</TableCell>
                                            <TableCell component="th" scope="row">
                                                <IconButton
                                                    onClick={() => {
                                                        setOrderId(row);
                                                        toggleOrderDetails();
                                                    }}
                                                    aria-label="add to shopping cart"
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </>
    );
}
