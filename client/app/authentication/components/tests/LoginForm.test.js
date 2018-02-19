import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignInForm from '../SignInForm';


describe('SignInForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <SignInForm {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
