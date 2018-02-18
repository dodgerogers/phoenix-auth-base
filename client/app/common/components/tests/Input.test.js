import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import Input from '../Input';


describe('Input', () => {
  const fullProps = (opts = {}) => ({
    input: {
      name: opts.name || "input-name",
    },
    meta: {
      touched: opts.touched || false,
      error: opts.error || null,
    },
  });

  const pureComponent = (props) => mount(<Input {...props} />);

  it('matches snapshot', () => {
    const component = pureComponent(fullProps());

    expect(toJson(component)).toMatchSnapshot();
  });

  it('matches snapshot when errors are present', () => {
    const props = fullProps({error: 'Something went wrong', touched: true});
    const component = pureComponent(props);

    expect(toJson(component)).toMatchSnapshot('error-snapshot');
  });

  it('matches snapshot when errors are an array', () => {
    const props = fullProps({error: ['Something went wrong'], touched: true});
    const component = pureComponent(props);

    expect(toJson(component)).toMatchSnapshot('error-snapshot');
  });

  it('matches snapshot when errors are an Immutable List', () => {
    const props = fullProps({error: fromJS(['Something went wrong']), touched: true});
    const component = pureComponent(props);

    expect(toJson(component)).toMatchSnapshot('error-snapshot');
  });
});
