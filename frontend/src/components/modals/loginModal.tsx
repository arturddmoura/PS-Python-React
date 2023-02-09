import LoadingButton from '@mui/lab/LoadingButton';
import { Modal, Typography, Box, TextField, Button } from '@mui/material/';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useStore } from '../../store';
import { modalStyles } from '../../helpers/helpers';

export default function LoginModal() {
    const { showLogin, toggleShowLogin, toggleSnackbarError, toggleSnackbar, toggleLoggedIn } = useStore();

    const { mutate, isLoading, isSuccess, isError } = useMutation({
        mutationFn: (formData: any) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            return fetch('http://localhost:8000/user/login', requestOptions);
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
    } = useForm<any>();
    const onSubmit: SubmitHandler<any> = (data) => mutate(data);

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