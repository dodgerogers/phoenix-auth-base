import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ResendConfirmationForm from '../ResendConfirmationForm';


describe('ResendConfirmationForm', () => {
  const fullProps = {};

  const pureComponent = (props) => shallow(
    <ResendConfirmationForm {...props} />
  );

  it('matches component snapshot', () => {
    const wrapper = pureComponent(fullProps);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
