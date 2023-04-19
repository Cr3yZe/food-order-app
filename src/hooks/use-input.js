import { useState } from 'react';

const useInput = checkData => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const inputValueIsValid = checkData(enteredValue) &&  isTouched;
  const hasError = !inputValueIsValid && isTouched;

  const saveInputValueHandler = event => {
    setEnteredValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  }

  const resetHandler = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

  const classes = hasError ? 'invalid' : '';

  return {
    value: enteredValue,
    saveInputValueHandler,
    hasError,
    inputValueIsValid,
    blurHandler,
    resetHandler,
    classes,
  }
};

export default useInput