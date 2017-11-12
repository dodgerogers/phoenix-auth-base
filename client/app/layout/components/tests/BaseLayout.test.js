import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import BaseLayout from '../BaseLayout';


describe('BaseLayout', () => {
  describe('PureComponent', () => {
    const pureComponent = (props) => shallow(
      <BaseLayout {...props}>
        <div>content</div>
      </BaseLayout>
    );

    it('matches snapshot', () => {
      const wrapper = pureComponent({});

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
