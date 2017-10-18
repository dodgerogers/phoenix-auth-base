import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import { Button } from 'semantic-ui-react';
import { PureComponent } from '../LoginButtonContainer';
import { modalIds } from '../../../common/modals/modalConstants';


describe('LoginButtonContainer', () => {
  describe('PureComponent', () => {
    const fullProps = {
      showModal: jest.fn(),
    };

    const pureComponent = (props) => shallow(
      <PureComponent {...props} />, { lifecycleExperimental: true }
    );

    it('onClick calls showModal with loginModal ID', () => {
      const component = pureComponent(fullProps);

      component.find(Button).simulate('click');

      expect(fullProps.showModal).toHaveBeenCalledWith(modalIds.loginModal);
    });
  });
});
