import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form/immutable';
import authenticationReducer from './authentication/reducer';
import accountsReducer from './accounts/reducer';
import { Reducer as modals } from './common/modals';
import { Reducer as notifications} from './common/Notifications';


const rootReducer = combineReducers({
  authentication: authenticationReducer,
  accounts: accountsReducer,
  form,
  modals,
  notifications,
});

export default rootReducer;
