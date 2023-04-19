import useHttp from "../../hooks/use-httpRequest";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const { meals } = useHttp();

  const mealsList = meals.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    >{meal.name}
    </MealItem>
  )

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;