import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable';
import LoadingScreen from './layout/components/LoadingScreen';

import 'semantic-ui-css/semantic.min.css';

const Routes = Loadable({
  loader: () => import('./routes'),
  loading: LoadingScreen,
});

render(
  <Routes />,
  document.getElementById("app")
)
