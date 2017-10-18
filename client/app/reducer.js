import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-oauth';
import modalsReducer from './common/modals/modalsReducer';

const rootReducer = combineReducers({
  auth: authStateReducer,
  modals: modalsReducer,
});

export default rootReducer;
