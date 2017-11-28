import { actionTypes } from './constants';


export const notify = (message, id) => ({
  type: actionTypes.NOTIFY,
  id,
  notification: {
    message,
    level: 'success',
  },
});

export const destroy = (notification, id) => ({
  type: actionTypes.DESTROY,
  id,
  notification,
});
