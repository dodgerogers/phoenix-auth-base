import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import { Button, Menu } from 'semantic-ui-react';
import ModalTrigger, { PureComponent } from '../ModalTrigger';


describe('ModalTrigger', () => {
  describe('PureComponent', () => {
    const fullProps = () => ({
      showModal: jest.fn(),
      text: 'Open my modal',
      id: 'my-modal-id',
    });

    const pureComponent = (props) => shallow(
      <PureComponent {...props} />, { lifecycleExperimental: true }
    );

    it('matches snapshot', () => {
      const component = pureComponent(fullProps());

      expect(toJson(component)).toMatchSnapshot();
    });

    it('matches snapshot with custom wrapping component', () => {
      const props = fullProps();
      props.wrapper = Menu.Item;
      const component = pureComponent(props);

      expect(toJson(component)).toMatchSnapshot();
    });

    it('onClick calls showModal with given ID', () => {
      const props = fullProps();
      const component = pureComponent(props);

      component.find(Button).simulate('click');

      expect(props.showModal).toHaveBeenCalledWith(props.id);
    });
  });
});
