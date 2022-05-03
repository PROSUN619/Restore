import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {Box, Button, Grid, Paper, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./basketSummary";

export default function BasketPage() {
    //below commented code is not required bcz we have centralised the state using storecontext
    /*
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);
    
    useEffect(() => {
        agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }, []);
    //add [] dependancy that means basket will only be loaded for the first time
    if (loading) return <LoadingComponent message="Loading Basket..." />
    */
    const { basket, setBasket, removeItem } = useStoreContext();
    // const [loading, setLoading] = useState(false);
    // to make loading flag unique
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name: name });
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    function handleRemoveItem(productId: number, quantiry = 1, name: string) {
        setStatus({ loading: true, name: name });
        agent.Basket.removeItem(productId, quantiry)
            .then(basket => removeItem(productId, quantiry))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }



    if (!basket) return <Typography variant='h3'>Your Basket is empty</Typography>


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'rem' + item.productId}
                                        onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)}
                                        color='success'>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' + item.productId}
                                        onClick={() => handleAddItem(item.productId, 'add' + item.productId)}
                                        color='success'>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'del' + item.productId}
                                        onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button component={Link} to='/checkout' variant='contained' size="large" fullWidth>checkout</Button>
                </Grid>
            </Grid>
        </>

    )
}