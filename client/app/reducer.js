import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-oauth';
import { reducer as formsReducer } from 'redux-form/immutable'
import modalsReducer from './common/modals/modalsReducer';

const rootReducer = combineReducers({
  auth: authStateReducer,
  form: formsReducer,
  modals: modalsReducer,
});

export default rootReducer;
