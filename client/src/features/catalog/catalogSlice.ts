import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Product } from "../../models/Product";

// productsAdapter is used nomalization to prevent loading in every page
const productsAdapter = createEntityAdapter<Product>();


export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => { // _ means we are sending void
        try {
            return await agent.Catalog.list()
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

//we are handling error inside the async function but not in thunk function, so we are using thunkAPI
export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId)
        } catch (error: any) {
            //console.log(error);
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)



export const catalogSlice = createSlice({
    name: 'catalog',
    // productsAdapter is used nomalization to prevent loading in every page
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => { // here action is coming from thunkAPI
            console.log(action);
            state.status = 'idle';
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => { // here action is coming from thunkAPI
            console.log(action);
            state.status = 'idle';
        });
    })
})

//Using selectors with createEntityAdapter for use
export const producctSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);


