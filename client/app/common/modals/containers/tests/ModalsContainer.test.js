import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ModalsContainer, { PureComponent } from '../ModalsContainer';
import { initialState } from '../../reducer';


describe('ModalsContainer', () => {
  const fullProps = () => ({
    modals: initialState,
  });

  describe('PureComponent', () => {
    const connectedComponent = (props) => shallow(
      <PureComponent {...props} />
    );

    it('matches snapshot', () => {
      const props = fullProps();
      const component = connectedComponent(props);

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
