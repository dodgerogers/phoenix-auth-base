import { combineReducers } from 'redux';
import { authStateReducer as auth } from 'redux-oauth';
import { reducer as form } from 'redux-form/immutable';
import { Reducer as modals } from './common/modals';

const rootReducer = combineReducers({
  auth,
  form,
  modals,
});

export default rootReducer;
