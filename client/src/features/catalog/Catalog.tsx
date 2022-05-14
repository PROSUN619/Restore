import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Product } from "../../models/Product"
import { fetchProductsAsync, producctSelectors } from "./catalogSlice";
import ProductList from "./ProductList"

// interface Props {
//     products: Product[],
//     addProduct(): void
// }

//export default function (props: Props) {

//export default function ({products,addProduct}: Props) {    // de structuring props
export default function () {
    //use react hooks
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);

    // now we are getting the data from entity adpater
    const products = useAppSelector(producctSelectors.selectAll);
    const {productsLoaded,status} = useAppSelector(state => state.catalog)
    const dispapatch = useAppDispatch();

    //use another react hooks useeffect
    //useeffect called when react component mounted
    // useEffect(() => {
    //     agent.Catalog.list()
    //     .then(products => setProducts(products))
    //     .catch(error => console.log(error))
    //     .finally(() => setLoading(false))
    // }, []); // use [] to add dependancy  so that when component re render useeffect will not be called
    //any time our state change then component re render and update the state

    // if (loading) return <LoadingComponent message="Catalog Loading..."/>

    useEffect(() => {
        if (!productsLoaded) dispapatch(fetchProductsAsync());
    }, [productsLoaded, dispapatch]);

    if (status.includes('pending')) return <LoadingComponent message="Catalog Loading..."/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}