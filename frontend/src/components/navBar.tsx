import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../store';

export default function NavBar() {
    const { cartItems, loggedIn, toggleLoggedIn, toggleShowLogin, toggleShowRegister } = useStore();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                        Products
                    </Typography>
                    <Divider />
                    {loggedIn ? (
                        <>
                            <IconButton size="large" aria-label="cart" color="inherit">
                                <Badge badgeContent={cartItems} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            <Button
                                color="inherit"
                                onClick={() => {
                                    toggleLoggedIn();
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    toggleShowLogin();
                                }}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    toggleShowRegister();
                                }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
