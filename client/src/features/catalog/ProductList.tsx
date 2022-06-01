import { Grid } from "@mui/material"
import { useAppSelector } from "../../app/store/configureStore"
import { Product } from "../../models/Product"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductCardSkeleton"

interface Props {
    products: Product[]
}

export default function ProductList({ products }: Props) {

    const {productsLoaded} = useAppSelector(state => state.catalog);
    
    return (
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid key={product.id} item xs={4}>
                    {!productsLoaded ? (<ProductCardSkeleton/>) : (<ProductCard product={product} />)}                    
                </Grid>
            ))}
        </Grid>
    )
}