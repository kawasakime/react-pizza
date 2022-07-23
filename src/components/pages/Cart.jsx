import { Link } from "react-router-dom";
import CartItem from "../CartItem";

import cartIcon from "../../assets/img/cart.svg";
import backArrow from "../../assets/img/back-arrow.svg";
import trashBasket from '../../assets/img/trash-basket.svg'

const Cart = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
              <img src={cartIcon} alt="" />
              Корзина
            </h2>
            <div className="cart__clear">
              <img src={trashBasket} alt="" />
              <span>Очистить корзину</span>
            </div>
          </div>
          <div className="content__items">
            <CartItem />
            <CartItem />
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                {" "}
                Всего пицц: <b>3 шт.</b>{" "}
              </span>
              <span>
                {" "}
                Сумма заказа: <b>900 ₽</b>{" "}
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
