import { LabelImportantRounded } from "@mui/icons-material";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Product } from "../../models/Product"
import { fetchFilters, fetchProductsAsync, producctSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList"
import ProductSearch from "./ProductSearch";

// interface Props {
//     products: Product[],
//     addProduct(): void
// }

//export default function (props: Props) {

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to High' },
]

//export default function ({products,addProduct}: Props) {    // de structuring props
export default function Catalog() {
    //use react hooks
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);

    // now we are getting the data from entity adpater
    const products = useAppSelector(producctSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types, productParam, metaData } = useAppSelector(state => state.catalog)
    const dispapatch = useAppDispatch();

    //console.log(metaData);
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

    useEffect(() => {
        if (!filtersLoaded) dispapatch(fetchFilters());
    }, [dispapatch, filtersLoaded]);


    if (!filtersLoaded) return <LoadingComponent message="Catalog Loading..." />

    // if (status.includes('pending') || !metaData) return <LoadingComponent message="Catalog Loading..." />



    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParam.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispapatch(setProductParams({ orderBy: e.target.value }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParam.brands}
                        onChange={(items: string[]) => dispapatch(setProductParams({ brands: items }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParam.types}
                        onChange={(items: string[]) => dispapatch(setProductParams({ types: items }))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb:2}}>
                {metaData && 
                    <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispapatch(setPageNumber({pageNumber: page}))}
                    />
                }                
            </Grid>
        </Grid>
    )
}