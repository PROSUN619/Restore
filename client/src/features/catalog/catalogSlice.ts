import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../models/pagination";
import { Product, ProductParams } from "../../models/Product";


interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean,
    status: string,
    brands: string[],
    types: string[],
    productParam: ProductParams;
    metaData: MetaData | null;
}


// productsAdapter is used nomalization to prevent loading in every page
const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParam: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParam.pageNumber.toString());
    params.append('pageSize', productParam.pageSize.toString());
    params.append('orderBy', productParam.orderBy);
    if (productParam.searchTerm) params.append('searchTerm', productParam.searchTerm)
    if (productParam.brands.length > 0) params.append('brands', productParam.brands.toString())
    if (productParam.types.length > 0) params.append('types', productParam.types.toString())
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => { // _ means we are sending void
        const params = getAxiosParams(thunkAPI.getState().catalog.productParam)
        try {
            const response =  await agent.Catalog.list(params)
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
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

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.fetchFilter()
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    // productsAdapter is used nomalization to prevent loading in every page
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParam: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParam = { ...state.productParam, ...action.payload, pageNumber:1 };
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParam = { ...state.productParam, ...action.payload}
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        resetProductParams: (state) => {
            state.productParam = initParams();
        }
    },
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
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => { // here action is coming from thunkAPI
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

//Using selectors with createEntityAdapter for use
export const producctSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

//export function for dispatch 
export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;
