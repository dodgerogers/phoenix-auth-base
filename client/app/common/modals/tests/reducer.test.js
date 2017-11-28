import { fromJS } from 'immutable';
import { areaIDs, actionTypes } from '../constants';
import modalsReducer, { initialState } from '../reducer';


describe('modalsReducer', () => {
  describe('SHOW_MODAL', () => {
    it('toggles modal with ID 1 to true', () => {
      const show = {
        type: actionTypes.SHOW_MODAL,
        data: { id: 1 },
      };

      expect(modalsReducer(initialState, show)).toMatchSnapshot();
    });
  });

  describe('HIDE_MODAL', () => {
    it('toggles modal with ID 1 to false', () => {
      const hide = {
        type: actionTypes.HIDE_MODAL,
        data: { id: 1 },
      };

      expect(modalsReducer(initialState, hide)).toMatchSnapshot();
    });
  });
});
