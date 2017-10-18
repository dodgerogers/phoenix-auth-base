export const reduxOauthConfig = {
  backend: {
    apiUrl: window.location.href,
    signOutPath:  null, // TODO
    cleanSession: false,
    clientOnly: true,
    tokenValidationPath: 'api/validate_token',
    authProviderPaths: {
      facebook: 'auth/facebook',
      google: 'auth/google_oauth2',
    },
  },
  cookies: document.cookie,
  currentLocation: document.URL
};
