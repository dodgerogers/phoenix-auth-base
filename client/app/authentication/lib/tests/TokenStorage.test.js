import Cookies from 'js-cookie';
import * as TokenStorage from '../TokenStorage';

describe('Token', () => {
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
    it('should resolve truthy when able to set cookie', () => {
      const cookie = 'token cookie';
      Cookies.set = jest.fn(() => cookie);

      return TokenStorage.store(token())
        .then(result => {
          expect(Cookies.set.mock.calls).toMatchSnapshot();
          expect(result).toEqual(cookie);
        });
    });

    it('should resolve falsey when not able to set cookie', () => {
      Cookies.set = jest.fn(() => null);

      return TokenStorage.store(token())
        .catch(result => {
          expect(Cookies.set.mock.calls).toMatchSnapshot();
          expect(result).toEqual(null);
        });
    });
  });

  describe('fetch', () => {
    it('should resolve with the decoded token when Cookies.get is successful', () => {
      Cookies.get = jest.fn(() => encodedToken);

      return TokenStorage.fetch()
        .then(result => {
          expect(result).toEqual(token());
        });
    });

    it('should reject with false when Cookies.get fails', () => {
      Cookies.get = jest.fn(() => null);

      return TokenStorage.fetch()
        .catch(result => {
          expect(result).toEqual(null);
        });
    });
  });

  describe('remove', () => {
    it('should resolve promise with null when Cookies.remove is successful', () => {
      Cookies.remove = jest.fn(() => null);

      return TokenStorage.remove()
        .then(result => {
          expect(Cookies.remove.mock.calls).toMatchSnapshot();
          expect(result).toEqual(null);
        });
    });

    it('should reject promise with null when Cookies.remove fails', () => {
      const error = 'Something went wrong';
      Cookies.remove = jest.fn(() => {
        throw(error);
      });

      return TokenStorage.remove()
        .catch(result => {
          expect(Cookies.remove.mock.calls).toMatchSnapshot();
          expect(result).toEqual(error);
        });
    });
  });
});
