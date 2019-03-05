import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AccountActions from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AccountActions', () => {
  describe('getCurrentUser', () => {
    it('getCurrentUserRequest matches snapshot', () => {
      expect(AccountActions.getCurrentUserRequest()).toMatchSnapshot();
    });

    it('getCurrentUserSuccess matches snapshot', () => {
      expect(AccountActions.getCurrentUserSuccess()).toMatchSnapshot();
    });

    it('getCurrentUserFailure matches snapshot', () => {
      expect(AccountActions.getCurrentUserFailure()).toMatchSnapshot();
    });
  });

  describe('getCurrentUserProfiles', () => {
    it('getCurrentUserProfilesRequest matches snapshot', () => {
      expect(AccountActions.getCurrentUserProfilesRequest()).toMatchSnapshot();
    });

    it('getCurrentUserProfilesSuccess matches snapshot', () => {
      expect(AccountActions.getCurrentUserProfilesSuccess([{id: 1}])).toMatchSnapshot();
    });

    it('getCurrentUserProfilesFailure matches snapshot', () => {
      expect(AccountActions.getCurrentUserProfilesFailure()).toMatchSnapshot();
    });
  });
});
