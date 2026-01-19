import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlide"

const loadCartFromStorage = () => {
  const data = localStorage.getItem("cart")
  return data ? JSON.parse(data) : []
}

const saveCartToStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.cart))
}

export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: {
    cart: loadCartFromStorage()
  }
})

store.subscribe(() => {
  saveCartToStorage(store.getState())
})

export default store
