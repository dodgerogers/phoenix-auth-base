import { fromJS } from 'immutable';
import { actionTypes, areaIDs } from './constants';
import uidGenerator from '../../lib/utils/UidGenerator';

const initialNotification = fromJS({
  level: null,
  message: null,
});

export const initialState = fromJS({
  [areaIDs.APPLICATION]: fromJS([]),
  [areaIDs.AUTHENTICATION]: fromJS([]),
});

export default function notificationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.NOTIFY:
      return state.update(areaID(action), array => array.push(formatNotification(action)));
    case actionTypes.DESTROY:
      return state.update(areaID(action), array => array.filter(n => n.get('id') !== action.notification.get('id')));
    default:
      return state;
  };
}

const areaID = (action) => {
  return action.id || areaIDs.APPLICATION;
}

const formatNotification = (action) => {
  const { notification } = action;
  notification.id == uidGenerator();

  return fromJS(notification);
}
