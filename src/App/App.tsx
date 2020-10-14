import React from 'react';
import Login from '../Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './app.scss';
import { Pages } from '../store/types';
import Dashboard from '../Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={Pages.login} component={Login} />
        <Route exact path={Pages.dashboard} component={Dashboard} />
        <Route exact path="/">
        <Redirect to={Pages.login} />
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
