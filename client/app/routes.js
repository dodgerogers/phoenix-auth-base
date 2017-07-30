import React from 'react'
import { Redirect } from 'react-router';
import { HashRouter, Switch, Route } from 'react-router-dom';
import history from 'history';
import LoginModal from './authentication/components/LoginModal.jsx';


export default () => (
  <HashRouter
    history={history}
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <Switch>
      <Route exact path='/' component={LoginModal} />
      <Route path="/errors/404" component={() => (<p>404 Not found</p>)} />
      <Redirect from="*" to="/errors/404" />
    </Switch>
  </HashRouter>
);
