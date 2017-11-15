import HTTP, { API_BASE } from '../lib/utils/HTTP';

export const login = ({ email, password }) => {
  return HTTP.post(`${API_BASE}/api/sessions`, { session: { email, password } });
};

export const register = ({ name, email, password, password_confirmation }) => {
  return HTTP.post(`${API_BASE}/api/registrations`, { registration: { name, email, password, password_confirmation } });
};
