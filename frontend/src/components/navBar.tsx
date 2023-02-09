import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useStore } from '../store';

export default function NavBar() {
    const { showRegister, toggleShowRegister } = useStore();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Products
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            console.log(showRegister);
                            toggleShowRegister();
                        }}
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
