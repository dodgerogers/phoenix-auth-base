import React from 'react';
import { mount, shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Button } from 'semantic-ui-react';
import OAuthSignInButton, { PureComponent } from '../OAuthSignInButton';

const mockStore = configureStore([thunk]);

describe('OmniautSiginButton', () => {
  const provider = "facebook";
  const fullProps = {
    oAuthSignIn: jest.fn(),
    provider
  };
  const initialState = (isSignedIn = false, oAuthSignIn = false) => ({
    auth: fromJS({
      user: {
        isSignedIn: isSignedIn,
      },
      oAuthSignIn: {
        facebook: {
          loading: oAuthSignIn,
        }
      }
    }),
  });

  const wrapper = (props, store) => mount(
    <Provider store={store}>
      <OAuthSignInButton provider={provider}>
        Sign in
      </OAuthSignInButton>
    </Provider>
  );

  const matchesSnapshotBasedOnProps = (initialState) => {
    const store = mockStore(initialState);
    const component = wrapper(fullProps, store);

    expect(toJson(component)).toMatchSnapshot();
  }

  it('matches snapshot when is neither disabled nor loading', () => {
    matchesSnapshotBasedOnProps(initialState());
  });

  it('matches snapshot when is disabled', () => {
    matchesSnapshotBasedOnProps(initialState(true, false));
  });

  it('matches snapshot when is loading', () => {
    matchesSnapshotBasedOnProps(initialState(false, true));
  });

  it('onClick', () => {
    const store = mockStore(initialState());
    const component = shallow(<PureComponent {...fullProps} />);

    component.find(Button).simulate('click');

    expect(fullProps.oAuthSignIn).toHaveBeenCalledWith({ provider });
  });
});
