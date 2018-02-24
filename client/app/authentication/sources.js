import HTTP from '../lib/utils/HTTP';

export const login = ({ email, password }) => {
  return HTTP.post('/api/oauth/token', { grant_type: 'password', email, password });
};

export const signOut = () => {
  return HTTP.delete('/api/oauth/token');
};

export const register = ({ name, email, password, passwordConfirmation }) => {
  return HTTP.post('/api/registrations', { name, email, password, passwordConfirmation });
};

export const confirm = ({ confirmationToken, email, password }) => {
  return HTTP.put('/api/confirmations', { confirmationToken, email, password });
};

export const resendConfirmation = ({ email }) => {
  return HTTP.post('/api/confirmations', { email });
};

export const passwordResetRequest = ({ email }) => {
  return HTTP.post('/api/passwords', { email });
};

export const resetPassword = ({ email, resetPasswordToken, password, passwordConfirmation }) => {
  return HTTP.put('/api/passwords', { email, resetPasswordToken, password, passwordConfirmation });
};

export const currentUser = () => {
  return HTTP.get('/api/users/me');
};

export const extendSession = () => {
  return HTTP.post('/api/oauth/token/refresh');
};
