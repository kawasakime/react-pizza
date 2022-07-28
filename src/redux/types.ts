//********************************************** */
//PIZZA SLICE

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

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaState {
  items: Pizza[];
  status: Status;
}

//********************************************** */
//FILTER SLICE

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

//********************************************** */
//CART CLICE

export interface CartPizza extends Pizza {
  price: number;
  currentType: number;
  currentSize: number;
  count?: number;
}

export interface cartState {
  items: CartPizza[];
  totalCount: number;
  totalPrice: number;
}

//********************************************** */
//SEARCH CLICE

export type SearchString = {
  value: string
}