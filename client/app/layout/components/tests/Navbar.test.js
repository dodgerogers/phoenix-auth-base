import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import Navbar, { PureComponent } from '../Navbar';


describe('Navbar', () => {
  const pureComponent = (props) => shallow(
    <PureComponent {...props} />
  );

  it('matches pure component snapshot', () => {
    const wrapper = pureComponent({});

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('matches pure component when currentUser is present snapshot', () => {
    const props = { currentUser: fromJS({ name: 'name' }) };
    const wrapper = pureComponent(props);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
