import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationFormModal from '../RegistrationFormModal';


describe('RegistrationForm', () => {
  const fullProps = {
    show: true,
    close: jest.fn(),
    onSubmit: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <RegistrationFormModal {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
