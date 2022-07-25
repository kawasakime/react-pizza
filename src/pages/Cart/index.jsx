import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";

import cartIcon from "../../assets/img/cart.svg";
import backArrow from "../../assets/img/back-arrow.svg";
import trashBasket from "../../assets/img/trash-basket.svg";

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices.js/cartSlice";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (items.length === 0) {
    return <EmptyCart/>
  }

  return (
    <div className="content">
      <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <img src={cartIcon} alt="" />
                Корзина
              </h2>
              <div className="cart__clear" onClick={handleClearCart}>
                <img src={trashBasket} alt="" />
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className="content__items">
              {items.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  {" "}
                  Всего пицц: <b>{totalCount} шт.</b>{" "}
                </span>
                <span>
                  {" "}
                  Сумма заказа: <b>{totalPrice} ₽</b>{" "}
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to={"/"}
                  className="button button--outline button--add go-back-btn"
                >
                  <img src={backArrow} alt="" />
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Cart;
