import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css"
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
  const [checkout, setCheckout] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const cartCtx = useContext(CartContext);

  const cartAddItemHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartRemoveItemHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItems =
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item =>
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartAddItemHandler.bind(null, item)}
          onRemove={cartRemoveItemHandler.bind(null, item.id)}
        >
          {item.name}
        </CartItem>)}
    </ul>
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const cartItemsManagement = cartCtx.items.length === 0;

  const orderHandler = () => {
    console.log(true);
    setCheckout(true);
  }

  return <Modal onCloseCart={props.onCloseCart}>
    {cartItems}
    {!showMessage &&
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount}`}</span>
      </div>
    }
    {checkout && <Checkout onCloseCart={props.onCloseCart} messageStateHandler={setShowMessage} messageState={showMessage} />}
    <div className={classes.actions}>
      {!checkout && <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>}
      {!checkout && !cartItemsManagement && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  </Modal>
};

export default Cart