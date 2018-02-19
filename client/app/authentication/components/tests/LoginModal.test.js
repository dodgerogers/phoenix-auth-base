import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignInModal from '../SignInModal';


describe('SignInModal', () => {
  const fullProps = {
    close: jest.fn(),
  };

  const pureComponent = (props) => shallow(
    <SignInModal {...props} />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
