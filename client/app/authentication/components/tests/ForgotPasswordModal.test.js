import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ForgotPasswordModal from '../ForgotPasswordModal';


describe('ForgotPasswordModal', () => {
  const fullProps = {
    close: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <ForgotPasswordModal {...props} />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
