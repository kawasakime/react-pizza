import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
      state.category = +action.payload.category;
    },
  },
});

export const { setSort, setCategory, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
