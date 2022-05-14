import { LoadingButton } from "@mui/lab"
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { fontWeight } from "@mui/system"
import { useState } from "react"
import { Link } from "react-router-dom"
import agent from "../../app/api/agent"
import { useStoreContext } from "../../app/context/StoreContext"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { currencyFormat } from "../../app/util/util"
import { Product } from "../../models/Product"
import { addBasketItemAsync, setBasket } from "../basket/basketSlice"


interface Props {
    product: Product
}



export default function ProductCard({ product }: Props) {

    //const [loading, setLoading] = useState(false);
    //const {setBasket} = useStoreContext();
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();


    // function handleAddItem(productId: number) {
    //     setLoading(true);
    //     agent.Basket.addItem(productId)
    //         .then((basket) => dispatch(setBasket(basket)))
    //         .catch((error) => console.log(error))
    //         .finally(() => setLoading(false));
    // }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={
                    {
                        sx: { fontWeight: 'bold', color: 'primary.main' }
                    }
                }
            />
            <CardMedia className="contain"
                component="img"
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                alt={product.name}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes('pendingAddItem' + product.id)} onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small">Add to Cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}