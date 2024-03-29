import { fromJS } from 'immutable';
import { areaIDs, actionTypes } from '../constants';
import notificationReducer, { initialState } from '../reducer';


describe('notificationReducer', () => {
  const mockNotification = {
    message: 'message',
    level: 'level',
  };

  const notifyAction = () => ({
    type: actionTypes.CREATE_NOTIFICATION,
    id: areaIDs.AUTHENTICATION,
    notification: mockNotification,
  });

  describe('NOTIFY', () => {
    it('adds notification to given ID', () => {
      expect(notificationReducer(initialState, notifyAction())).toMatchSnapshot();
    });

    it('adds notification to global id when ID not present', () => {
      const actionWithNoId = notifyAction();
      actionWithNoId.id = null;

      expect(notificationReducer(initialState, actionWithNoId)).toMatchSnapshot();
    });

    it('increments notification ID property', () => {
      const state = notificationReducer(state, notifyAction());

      expect(notificationReducer(state, notifyAction())).toMatchSnapshot();
    });
  });

  describe('destroy', () => {
    it('removes given notification from the given collection', () => {
      const state = notificationReducer(state, notifyAction());
      const firstNotification = state.getIn([areaIDs.AUTHENTICATION, 0]);
      const destroyAction = {
        type: actionTypes.DESTROY_NOTIFICATION,
        id: areaIDs.AUTHENTICATION,
        notification: firstNotification,
      };

      expect(state).toMatchSnapshot();
      expect(notificationReducer(state, destroyAction)).toMatchSnapshot();
    });
  });
});
