import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

import cartIcon from "../assets/img/cart.svg";
import backArrow from "../assets/img/back-arrow.svg";
import trashBasket from "../assets/img/trash-basket.svg";

import emptyCart from "../assets/img/empty-cart.png";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices.js/cartSlice";

const Cart = () => {
  const { items, totalCount, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="content">
      <div className="container container--cart">
        {!!items.length ? (
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
        ) : (
          <div className="cart cart--empty">
            <h2>
              Корзина пустая <span>😕</span>
            </h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <a href="/" className="button button--black">
              <span>Вернуться назад</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
