import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";

function Loading() {
  return <div>Loading...</div>;
}

const Balance = Loadable({
  loader: () => import("./containers/Account/Balance"),
  loading: Loading
});

const Ledger = Loadable({
  loader: () => import("./containers/Account/Ledger"),
  loading: Loading
});

const Orders = Loadable({
  loader: () => import("./containers/Account/Orders"),
  loading: Loading
});

const Pair = Loadable({
  loader: () => import("./containers/Pairs/Pair"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", name: "Home", component: DefaultLayout, exact: true },
  {
    path: "/account/balance",
    name: "Balance",
    component: Balance,
    exact: true
  },
  {
    path: "/account/ledger",
    name: "Ledger",
    component: Ledger,
    exact: true
  },
  {
    path: "/account/orders",
    name: "Orders",
    component: Orders,
    exact: true
  },
  { path: "/pair/:id", name: "Pairs", component: Pair, exact: true }
];

export default routes;
