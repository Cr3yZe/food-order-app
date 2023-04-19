import React, { useContext } from 'react';

import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

import classes from './MealItem.module.css'

const MealItem = props => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const sendMealDataHandler = amount => {
    const meal = {
      name: props.name,
      price: props.price,
      amount: amount,
      id: props.id,
    }

    cartCtx.addItem(meal);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onSendAmount={sendMealDataHandler}/>
      </div>
    </li>
  )
};

export default MealItem;