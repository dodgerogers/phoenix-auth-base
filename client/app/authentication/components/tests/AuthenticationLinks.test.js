import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthenticationLinks, { links } from '../AuthenticationLinks';


describe('AuthenticationLinks', () => {
  const pureComponent = props => shallow(
    <AuthenticationLinks {...props} />
  );

  it('matches snapshot', () => {
    const wrapper = pureComponent({});

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with everything excluded', () => {
    const wrapper = pureComponent({ exclude: Object.keys(links) });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot with one link excluded', () => {
    const wrapper = pureComponent({ exclude: [links.LOGIN] });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
