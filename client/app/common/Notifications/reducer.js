import { fromJS } from 'immutable';
import { actionTypes, areaIDs } from './constants';
import uid from '../../lib/utils/UidGenerator';


const initialNotification = fromJS({
  level: null,
  message: null,
});

const initialList = fromJS([]);

export const initialState = fromJS({
  [areaIDs.APPLICATION]: initialList,
  [areaIDs.AUTHENTICATION]: initialList,
});

export default function notificationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.NOTIFY:
      return state.update(getAreaID(action), array => array.push(incrementID(action.notification, array)));
    case actionTypes.DESTROY:
      return state.update(getAreaID(action), list => filterById(list, action.notification));
    default:
      return state;
  };
}

const getAreaID = (action) => {
  return action.id || areaIDs.APPLICATION;
}

const incrementID = (notification, array) => {
  const lastNotification = array.get(-1);
  const id = lastNotification ? lastNotification.get('id') + 1 : 0;
  notification.id = id;

  return fromJS(notification);
}

const filterById = (list, notification) => {
  return list.filter(n => n.get('id') !== notification.get('id'))
}
