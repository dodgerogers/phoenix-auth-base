import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import * as NotificationActions from '../actions';
import { formIDs, actionTypes } from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('NotificationActions', () => {
  const mockAreaID = 'mockAreaID';
  const message = 'message';

  describe('notify', () => {
    it('dispatches with expected actions', () => {
      expect(NotificationActions.notify(message, mockAreaID)).toMatchSnapshot();
    });
  });

  describe('notifyError', () => {
    it('dispatches with expected actions', () => {
      expect(NotificationActions.notifyError(message, mockAreaID)).toMatchSnapshot();
    });
  });

  describe('destroy', () => {
    let mockNotification;
    beforeEach(() => {
      mockNotification = fromJS({ id: 1, message });
    });

    it('dispatches with expected actions', () => {
      expect(NotificationActions.destroy(mockAreaID, mockNotification)).toMatchSnapshot();
    });
  });
});
