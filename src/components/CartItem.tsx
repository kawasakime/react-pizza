import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseItemsCount,
  increaseItemsCount,
  removeItemFromCart,
} from "../redux/slices/cartSlice";
import { typesTitles } from "./PizzaItem";
import CartItemRemove from "./UI/CartItemRemoveBtn";
import CountMinusBtn from "./UI/CountMinusBtn";
import CountPlusBtn from "./UI/CountPlusBtn";
import { CartPizza } from "../redux/slices//cartSlice";

type CartItemProps = {
  item: CartPizza;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const {imageUrl, title, sizes, price, currentType, currentSize, count} = item;
  const dispatch = useDispatch();

  function firstLetterToUpper(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  function handlerRemoveItem() {
    dispatch(removeItemFromCart(item));
  }

  function handlerDecreaseCount() {
    dispatch(decreaseItemsCount(item));
  }

  function handlerIncreaseCount() {
    dispatch(increaseItemsCount(item));
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {firstLetterToUpper(typesTitles[currentType])} тесто,{" "}
          {sizes[currentSize]} см.
        </p>
      </div>
      <div className="cart__item-count">
        <CountMinusBtn onClickHandler={handlerDecreaseCount} />
        <b>{count}</b>
        <CountPlusBtn onClickHandler={handlerIncreaseCount} />
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <CartItemRemove onClickHandler={handlerRemoveItem} />
    </div>
  );
};

export default CartItem;
