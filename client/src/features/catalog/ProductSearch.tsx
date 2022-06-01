import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";



export default function ProductSearch() {

    const {productParam} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParam.searchTerm);
    const dispatch = useAppDispatch();

    //we are delaying search by using debounce method from material UI
    const debounceSearch = debounce((event:any) => {
        dispatch(setProductParams({searchTerm: event.target.value}));
    },1000)

    return (
        <TextField
            label='Search Product'
            variant="outlined"
            fullWidth
            value ={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debounceSearch(event);
            }}
        />
    )
}