import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import { Inventory } from "./components/inventory/inventory";
import {CheckoutComponent} from "./components/checkout/CheckoutComponent";
import { CreateCharts } from "./components/charts/createCharts";
import { Dashboard } from "./components/dashboard/dashboard";
import Login from "./components/login-page/login";

const Reports = () => {
  return (
    <>
      <Navbar />
      <section
        className="hero-section background-img"
        style={{
          height: window.innerHeight - 100,
        }}
      >
        <p>Reports</p>
        <h1></h1>
      </section>
    </>
  );
};

const User = () => {
  return (
    <>
      <Navbar />
      <section
        className="hero-section background-img"
        style={{
          height: window.innerHeight - 100,
        }}
      >
        <p>User </p>
        <h1></h1>
      </section>
    </>
  );
};

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>

      <Route exact path="/inventory">
        <Inventory />
      </Route>

      <Route path="/dashboard">
        <Dashboard/>
      </Route>

      <Route path="/checkout">
        <CheckoutComponent />
      </Route>
      
    </Switch>
  );
};

export default App;
