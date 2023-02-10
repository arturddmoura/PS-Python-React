import { cartStyles } from '../../helpers/helpers';
import { useStore } from '../../store';
import CartTable from '../table/cartTable';
import LoadingButton from '@mui/lab/LoadingButton';
import { Modal, Typography, Box, TextField, Button } from '@mui/material/';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

export default function CartModal() {
    const { email, showCart, toggleShowCart } = useStore();

    const fetchCart = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log(requestOptions);
        const res = await fetch(`http://localhost:8000/cart/get?email=${email}`, requestOptions);
        return res.json();
    };
    const { isLoading, isError, data } = useQuery(['cart'], fetchCart);

    return (
        <Modal
            open={showCart}
            onClose={() => {
                toggleShowCart();
                console.log(email);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={cartStyles}>
                <Typography textAlign="center" variant="h5">
                    Cart
                </Typography>
                {data && <CartTable cartItems={data} />}
                <button onClick={() => console.log(data)}>teste</button>
            </Box>
        </Modal>
    );
}
