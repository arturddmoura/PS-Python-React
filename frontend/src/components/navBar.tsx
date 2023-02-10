import { useStore } from '../store';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MouseEvent, useState } from 'react';
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
        toggleShowOrderHistory,
    } = useStore();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchCartItems = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const res = await fetch(`/api/cart/number?email=${email}`, requestOptions);
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

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => {
                                        toggleShowOrderHistory();
                                        handleClose();
                                    }}
                                >
                                    Order history
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        toggleLoggedIn();
                                        handleClose();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
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
