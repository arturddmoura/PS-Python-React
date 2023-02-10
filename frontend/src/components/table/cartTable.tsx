import { currencyFormatter } from '../../helpers/helpers';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function CartTable({ cartItems }: any) {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, minWidth: 600 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((row: any) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">
                                <img
                                    style={{ maxWidth: '100px' }}
                                    src={`/src/assets/${row.image}?w=161&fit=crop&auto=format`}
                                    alt={row.name}
                                    loading="lazy"
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{currencyFormatter.format(Number(row.price))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
