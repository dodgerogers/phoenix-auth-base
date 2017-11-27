import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthenticationLinks from '../AuthenticationLinks';


describe('AuthenticationLinks', () => {
  const fullProps = {
    close: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <AuthenticationLinks />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
