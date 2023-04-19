import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvaialableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvaialableMeals />
    </Fragment>
  )
};

export default Meals;