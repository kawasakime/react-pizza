import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { Pizza } from "../../redux/types";

export const typesTitles: string[] = ["тонкое", "традиционное"];

type PizzaItemProps = {
  pizza: Pizza
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  const { items } = useSelector((state: RootState) => state.cart);

  const [currentType, setCurrentType] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);

  const dispatch = useDispatch();

  const { id, imageUrl, title, price, types, sizes } = pizza;
  const item = { ...pizza, price: calcPrice(), currentType, currentSize };

  function calcPrice(): number {
    let currentPrice = price;
    currentPrice += currentType === 1 ? 30 : 0;

    if (currentSize === 1) currentPrice += 75;
    else if (currentSize === 2) currentPrice += 150;

    return currentPrice;
  }

  function getCount(): number {
    const getItems = items.filter((e) => e.id === id);
    return getItems.reduce((sum, e) => sum + e.count, 0);
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type: number) => (
            <li
              key={type}
              className={currentType === type ? "active" : null}
              onClick={() => setCurrentType(type)}
            >
              {typesTitles[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, i: number) => (
            <li
              key={i}
              className={currentSize === i ? "active" : null}
              onClick={() => setCurrentSize(i)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{calcPrice()} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={() => {
            dispatch(addItemToCart(item));
          }}
        >
          <svg
            width="12"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2a1.2 1.2 0 0 0-2.4 0v3.6H1.2a1.2 1.2 0 0 0 0 2.4h3.6v3.6a1.2 1.2 0 0 0 2.4 0V7.2h3.6a1.2 1.2 0 0 0 0-2.4Z"
              fill="#fff"
            />
          </svg>
          <span>Добавить</span>
          {!!getCount() && <i>{getCount()}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
