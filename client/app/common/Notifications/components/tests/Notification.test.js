import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
// import { Button, Menu } from 'semantic-ui-react';
import Notification from '../Notification';


describe('Notification', () => {
  describe('PureComponent', () => {
    const fullProps = () => ({
      notification: fromJS({
        message: 'Information',
        level: null,
      }),
    });

    const pureComponent = (props) => shallow(
      <Notification {...props} />
    );

    it('matches snapshot with no level given', () => {
      const component = pureComponent(fullProps());

      expect(toJson(component)).toMatchSnapshot();
    });

    it('matches snapshot with success level given', () => {
      const props = fullProps();
      props.notification = props.notification.set('level', 'success');
      const component = pureComponent(props);

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
