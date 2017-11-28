import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import Notification, { FunctionalComponent, PureComponent } from '../Notification';


describe('Notification', () => {
  const fullProps = () => ({
    onDestroy: jest.fn(),
    notification: fromJS({
      message: 'Information',
      level: null,
    }),
  });

  describe('FunctionalComponent', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    });

    const functionalComponent = (props) => shallow(
      <FunctionalComponent {...props} />, { lifecycleExperimental: true }
    );

    it('calls props.onDestroy on componentDidMount', () => {
      const props = fullProps();
      const component = functionalComponent(props);

      jest.runAllTimers();

      expect(props.onDestroy).toHaveBeenCalled();
    });
  });

  describe('PureComponent', () => {
    const pureComponent = (props) => shallow(
      <PureComponent {...props} />
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
