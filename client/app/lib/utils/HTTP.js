import axios from 'axios';

export const API_BASE = 'http://localhost:4000'; // TODO window.location.origin

const HTTP = axios.create({
  baseURL: API_BASE,
  // headers: { Authorization: ${store.getState().currentUser.accessToken},
});


// HTTP.interceptors.response.use(
//   response => response,
//   (error) => {
//     const { response } = error;
//
//     if (response && response.status === 401) {
//       // Fire logout to clear the token and remove current user object in case it exists
//       store.dispatch(logoutUserSuccess);
//       store.dispatch(createFailureNotification('Please login or register first', 'Not Allowed!'));
//       browserHistory.push('/login');
//     } else if (response && response.status === 500) {
//       store.dispatch(createFailureNotification('Internal server error', 'Something went wrong'));
//     }
//     return Promise.reject(error);
//   },
// );

export default HTTP;
