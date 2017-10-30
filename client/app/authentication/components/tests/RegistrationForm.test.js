import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationForm from '../RegistrationForm';


describe('RegistrationForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <RegistrationForm {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
