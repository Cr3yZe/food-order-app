import React, { useState, useRef } from "react";

import Input from "../../UI/Input";

import classes from './MealItemForm.module.css'

const MealItemForm = props => {
  const [formState, setFormState] = useState(true);

  const mealAmountRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const amount = mealAmountRef.current.value;
    const amountNumber = +amount;

    if (amount.trim() === 0 || amountNumber < 1 || amountNumber > 5) {
      setFormState(false);
      return;
    }

    props.onSendAmount(amountNumber);
  };

  return <form className={classes.form} onSubmit={submitHandler}>
    <Input ref={mealAmountRef} label="Amount" input={{
      id: `amount ${props.id}`,
      type: 'number',
      min: '1',
      max: '5',
      step: '1',
      defaultValue: '1',
    }} />
    <button>+ Add</button>
    {!formState && <p>Please enter a valid number (1-5)</p>}
  </form>
};

export default MealItemForm;