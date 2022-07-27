import { cartState } from "../redux/slices/cartSlice";

export const getCartData = (): cartState => {
  if (!localStorage.getItem("cart")) {
    return { items: [], totalCount: 0, totalPrice: 0 } as cartState;
  }

  return JSON.parse(localStorage.getItem("cart"));
};
