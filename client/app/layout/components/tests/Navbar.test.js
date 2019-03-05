import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import Navbar from '../Navbar';


describe('Navbar', () => {
  const fullProps = () => ({
    signOut: jest.fn(),
  });

  const component = (props) => shallow(
    <Navbar {...props} />
  );

  it('matches pure component snapshot', () => {
    const wrapper = component(fullProps());

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('matches pure component when currentUser is present snapshot', () => {
    const accountProps = {
      currentUser: fromJS({ name: 'Billy' }),
      currentProfile: fromJS({ name: 'name' })
    };
    const props = Object.assign({}, fullProps(), accountProps);
    const wrapper = component(props);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
