import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaItem from "./components/PizzaItem";
import Sort from "./components/Sort";

import "./scss/app.scss";
import { useEffect, useState } from "react";
import Skeleton from "./components/PizzaItem/Skeleton";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const resource = fetch("https://62d9b7eb5d893b27b2ebff37.mockapi.io/items");

  useEffect(() => {
    resource
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data)
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((e, i) => <Skeleton key={i} />)
                : pizzas.map((pizza, i) => <PizzaItem key={i} {...pizza} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
