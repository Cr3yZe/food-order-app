import React, { useState, useEffect, useContext } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnBumpState, changeBtnBumpState] = useState(false);

  const btnClasses = `${classes.button} ${btnBumpState ? classes.bump : ''}`;

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  useEffect(() => {
    if (items.length !== 0) {
      changeBtnBumpState(true);
    }

    const timer = setTimeout(() => {
      changeBtnBumpState(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  const numberOfItems = items.reduce((curNumber, item) => curNumber + item.amount, 0);


  return <button className={btnClasses} onClick={props.onCartClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfItems}</span>
  </button>
};

export default HeaderCartButton