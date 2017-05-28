import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Routes from './routes';
import logger from './lib/middleware/logger';

import 'semantic-ui-css/semantic.min.css';

const store = createStore(() => {}, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("app")
)
