import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaItem from "./components/PizzaItem";
import Sort from "./components/Sort";

import './scss/app.scss'

function App() {
  return (
    <div className="App">
      <div class="wrapper">
        <Header/>
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
              <PizzaItem/>
              <PizzaItem/>
              <PizzaItem/>
              <PizzaItem/>
              <PizzaItem/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
