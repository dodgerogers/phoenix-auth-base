import { fromJS } from 'immutable';
import { actionTypes, areaIDs } from './constants';

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
    case actionTypes.NOTIFY_SUCCESS:
      const area = action.id || areaIDs.APPLICATION;
      return state.update(area, array => array.push(fromJS(action.notification)));
    case actionTypes.DESTROY:
      return state.update(action.id, array => array.delete(action.index));
    default:
      return state;
  };
}
