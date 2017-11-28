import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import * as NotificationActions from '../actions';
import { formIDs, actionTypes } from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../lib/utils/UidGenerator', () => {
  return jest.fn(() => 1);
});

describe('AuthenticationActions', () => {
  const mockAreaID = 'mockAreaID';
  describe('notify', () => {
    let message;
    beforeEach(() => {
      message = 'message';
    });

    it('dispatches with expected actions', () => {
      expect(NotificationActions.notify(mockAreaID, message)).toMatchSnapshot();
    });
  });

  describe('destroy', () => {
    let message, mockNotification;
    beforeEach(() => {
      message = 'message';
      mockNotification = fromJS({ message });
    });

    it('dispatches with expected actions', () => {
      expect(NotificationActions.destroy(mockAreaID, mockNotification)).toMatchSnapshot();
    });
  });
});
