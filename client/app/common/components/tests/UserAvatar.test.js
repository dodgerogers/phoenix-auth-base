import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import UserAvatar from '../UserAvatar';


describe('UserAvatar', () => {
  const fullProps = () => ({
    user: fromJS({
      name: "bob",
    }),
  });

  const pureComponent = (props) => shallow(<UserAvatar {...props} />);

  it('matches snapshot', () => {
    const component = pureComponent(fullProps());

    expect(toJson(component)).toMatchSnapshot();
  });
});
