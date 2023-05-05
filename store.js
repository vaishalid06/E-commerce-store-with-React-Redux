import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';//export in carstslice,import in store
//we can creates multiple slice for another data,export the slice,import here eg.products:productReducer
//we can add multiple reducers here
import productReducer from './productSlice';

const store=configureStore({
    reducer:{//proeprty
        cart:cartReducer,//reducers,//we apply cartReducer name for our reducers
        product:productReducer,
    },
});

export default store;