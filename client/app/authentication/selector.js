// Reselect

export const currentAccessToken = state => state.authentication.get('accessToken');
export const currentAccessTokenValue = state => state.authentication.getIn(['accessToken', 'accessToken'], null);
export const isTokenRefreshing = state => state.authentication.get('refreshing');
export const currentUser = state => state.authentication.get('currentUser');
