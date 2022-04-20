import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
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
    const [loading, setLoading] = useState(true);


    //use another react hooks useeffect
    //useeffect called when react component mounted
    useEffect(() => {
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, []); // use [] to add dependancy  so that when component re render useeffect will not be called
    //any time our state change then component re render and update the state

    if (loading) return <LoadingComponent message="Catalog Loading..."/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}