import CartItemRemove from "./UI/CartItemRemoveBtn";
import CountMinusBtn from "./UI/CountMinusBtn";
import CountPlusBtn from "./UI/CountPlusBtn";

const CartItem = () => {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img
          className="pizza-block__image"
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
          alt="Pizza"
        />
      </div>
      <div className="cart__item-info">
        <h3>Сырный цыпленок</h3>
        <p>тонкое тесто, 26 см.</p>
      </div>
      <div className="cart__item-count">
        <CountMinusBtn />
        <b>2</b>
        <CountPlusBtn />
      </div>
      <div className="cart__item-price">
        <b>770 ₽</b>
      </div>
      <CartItemRemove/>
    </div>
  );
};

export default CartItem;
