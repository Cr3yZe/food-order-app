import React, { useState, useContext } from 'react';

import classes from './Checkout.module.css';
import useHttp from '../../hooks/use-httpRequest';
import useInput from '../../hooks/use-input';
import CartContext from '../../store/cart-context';

const checkValue = data => data.trim() !== '';
const checkPostalCode = data => {
  if (data.trim('') === '') {
    return;
  }

  const numbers = data.split('')

  return numbers.length < 7;
};

const Checkout = props => {
  const { sendOrder } = useHttp();

  const { items: foodOrdered, totalAmount: totalPrice, clearCart: clearCartProvider } = useContext(CartContext);

  const {
    value: nameValue,
    saveInputValueHandler: nameSaveHandler,
    hasError: nameHasError,
    inputValueIsValid: nameIsValid,
    blurHandler: nameBlurHandler,
    classes: nameClasses,
    resetHandler: nameReset
  } = useInput(checkValue)

  const {
    value: streetValue,
    saveInputValueHandler: streetSaveHandler,
    hasError: streetHasError,
    inputValueIsValid: streetIsValid,
    blurHandler: streetBlurHandler,
    classes: streetClasses,
    resetHandler: streetReset
  } = useInput(checkValue)

  const {
    value: postalCodeValue,
    saveInputValueHandler: postalCodeSaveHandler,
    hasError: postalCodeHasError,
    inputValueIsValid: postalCodeIsValid,
    blurHandler: postalCodeBlurHandler,
    classes: postalCodeClasses,
    resetHandler: postalCodeReset
  } = useInput(checkPostalCode);

  const {
    value: cityValue,
    saveInputValueHandler: citySaveHandler,
    hasError: cityHasError,
    inputValueIsValid: cityIsValid,
    blurHandler: cityBlurHandler,
    classes: cityClasses,
    resetHandler: cityReset
  } = useInput(checkValue);

  const cancelHandler = (event) => {
    event.preventDefault();

    props.onCloseCart();
  }

  const sendOrderHandler = event => {
    event.preventDefault();

    nameBlurHandler();
    streetBlurHandler();
    postalCodeBlurHandler();
    cityBlurHandler();

    if (!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid) {
      return;
    }

    const orderRequest = {
      name: nameValue,
      street: streetValue,
      postalCode: postalCodeValue,
      city: cityValue,
      orderDetails: {
        foodOrdered,
        totalPrice
      }
    }

    sendOrder({
      method: 'POST',
      headers: {
        'Content-tpye': 'application/json'
      },
      body: JSON.stringify(orderRequest)
    });

    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();

    clearCartProvider();
    props.messageStateHandler(true);
  };

  return (
    <>
      <div className={classes.control}>
        {!props.messageState && <form className={classes.form} onSubmit={sendOrderHandler}>
          <div className={classes[nameClasses]}>
            <label htmlFor='name' >Your Name</label>
            <input
              type='text'
              id='name'
              onChange={nameSaveHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
            />
            {nameHasError && <p>The name in incorrect!</p>}
          </div>
          <div className={classes[streetClasses]}>
            <label htmlFor='street'>Street</label>
            <input
              type='text'
              id='street'
              onChange={streetSaveHandler}
              onBlur={streetBlurHandler}
              value={streetValue}
            />
            {streetHasError && <p>The street is incorrect!</p>}
          </div>
          <div className={classes[postalCodeClasses]}>
            <label htmlFor='postal'>Postal Code</label>
            <input
              type='number'
              id='postal'
              onChange={postalCodeSaveHandler}
              onBlur={postalCodeBlurHandler}
              value={postalCodeValue}
            />
            {postalCodeHasError && <p>The postal code must not contain more than 6 numbers!</p>}
          </div>
          <div className={classes[cityClasses]}>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              onChange={citySaveHandler}
              onBlur={cityBlurHandler}
              value={cityValue}
            />
            {cityHasError && <p>The city is incorrect!</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={cancelHandler} >Cancel</button>
            <button className={classes.submit} type='submit' >Confirm</button>
          </div>
        </form >}
        {props.messageState &&
          <div className={classes.actions}>
            <p>The Order was successfully send!</p>
            <button type='button' className={classes.submit} onClick={cancelHandler} >Cancel</button>
          </div>
        }
      </div >
    </>
  );
};

export default Checkout