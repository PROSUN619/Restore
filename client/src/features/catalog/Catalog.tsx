import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import { Product } from "../../models/Product"
import ProductList from "./ProductList"

// interface Props {
//     products: Product[],
//     addProduct(): void
// }

//export default function (props: Props) {

//export default function ({products,addProduct}: Props) {    // de structuring props
export default function () {
    //use react hooks
    const [products, setProducts] = useState<Product[]>([]);

    //use another react hooks useeffect
    //useeffect called when react component mounted
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, []); // use [] to add dependancy  so that when component re render useeffect will not be called
    //any time our state change then component re render and update the state


    return (
        <>
            <ProductList products={products} />
            {/* <Button variant="contained" onClick={addProduct}>Add Product</Button> */}
        </>
    )
}