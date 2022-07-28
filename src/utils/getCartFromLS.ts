import { cartState } from "../redux/types";

export const getCartData = (): cartState => {
  if (!localStorage.getItem("cart")) {
    return { items: [], totalCount: 0, totalPrice: 0 } as cartState;
  }

  return JSON.parse(localStorage.getItem("cart"));
};
