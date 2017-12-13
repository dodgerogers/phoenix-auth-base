import { actionTypes } from './constants';


export const notify = (message, areaID) => ({
  type: actionTypes.CREATE_NOTIFICATION,
  id: areaID,
  notification: {
    level: 'success',
    message,
  },
});

export const destroy = (notification, areaID) => ({
  type: actionTypes.DESTROY_NOTIFICATION,
  id: areaID,
  notification,
});
