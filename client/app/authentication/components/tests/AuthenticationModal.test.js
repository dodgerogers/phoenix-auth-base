import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthenticationModal from '../AuthenticationModal';


describe('AuthenticationModal', () => {
  const fullProps = {
    close: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <AuthenticationModal {...props} title="Auth modal" />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
