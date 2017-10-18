import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginModal from '../LoginModal';


describe('LoginModal', () => {
  const fullProps = {
    close: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <LoginModal {...props} />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
