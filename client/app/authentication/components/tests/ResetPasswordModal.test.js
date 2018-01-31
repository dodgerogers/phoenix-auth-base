import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ResetPasswordModal from '../ResetPasswordModal';


describe('ResetPasswordModal', () => {
  const fullProps = {
    close: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <ResetPasswordModal {...props} />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
