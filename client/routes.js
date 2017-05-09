import React from 'react'
import { Redirect } from 'react-router';
import { HashRouter, Switch, Route } from 'react-router-dom';
import history from 'history';

export default () => (
  <HashRouter history={history}>
    <Switch>
      <Route exact path='/' component={() => (<p>Teebox</p>)} />
      <Route path="/errors/404" component={() => (<p>404 Not found</p>)} />
      <Redirect from="*" to="/errors/404" />
    </Switch>
  </HashRouter>
);
