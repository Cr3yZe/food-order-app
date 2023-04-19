import React, { Fragment, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [cartState, changeCartState] = useState(false);

  const onShowCart = () => {
    changeCartState(true);
  }

  const onHideCart = () => {
    changeCartState(false);
  }

  return (
    <Fragment>
      {cartState && <Cart onCloseCart={onHideCart} />}
      <Header onCartClick={onShowCart} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
