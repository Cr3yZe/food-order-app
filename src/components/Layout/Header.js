import React, { Fragment, useState } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImage from '../../Assets/meals.jpg'
import classes from './Header.module.css'

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onCartClick={props.onCartClick} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of food!' />
      </div>
    </Fragment>
  );
}

export default Header;