import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Pizza {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaState {
  items: Pizza[];
  status: Status;
}

export const getPizzasData = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/getPizzasDataStatus",
  async (params) => {
    const { categoryQuery, sortBy, order, currentPage, searchValue } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62d9b7eb5d893b27b2ebff37.mockapi.io/items?page=${currentPage}&limit=4&search=${searchValue}&${categoryQuery}&sortBy=${sortBy}&order=${order}`
    );
    return data;
  }
);

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPizzasData.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(getPizzasData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(getPizzasData.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
