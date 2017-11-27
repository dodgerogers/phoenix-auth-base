import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import * as NotificationActions from '../actions';
import { formIDs, actionTypes } from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AuthenticationActions', () => {
  describe('notifySuccess', () => {
    let message, mockAreaID;
    beforeEach(() => {
      mockAreaID = 'mockAreaID';
      message = 'message';
    });

    it('dispatches with expected actions', () => {
      expect(NotificationActions.notifySuccess(mockAreaID, message)).toMatchSnapshot();
    });
  });
});
