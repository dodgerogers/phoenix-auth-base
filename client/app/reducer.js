import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-oauth';

const rootReducer = combineReducers({
  auth: authStateReducer,
});

export default rootReducer;
