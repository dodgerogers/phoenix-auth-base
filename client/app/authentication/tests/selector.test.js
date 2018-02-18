import * as Selectors from '../selector';
import { fromJS } from 'immutable';


describe('Selector', () => {
  const tokenValue = 'token';
  const accessToken = fromJS({ accessToken: tokenValue });

  describe('currentAccessToken', () => {
    it('returns immutable map', () => {
      const state = { authentication: fromJS({ accessToken })};
      expect(Selectors.currentAccessToken(state)).toEqual(accessToken);
    });
  });

  describe('currentAccessTokenValue', () => {
    it('returns string when present', () => {
      const state = { authentication: fromJS({ accessToken })};
      expect(Selectors.currentAccessTokenValue(state)).toEqual(tokenValue);
    });

    it('returns null when accessToken is not present', () => {
      const state = { authentication: fromJS({})};
      expect(Selectors.currentAccessTokenValue(state)).toEqual(null);
    });
  });

  describe('currentUser', () => {
    it('returns immutable map', () => {
      const currentUser = fromJS({ id: 1, email: 'email@email.com' });
      const state = { authentication: fromJS({ currentUser })};
      expect(Selectors.currentUser(state)).toEqual(currentUser);
    });
  });
});
