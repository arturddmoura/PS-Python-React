import LoadingButton from '@mui/lab/LoadingButton';
import { Modal, Typography, Box, TextField, Button } from '@mui/material/';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useStore } from '../../store';
import { modalStyles } from '../../helpers/helpers';

export default function RegistrationModal() {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isSuccess, isError } = useMutation({
        mutationFn: (formData: any) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            };
            return fetch('http://localhost:8000/user/create', requestOptions);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries('products');
            toggleShowRegister();
            //toggleSnackbar();
        },
        //onError: async () => toggleSnackbarError(),
    });

    const { showRegister, toggleShowRegister } = useStore();
    const {
        reset,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();
    const onSubmit: SubmitHandler<any> = (data) => mutate(data);

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
                            id="standard-required"
                            label="Name"
                            variant="outlined"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <Typography variant="caption">This field is required</Typography>}
                        <TextField
                            sx={{ mb: 1 }}
                            fullWidth
                            id="standard-required"
                            label="E-mail"
                            variant="outlined"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <Typography variant="caption">This field is required</Typography>}
                        <TextField
                            sx={{ mb: 1 }}
                            fullWidth
                            id="standard-required"
                            label="Password"
                            variant="outlined"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <Typography variant="caption">This field is required</Typography>}
                        <TextField
                            sx={{ mb: 1 }}
                            fullWidth
                            id="standard-required"
                            label="Repeat password"
                            variant="outlined"
                            type="password"
                            {...register('repeatPassword', {
                                required: true,
                                validate: (val: string) => {
                                    console.log(val);
                                    if (watch('password') != val) {
                                        return 'Your passwords do no match';
                                    }
                                },
                            })}
                        />
                        {errors.repeatPassword?.message && (
                            <Typography variant="caption">{`${errors.repeatPassword.message}`}</Typography>
                        )}
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                reset();
                                console.log(errors);
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
