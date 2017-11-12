import HTTP, { API_BASE } from '../lib/utils/HTTP';

export const login = ({ email, password }) => {
  return HTTP.post(`${API_BASE}/api/sessions`, { session: { email, password } });
};

// export const register = (user) => {
//   return fetch('api/registrations', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ registration: { user } }),
//   }).then(parseResponse);
// }
