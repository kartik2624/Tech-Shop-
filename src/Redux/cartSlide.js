import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart(state, action){
            console.log(action);
            
            state.push(action.payload)

        },
        removeFromCart(state, action){

        }
    }
})

export default cartSlice.reducer
export const {addToCart, removeFromCart} = cartSlice.actions