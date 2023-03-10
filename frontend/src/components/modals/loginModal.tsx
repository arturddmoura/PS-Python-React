import { modalStyles } from '../../helpers/helpers';
import { useStore } from '../../store';
import { login } from '../../types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Modal, TextField, Typography } from '@mui/material/';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function LoginModal() {
    const { showLogin, toggleShowLogin, toggleSnackbarError, toggleSnackbar, toggleLoggedIn, setEmail } = useStore();

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData: login) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            setEmail(formData.email);
            return fetch('/api/user/login', requestOptions);
        },
        onSuccess: async (data) => {
            if (data.status == 202) {
                toggleSnackbar();
                toggleShowLogin();
                toggleLoggedIn();
            } else if (data.status == 401) {
                toggleSnackbarError();
            }
        },
        onError: async (error) => {
            toggleSnackbarError();
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<login>();
    const onSubmit: SubmitHandler<login> = (data) => mutate(data);

    return (
        <Modal
            open={showLogin}
            onClose={toggleShowLogin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyles}>
                <Typography textAlign="center" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <TextField
                            sx={{ mt: 3, mb: 1 }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            variant="outlined"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <Typography variant="caption">This field is required</Typography>}
                        <TextField
                            sx={{ mb: 1 }}
                            fullWidth
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <Typography variant="caption">This field is required</Typography>}
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                reset();
                            }}
                        >
                            RESET
                        </Button>
                        <LoadingButton loading={isLoading} variant="contained" type="submit">
                            LOGIN
                        </LoadingButton>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
