import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PureComponent } from '../LoginForm';


describe('LoginForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <PureComponent {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
