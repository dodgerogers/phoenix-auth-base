import React from 'react';
import { mount, shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Button } from 'semantic-ui-react';
import { FunctionalComponent } from '../LoginModalContainer';
import { ModalIds } from '../../../common/modals';


describe('LoginModalContainer', () => {
  describe('FunctionalComponent', () => {
    const fullProps = () => ({
      isSignedIn: false,
      close: jest.fn(),
    });

    const functionalComponent = (props) => shallow(
      <FunctionalComponent {...props} />, { lifecycleExperimental: true }
    );

    it('calls hideModal if the user is logged in', () => {
      const props = fullProps();
      const component = functionalComponent(props);

      component.setProps({ isSignedIn: true });

      expect(props.close).toHaveBeenCalledWith(ModalIds.loginModal);
    });

    it('does not call hideModal if the user is not logged in', () => {
      const props = fullProps();
      const component = functionalComponent(props);

      component.setProps({ isSignedIn: false });

      expect(props.close).not.toHaveBeenCalled();
    });
  });
});
