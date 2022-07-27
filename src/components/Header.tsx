import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/pizza-logo.svg";
import Search from "./Search";

import cartIcon from "../assets/img/cart.svg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const { totalCount, totalPrice } = useSelector((state: RootState) => state.cart);
  const { pathname } = useLocation();
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname !== "/cart" && (
          <>
            <Search />
            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice} ₽</span>
                <div className="button__delimiter"></div>
                <img src={cartIcon} alt="" />
                <span>{totalCount}</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
