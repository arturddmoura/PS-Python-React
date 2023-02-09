import { useStore } from '../../store';
import { Snackbar, Alert } from '@mui/material/';

export default function SnackBarError() {
    const { snackbarError, toggleSnackbarError } = useStore();

    return (
        <>
            <Snackbar
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={snackbarError}
                onClose={toggleSnackbarError}
            >
                <Alert onClose={toggleSnackbarError} severity="error" sx={{ width: '100%' }}>
                    Error!
                </Alert>
            </Snackbar>
        </>
    );
}
