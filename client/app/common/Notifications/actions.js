import { actionTypes } from './constants';


export const notify = (message, areaID) => createNotification(message, areaID, 'success');
export const notifyError = (message, areaID) => createNotification(message, areaID, 'negative');

const createNotification = (message, areaID, level) => ({
  id: areaID,
  type: actionTypes.CREATE_NOTIFICATION,
  notification: {
    level,
    message,
  },
})

export const destroy = (notification, areaID) => ({
  id: areaID,
  type: actionTypes.DESTROY_NOTIFICATION,
  notification,
});
