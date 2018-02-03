import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ForgotPasswordForm from '../ForgotPasswordForm';


describe('ForgotPasswordForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <ForgotPasswordForm {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
