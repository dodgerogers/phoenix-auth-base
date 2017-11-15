import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PureComponent } from '../RegistrationForm';


describe('RegistrationForm', () => {
  const fullProps = {
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <PureComponent {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
