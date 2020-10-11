import React, { Fragment, useState, useEffect } from 'react';
import Login from '../Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import './app.scss';
import { Pages } from '../store/types';
import Dashboard from '../Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Pages.login}>
          <Login />
        </Route>
        <Route exact path={Pages.dashboard}>
          <Dashboard />
        </Route>
      </Switch>
      <Route exact path="/">
        <Redirect to={Pages.login} />
      </Route>
    </Router>
  );
}

export default App;
