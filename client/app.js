import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Routes from './routes';

import 'semantic-ui-css/semantic.min.css';

const store = createStore(() => {})

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("app")
)
