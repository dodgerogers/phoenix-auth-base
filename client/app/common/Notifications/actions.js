import { actionTypes } from './constants';


export const notifySuccess = (id, message) => ({
  type: actionTypes.NOTIFY_SUCCESS,
  id,
  notification: {
    message,
    level: 'success',
  },
});

export const destroy = (id, index) => ({
  type: actionTypes.DESTROY,
  id,
  index,
});
