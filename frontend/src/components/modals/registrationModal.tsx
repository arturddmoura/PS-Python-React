import { modalStyles } from '../../helpers/helpers';
import { useStore } from '../../store';
import { registration } from '../../types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Modal, TextField, Typography } from '@mui/material/';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export default function RegistrationModal() {
    const { showRegister, toggleShowRegister, toggleSnackbarError, toggleSnackbar } = useStore();

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData: registration) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            return fetch('/api/user/create', requestOptions);
        },
        onSuccess: async (data) => {
            if (data.status == 201) {
                toggleSnackbar();
                toggleShowRegister();
            } else if (data.status == 406) {
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
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<registration>();
    const onSubmit: SubmitHandler<registration> = (data) => mutate(data);

    return (
        <Modal
            open={showRegister}
            onClose={toggleShowRegister}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyles}>
                <Typography textAlign="center" variant="h5">
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <TextField
                            sx={{ mt: 3, mb: 1 }}
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <Typography variant="caption">This field is required</Typography>}
                        <TextField
                            sx={{ mb: 1 }}
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
                        <TextField
                            sx={{ mb: 1 }}
                            fullWidth
                            id="password-confirmation"
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            {...register('confirmPassword', {
                                required: true,
                                validate: (val: string) => {
                                    if (watch('password') != val) {
                                        return 'Your passwords do no match';
                                    }
                                },
                            })}
                        />
                        {errors.confirmPassword?.message && (
                            <Typography variant="caption">{`${errors.confirmPassword.message}`}</Typography>
                        )}
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
                            REGISTER
                        </LoadingButton>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
