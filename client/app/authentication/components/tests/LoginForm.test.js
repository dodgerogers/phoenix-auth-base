import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginForm from '../LoginForm';


describe('LoginForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <LoginForm {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
