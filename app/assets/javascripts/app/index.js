import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from "react-router";

import BaseLayout from "./components/layouts/Base";
import DashboardLayout from "./components/layouts/Dashboard";
import injectTapEventPlugin from 'react-tap-event-plugin';
import DashboardOverviewPage from "./components/pages/dashboard/Overview";
import LoginPage from "./components/pages/Login";
import { store, history } from './createStore';
import { check } from './services/sessions';

// generated components paths
import Currencies from './components/currencies';
import Currency from './components/currencies/show';
import CurrencyForm from './components/currencies/form';
import Purses from './components/purses';
import Purse from './components/purses/show';
import PurseForm from './components/purses/form';
import Expenses from './components/expenses';
import Expense from './components/expenses/show';
import ExpenseForm from './components/expenses/form';
import Categories from './components/categories';
import Category from './components/categories/show';
import CategoryForm from './components/categories/form';


window.onload = function () {
  injectTapEventPlugin();
  ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route name="base" path="/" component={BaseLayout}>
        <Route name="dashboard" path='' component={DashboardLayout} onEnter={check}>
          <IndexRoute name="dashboard.overview" component={DashboardOverviewPage} />
          {/*generated routes:*/}
          <Route name='currencies' path='currencies' component={Currencies} />
          <Route name='new_currency' path='currency/new' component={CurrencyForm} />
          <Route name='edit_currency' path='currency/:id/edit' component={CurrencyForm} />
          <Route name='show_currency' path='currency/:id' component={Currency} />
          <Route name='purses' path='purses' component={Purses} />
          <Route name='new_purse' path='purse/new' component={PurseForm} />
          <Route name='edit_purse' path='purse/:id/edit' component={PurseForm} />
          <Route name='show_purse' path='purse/:id' component={Purse} />
          <Route name='expenses' path='expenses' component={Expenses} />
          <Route name='new_expense' path='expense/new' component={ExpenseForm} />
          <Route name='edit_expense' path='expense/:id/edit' component={ExpenseForm} />
          <Route name='show_expense' path='expense/:id' component={Expense} />
          <Route name='categories' path='categories' component={Categories} />
          <Route name='new_category' path='category/new' component={CategoryForm} />
          <Route name='edit_category' path='category/:id/edit' component={CategoryForm} />
          <Route name='show_category' path='category/:id' component={Category} />
        </Route>
        <Route name="login" path='login' component={LoginPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
  );

};
