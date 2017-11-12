import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form/immutable';
import { Reducer as modals } from './common/modals';
import authenticationReducer from './authentication/reducer';


const rootReducer = combineReducers({
  authentication: authenticationReducer,
  form,
  modals,
});

export default rootReducer;
