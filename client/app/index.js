import React from 'react'
import { render } from 'react-dom'
import Loadable from 'react-loadable';
import LoadingScreen from './layout/components/LoadingScreen';


const LoadableRoutes = Loadable({
  loader: () => import('./routes'),
  loading: LoadingScreen,
});

render(
  <LoadableRoutes />,
  document.getElementById("app")
)
