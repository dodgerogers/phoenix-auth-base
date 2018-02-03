import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from '../../reducer';
import ResetPasswordFormContainer, { Form } from '../ResetPasswordFormContainer';

const mockStore = configureStore([]);

describe('ResetPasswordFormContainer', () => {
  const fullProps = () => ({});

  describe('Form', () => {
    const connectedComponent = (props) => shallow(
      <Form {...props} />
    );

    it('matches snapshot', () => {
      const props = fullProps();
      const component = connectedComponent(props);

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe('connected component', () => {
    const connectedComponent = (store, props) => shallow(
      <Provider store={store}>
        <ResetPasswordFormContainer {...props} />
      </Provider>
    );

    it('matches snapshot', () => {
      const store = mockStore({});
      const props = fullProps();
      const component = connectedComponent(store, props);

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
