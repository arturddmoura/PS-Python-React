import { currencyFormatter } from '../../helpers/helpers';
import { orderType } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function OrderTable({ orderDetails }: { orderDetails: Array<orderType> }) {
    return (
        <>
            {orderDetails && (
                <TableContainer sx={{ mt: 2, maxHeight: '50vh', minWidth: '50vw' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell align="left">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderDetails.map((row: orderType) => (
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}
