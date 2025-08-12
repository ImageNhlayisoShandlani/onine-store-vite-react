// store.ts
import { configureStore, createSlice } from "@reduxjs/toolkit";
import type ProductType from "../models/productType";
import type CartType from "../models/cartType";


const loadCartFromLocalStorage = (): CartType[] => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToLocalStorage = (cart: CartType[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Error saving cart:", e);
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState: [] as ProductType[],
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) =>
      state.filter((item) => item.product.id !== action.payload.id),
    clearCart: () => [],
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setAuthUser: (state, action) => action.payload,
    clearAuthUser: () => null,
  },
});


const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});


store.subscribe(() => {
  const state = store.getState();
  saveCartToLocalStorage(state.cart);
});


export const { setProducts } = productsSlice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default store;
