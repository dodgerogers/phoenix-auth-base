import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import { PureComponent, FunctionalComponent } from '../BaseLayout';


describe('BaseLayout', () => {
  describe('PureComponent', () => {
    const pureComponent = (props) => shallow(
      <PureComponent {...props}>
        <div>content</div>
      </PureComponent>
    );

    it('matches snapshot', () => {
      const wrapper = pureComponent({});

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('FunctionalComponent', () => {
    const mockInitialize = jest.fn(() => true);
    const functionalComponent = (props) => shallow(
      <FunctionalComponent {...props} />, { lifecycleExperimental: true }
    );

    it('calls initialize when on componentWillMount', () => {
      const wrapper = functionalComponent({ initialize: mockInitialize });

      expect(mockInitialize).toHaveBeenCalled();
    });
  })
});
