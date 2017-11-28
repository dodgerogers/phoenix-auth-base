import { actionTypes } from './constants';


export const notify = (message, areaID) => ({
  type: actionTypes.NOTIFY,
  id: areaID,
  notification: {
    level: 'success',
    message,
  },
});

export const destroy = (notification, areaID) => ({
  type: actionTypes.DESTROY,
  id: areaID,
  notification,
});
