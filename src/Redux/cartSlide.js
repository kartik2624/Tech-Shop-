import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {

            const item = state.find(i => i.id === action.payload.id)

            if (item) {
                if (item.qty < 5) {
                    item.qty += 1
                }
            } else {
                state.push({ ...action.payload, qty: 1 })
            }
        },

        removeFromCart(state, action) {
            return state.filter(item => item.id !== action.payload)

        },
        incrementQty: (state, action) => {
            const item = state.find(i => i.id === action.payload)

            if (item && item.qty < 5) {
                item.qty += 1
            }
        },

        decrementQty: (state, action) => {

            const itemIndex = state.findIndex(i => i.id === action.payload)

            if (itemIndex !== -1) {

                if (state[itemIndex].qty > 1) {
                    state[itemIndex].qty -= 1
                } else {
                    // qty == 1 → REMOVE PRODUCT
                    state.splice(itemIndex, 1)
                }

            }
        }


    }
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, decrementQty, incrementQty } = cartSlice.actions