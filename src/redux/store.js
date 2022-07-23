import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './slices.js/searchSlice'

export const store = configureStore({
  reducer: {
    search: searchSlice
  },
})
