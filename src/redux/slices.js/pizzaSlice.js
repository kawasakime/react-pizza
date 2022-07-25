import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPizzasData = createAsyncThunk(
  "pizza/getPizzasDataStatus",
  async (params) => {
    const { categoryQuery, sortBy, order, currentPage, searchValue } = params;
    const { data } = await axios.get(
      `https://62d9b7eb5d893b27b2ebff37.mockapi.io/items?page=${currentPage}&limit=4&search=${searchValue}&${categoryQuery}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading'
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [getPizzasData.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [getPizzasData.fulfilled]: (state, action) => {
      state.status = 'success'
      state.items = action.payload;
    },
    [getPizzasData.rejected]: (state) => {
      state.status = 'error'
      state.items = []
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
