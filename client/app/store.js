import { fromJS } from 'immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import logger from './lib/middleware/logger';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(
  applyMiddleware(sagaMiddleware, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

sagaMiddleware.run(rootSaga);


export default store;
