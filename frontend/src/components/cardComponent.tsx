import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useStore } from '../store';
import { currencyFormatter } from '../helpers/helpers';

export default function ProductCard({ products }: { products: any }) {
    const { loggedIn, addCartItem } = useStore();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
            }}
        >
            {products.map((item: any) => {
                return (
                    <Card key={item.id} sx={{ m: 1, width: 245 }}>
                        <CardMedia
                            sx={{ mt: 2, objectFit: 'contain' }}
                            component="img"
                            height="200"
                            image={`/src/assets/${item.image}`}
                            alt="product picture"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                                {item.name}
                            </Typography>
                        </CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 1,
                                m: 1,
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{ fontWeight: 'bold' }}
                                    align="left"
                                    gutterBottom
                                    variant="caption"
                                    component="div"
                                >
                                    Price: {currencyFormatter.format(Number(item.price))}
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold' }} align="left" variant="body2" component="div">
                                    Score: {item.score}
                                </Typography>
                            </Box>
                            <Box>
                                {loggedIn ? (
                                    <>
                                        <IconButton
                                            onClick={() => {
                                                addCartItem();
                                            }}
                                            aria-label="add to shopping cart"
                                        >
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </>
                                ) : null}
                            </Box>
                        </Box>
                    </Card>
                );
            })}
        </Box>
    );
}
