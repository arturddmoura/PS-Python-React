import { useStore } from '../store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

export default function NavBar() {
    const {
        cartItems,
        setCartItems,
        email,
        loggedIn,
        toggleLoggedIn,
        toggleShowLogin,
        toggleShowRegister,
        toggleShowCart,
    } = useStore();

    const fetchCartItems = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(`http://localhost:8000/cart/number?email=${email}`, requestOptions);
        return res.json();
    };
    const { isLoading, isError, data } = useQuery(['cartItemNumber', loggedIn], fetchCartItems, {
        onSuccess: (data) => {
            setCartItems(data);
        },
    });

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
                            {data && (
                                <IconButton
                                    onClick={() => {
                                        toggleShowCart();
                                    }}
                                    size="large"
                                    aria-label="cart"
                                    color="inherit"
                                >
                                    <Badge badgeContent={cartItems} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            )}
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
