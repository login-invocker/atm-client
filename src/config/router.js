import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './router.css'
import RegisterPage from "../pages/register-page"
import LoginPage from "../pages/login-page"
import HomePage from "../pages/home-page"
import RechargePage from "../pages/recharge-page"
import Withdrawall from "../pages/withdrawal-page"
import TransfersPage from "../pages/transfers-page"
import BalanceInquiryPage from "../pages/balance-inquiry-page"
import ManageUserPage from "../pages/admin/manage-user"

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routes = [
  {
    path: "/register",
    component: RegisterPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/home",
    component: HomePage
  },
  {
    path: "/recharge",
    component: RechargePage
  },
  {
    path: "/withdrawal",
    component: Withdrawall
  },
  {
    path: "/transfers",
    component: TransfersPage
  },
  {
    path: "/balance-inquiry",
    component: BalanceInquiryPage
  },
  {
    path: "/manage-user",
    component: ManageUserPage
  }
];

export default function RouteConfigExample() {
  return (
   
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
    
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}



function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}
