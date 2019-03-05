import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import AccountProfileAvatar from '../AccountProfileAvatar';


describe('AccountProfileAvatar', () => {
  const fullProps = () => ({
    profile: fromJS({
      name: "bob",
    }),
  });

  const pureComponent = (props) => shallow(<AccountProfileAvatar {...props} />);

  it('matches snapshot', () => {
    const component = pureComponent(fullProps());

    expect(toJson(component)).toMatchSnapshot();
  });
});
