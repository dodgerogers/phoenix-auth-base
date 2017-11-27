import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import NotificationList from '../NotificationList';


describe('NotificationList', () => {
  describe('PureComponent', () => {
    const fullProps = () => ({
      id: 'areaID',
      destroy: jest.fn(),
      notifications: fromJS([
        fromJS({
          message: 'Information',
        }),
      ]),
    });

    const pureComponent = (props) => shallow(
      <NotificationList {...props} />
    );

    it('matches snapshot when no notifications present', () => {
      const props = fullProps();
      props.notifications = fromJS([]);
      const component = pureComponent(props);

      expect(toJson(component)).toMatchSnapshot();
    });

    it('matches snapshot with at least one notification', () => {
      const props = fullProps();
      const component = pureComponent(fullProps());

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
