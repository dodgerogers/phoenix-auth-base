import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import BaseLayout, { PureComponent, FunctionalComponent } from '../BaseLayout';


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

  describe('functionalComponent', () => {
    const functionalComponent = (props) => shallow(
      <FunctionalComponent {...props}>
        <div>content</div>
      </FunctionalComponent>, { lifecycleExperimental: true }
    );

    it('calls authenticate on mount', () => {
      const props = {
        authenticate: jest.fn(),
      };

      const wrapper = functionalComponent(props);

      expect(props.authenticate).toHaveBeenCalled();
    });
  });
});
