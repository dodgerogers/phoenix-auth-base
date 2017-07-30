import { fromJS } from 'immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import logger from './lib/middleware/logger';

export default function (props, context) {
  return createStore(reducer, compose(
    applyMiddleware(thunkMiddleware, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
