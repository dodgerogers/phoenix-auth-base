import HTTP from '../lib/utils/HTTP';

export const currentUser = () => {
  return HTTP.get('/api/current_user');
};

export const currentUserProfiles = () => {
  return HTTP.get('/api/current_user/profiles');
};
