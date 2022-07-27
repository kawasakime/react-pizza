import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type SortProperty = {
  name: string;
  param: string;
  order: string;
}

export interface FilterState {
  category: number;
  currentPage: number;
  sort: SortProperty;
}

const initialState: FilterState = {
  category: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    param: "rating",
    order: "desc",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortProperty>) => {
      state.sort = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.sort = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
      state.category = +action.payload.category;
    },
  },
});

export const { setSort, setCategory, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
