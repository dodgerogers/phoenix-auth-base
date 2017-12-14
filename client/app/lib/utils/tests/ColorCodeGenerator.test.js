import { range } from 'lodash';
import ColorCodeGenerator from '../ColorCodeGenerator';


describe('ColorCodeGenerator', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('call', () => {
    it('returns a color code when passed a letter character', () => {
      const validAsciiCodes = range(65, 90).concat(range(97, 122));

      validAsciiCodes.map(ascii => {
        const char = String.fromCharCode(ascii);
        const code = ColorCodeGenerator.call(char);
        expect(code).not.toEqual(null);
      });
    });

    it('returns null when passed a non letter character', () => {
      const invalidAsciiCodes = range(0, 64).concat(range(91, 96)).concat(range(123, 127));

      invalidAsciiCodes.map(ascii => {
        const char = String.fromCharCode(ascii);
        const code = ColorCodeGenerator.call(char);
        expect(code).toEqual(null);
      });
    });

    it('different cases of a letter character produce the same color code', () => {
      const code1 = ColorCodeGenerator.call('A');
      const code2 = ColorCodeGenerator.call('a');

      expect(code2).toEqual(code1);
    });

    it('when there are only 3 color codes available, `A` should produce the same result as `D` and `G`', () => {
      const mockColorCodes = {
        color1: '#123',
        color2: '#456',
        color3: '#789',
      };

      jest.mock('../../../common/constants/uiConstants', () => ({ colors: mockColorCodes }));
      const { colors } = require('../../../common/constants/uiConstants');
      const colorCodeSelector = require('../ColorCodeGenerator');

      const code1 = colorCodeSelector.call('a');
      const code2 = colorCodeSelector.call('d');
      const code3 = colorCodeSelector.call('g');

      expect(code1).toEqual(mockColorCodes.color1);
      expect(code2).toEqual(code1);
      expect(code3).toEqual(code1);
    });
  });
});
