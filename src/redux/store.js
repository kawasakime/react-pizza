import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices.js/cartSlice";
import filterSlice from "./slices.js/filterSlice";
import pizzaSlice from "./slices.js/pizzaSlice";
import searchSlice from "./slices.js/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice
  },
});
