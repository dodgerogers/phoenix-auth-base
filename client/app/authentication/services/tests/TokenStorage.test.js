import * as TokenStorage from '../TokenStorage';
import moment from 'moment';


describe('TokenStorage', () => {
  const token = () => ({
    accessToken: 'a1b2c3d4e5f6',
    expiresIn: 900,
    createdAt: '2000-12-12T00:01:01',
  });

  const encodedToken = 'eyJhY2Nlc3NUb2tlbiI6ImExYjJjM2Q0ZTVmNiIsImV4cGlyZXNJbiI6OTAwLCJjcmVhdGVkQXQiOiIyMDAwLTEyLTEyVDAwOjAxOjAxIn0=';

  describe('COOKIE_KEY', () => {
    it('matches snapshot', () => {
      expect(TokenStorage.COOKIE_KEY).toMatchSnapshot();
    });
  });

  describe('encode', () => {
    it('encodes token object into expected base64 string', () => {
      expect(TokenStorage.encode(token())).toEqual(encodedToken);
    });
  });

  describe('decode', () => {
    it('decodes previously encoded token successfully', () => {
      expect(TokenStorage.decode(encodedToken)).toEqual(token());
    });

    it('returns null when encoded token is not valid base64', () => {
      expect(TokenStorage.decode('invalid')).toEqual(null);
    });
  });

  describe('generateExpiry', () => {
    it('constructs date from the created_at and expires_in properties', () => {
      expect(TokenStorage.generateExpiry(token())).toMatchSnapshot();
    });
  });

  describe('store', () => {
    it('should resolve truthy when able to set token', () => {
      window.localStorage.setItem = jest.fn(() => null);

      return TokenStorage.store(token())
        .then(result => {
          expect(window.localStorage.setItem.mock.calls).toMatchSnapshot();
        });
    });

    it('should resolve falsey when not able to set token', () => {
      window.localStorage.setItem = jest.fn(() => null);

      return TokenStorage.store(token())
        .catch(result => {
          expect(window.localStorage.setItem.mock.calls).toMatchSnapshot();
          expect(result).toEqual(null);
        });
    });
  });

  describe('fetch', () => {
    it('should resolve with the decoded token when storage.getItem is successful', () => {
      window.localStorage.getItem = jest.fn(() => encodedToken);

      return TokenStorage.fetch()
        .then(result => {
          expect(result).toEqual(token());
        });
    });

    it('should reject with null when storage.getItem fails', () => {
      window.localStorage.getItem = jest.fn(() => null);

      return TokenStorage.fetch()
        .catch(result => {
          expect(result).toEqual(null);
        });
    });
  });

  describe('remove', () => {
    it('should resolve promise with null when storage.remove is successful', () => {
      window.localStorage.removeItem = jest.fn(() => null);

      return TokenStorage.remove()
        .then(result => {
          expect(window.localStorage.removeItem.mock.calls).toMatchSnapshot();
          expect(result).toEqual(null);
        });
    });

    it('should reject promise with null when storage.remove fails', () => {
      const error = 'Something went wrong';
      window.localStorage.removeItem = jest.fn(() => {
        throw(error);
      });

      return TokenStorage.remove()
        .catch(result => {
          expect(window.localStorage.removeItem.mock.calls).toMatchSnapshot();
          expect(result).toEqual(error);
        });
    });
  });
});
