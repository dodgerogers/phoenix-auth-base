import HTTP, { API_BASE } from '../lib/utils/HTTP';

export const login = ({ email, password }) => {
  return HTTP.post(`${API_BASE}/api/oauth/token`, { grant_type: 'password', username: email, password });
};

export const signOut = () => {
  return HTTP.delete(`${API_BASE}/api/oauth/token`);
};

export const register = ({ name, email, password, passwordConfirmation }) => {
  return HTTP.post(`${API_BASE}/api/registrations`, { registration: { name, email, password, passwordConfirmation } });
};

export const confirm = ({ confirmationToken, email, password }) => {
  return HTTP.put(`${API_BASE}/api/confirmations`, { confirmation: { confirmationToken, email, password } });
};

export const resendConfirmation = ({ email }) => {
  return HTTP.post(`${API_BASE}/api/confirmations`, { confirmation: { email } });
};

export const passwordResetRequest = ({ email }) => {
  return HTTP.post(`${API_BASE}/api/passwords`, { email });
};

export const resetPassword = ({ email, resetPasswordToken, password, passwordConfirmation }) => {
  return HTTP.put(`${API_BASE}/api/passwords`, { email, resetPasswordToken, password, passwordConfirmation });
};

export const currentUser = () => {
  return HTTP.get(`${API_BASE}/api/users/me`);
};
