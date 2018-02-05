import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux'
import store from './store'
import BaseLayout from './layout/components/BaseLayout';


export default () => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      onUpdate={() => window.scrollTo(0, 0)}
    >
      <Route path="/" component={BaseLayout}>
        <Route exact path='/' component={() => (<p>welcome...</p>)} />
        <Route path="/errors/404" component={() => (<p>404 Not found</p>)} />
        <Redirect from="*" to="/errors/404" />
      </Route>
    </Router>
  </Provider>
);
