import { fetch, parseResponse } from 'redux-auth';

const AuthenticationSources = {
  register: (user) => {
    return fetch('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    }).then(parseResponse);
  },
};
