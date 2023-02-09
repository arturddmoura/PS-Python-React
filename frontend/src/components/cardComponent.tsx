import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function ProductCard({ products }: { products: any }) {
    console.log(products);
    return (
        <>
            {products.map((item: any) => {
                console.log(item);
                return (
                    <Card sx={{ maxWidth: 345 }}>
                        {/* <CardMedia component="img" height="140" image={`/assets/${item.image}`} /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography gutterBottom component="div">
                                Price: {item.price}
                            </Typography>
                            <Typography gutterBottom component="div">
                                Score: {item.score}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions>
                    </Card>
                );
            })}
        </>
    );
}
