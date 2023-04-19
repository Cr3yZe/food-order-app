import { useState, useEffect } from 'react';

const useHttp = () => {
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    fetch('https://app-16a0c-default-rtdb.firebaseio.com/meals.json')
    .then(data => data.json())
    .then(data => setMeals(data));
  }, [])

  const sendOrder = settings => {
    if (settings) {
      fetch('https://app-16a0c-default-rtdb.firebaseio.com/orders.json', settings)
      .then(data => data.json())
      .then(response => console.log(response))
    }
  }

  return {
    meals,
    sendOrder
  };
};

export default useHttp;