import { configureStore } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { basketSlice } from "../../features/basket/basketSlice";
import counterReducer from "../../features/contact/counterReducer";
import { counterSlice } from "../../features/contact/counterSlice";


// export function configureStore(){
//     return createStore(counterReducer);
// }


export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        basket: basketSlice.reducer
    }
})

//creaeting Type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
//end creaeting Type

//creating own hook for configureStore
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

