import { useStore } from '../../store';
import { Snackbar, Alert } from '@mui/material/';

export default function SnackBar() {
    const { snackbar, toggleSnackbar } = useStore();

    return (
        <>
            <Snackbar
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={snackbar}
                onClose={toggleSnackbar}
            >
                <Alert onClose={toggleSnackbar} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
        </>
    );
}
