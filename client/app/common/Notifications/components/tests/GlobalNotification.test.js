import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import GlobalNotifications from '../GlobalNotifications';


describe('GlobalNotification', () => {
  describe('PureComponent', () => {
    const fullProps = () => ({});

    const pureComponent = (props) => shallow(
      <GlobalNotifications {...props} />
    );

    it('matches snapshot', () => {
      const component = pureComponent(fullProps());

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
