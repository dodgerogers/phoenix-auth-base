import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes';

// TODO put in layout component
import 'semantic-ui-css/semantic.min.css';
import '../assets/app.scss'

render(
  <Provider store={store()}>
    <Routes />
  </Provider>,
  document.getElementById("app")
)
