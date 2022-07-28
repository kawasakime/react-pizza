import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCartData } from "../../utils/getCartFromLS";
import { CartPizza, cartState } from "../types";

const { items, totalCount, totalPrice } = getCartData();

const initialState: cartState = {
  items,
  totalCount,
  totalPrice,
};

function findItemIndex(items: CartPizza[], item: CartPizza) {
  return items.findIndex(
    (e) =>
      e.id === item.id &&
      e.currentType === item.currentType &&
      e.currentSize === item.currentSize
  );
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartPizza>) => {
      let item: CartPizza = action.payload;
      const index = findItemIndex(state.items, item);
      if (index !== -1) {
        state.items[index].count += 1;
      } else {
        state.items.push({ ...item, count: 1 });
      }
      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
    removeItemFromCart: (state, action: PayloadAction<CartPizza>) => {
      const index = findItemIndex(state.items, action.payload);
      state.items = [
        ...state.items.slice(0, index),
        ...state.items.slice(index + 1),
      ];
      state.totalCount -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
    },
    decreaseItemsCount: (state, action: PayloadAction<CartPizza>) => {
      const index = findItemIndex(state.items, action.payload);
      state.items[index].count -= 1;
      state.totalCount -= 1;
      state.totalPrice -= action.payload.price;
    },
    increaseItemsCount: (state, action: PayloadAction<CartPizza>) => {
      const index = findItemIndex(state.items, action.payload);
      state.items[index].count += 1;
      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },
  },
});

export const {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  decreaseItemsCount,
  increaseItemsCount,
} = cartSlice.actions;
export default cartSlice.reducer;
