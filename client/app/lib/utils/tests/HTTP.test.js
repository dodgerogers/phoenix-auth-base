import { fromJS } from 'immutable';
import normalize from 'normalize-object';
import HTTP from '../HTTP';
import store from '../../../store';

describe('HTTP', () => {
  const config = () => ({
    headers: {
      common: {},
    },
    data: {
      dataPayload: {
        dataKey: 'data',
        arrayKey: [
          { nestedKey: 'key' },
        ],
      },
    },
  });

  const error = () => ({
    response: {
      statusText: 'BadRequest',
      status: 400,
      data: {
        error: {
          data_key: 'Page not found',
          array_key: [
            { data_key: 'data' },
          ],
        },
      },
    },
  });

  describe('request', () => {
    it('transforms request keys to snake case', () => {
      const initialState = {
        authentication: fromJS({
          accessToken: null,
          isTokenRefreshing: false,
        })
      };

      store.getState = jest.fn(() => initialState);

      const interceptor = HTTP.interceptors.request.handlers[0];

      return interceptor.fulfilled(config()).then(result => {
        expect(result).toMatchSnapshot();
      });
    });

    it('adds authorization header when accessToken is present', () => {
      const initialState = {
        authentication: fromJS({
          accessToken: {
            accessToken: 'token',
          },
          isTokenRefreshing: false,
        })
      };

      store.getState = jest.fn(() => initialState);

      const interceptor = HTTP.interceptors.request.handlers[0];

      return interceptor.fulfilled(config()).then(result => {
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('response', () => {
    it('transforms response', () => {
      const interceptor = HTTP.interceptors.response.handlers[0];

      expect(interceptor.fulfilled(config())).toMatchSnapshot();
    });

    it('transforms response error', () => {
      const interceptor = HTTP.interceptors.response.handlers[0];

      expect(interceptor.rejected(error())).rejects.toMatchSnapshot();
    });
  });
});
