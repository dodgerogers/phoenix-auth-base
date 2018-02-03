import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ResetPasswordForm from '../ResetPasswordForm';


describe('ResetPasswordForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <ResetPasswordForm {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
