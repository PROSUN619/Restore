import { Grid } from "@mui/material"
import { Product } from "../../models/Product"
import ProductCard from "./ProductCard"

interface Props {
    products: Product[]
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid key={product.id} item xs={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}