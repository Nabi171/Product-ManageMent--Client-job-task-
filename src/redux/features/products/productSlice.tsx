import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product, UniVersalType } from "../../../components/types/globalTypes"
// import { IProduct } from '@/types/globalTypes';

interface ICart {
  products: UniVersalType
  total: number
}

const initialState: ICart = {
  products: [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<UniVersalType>) => {
      const existing = state.products.find(
        (product: UniVersalType) => product._id === action.payload._id,
      )

      if (existing) {
        existing.quantity = (existing.quantity || 0) + 1
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }

      state.total += action.payload.price
    },
    removeOne: (state, action: PayloadAction<UniVersalType>) => {
      const existing = state.products.find(
        (product: UniVersalType) => product._id === action.payload._id,
      )

      if (existing && existing.quantity! > 1) {
        existing.quantity = (existing.quantity || 0) - 1
      } else {
        state.products = state.products.filter(
          (product: UniVersalType) => product._id !== action.payload._id,
        )
      }

      state.total -= action.payload.price
    },
    removeFromCart: (state, action: PayloadAction<UniVersalType>) => {
      const productToRemove = state.products.find(
        (product: UniVersalType) => product._id === action.payload._id,
      )
      if (!productToRemove) return

      state.products = state.products.filter(
        (product: UniVersalType) => product._id !== action.payload._id,
      )
      state.total -=
        (action.payload.price || 0) * (productToRemove.quantity || 0)
    },
  },
})

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions
export default cartSlice.reducer
