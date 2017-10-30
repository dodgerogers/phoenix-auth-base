import { fetch, parseResponse } from 'redux-auth';

const AuthenticationSources = {
  register: (user) => {
    return fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    }).then(parseResponse);
  },
};
