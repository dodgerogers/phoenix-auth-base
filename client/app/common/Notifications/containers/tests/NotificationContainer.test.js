import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../reducer';
import { areaIDs } from '../../constants';
import NotificationContainer from '../NotificationContainer';

const mockStore = configureStore([thunk]);

describe('NotificationContainer', () => {
  const fullProps = () => ({
    id: areaIDs.APPLICATION,
  });

  describe('connected component', () => {
    const connectedComponent = (store, props) => mount(
      <Provider store={store}>
        <NotificationContainer {...props} />
      </Provider>
    );

    it('matches snapshot', () => {
      const store = mockStore({ notifications: initialState });
      const props = fullProps();
      const component = connectedComponent(store, props);

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
