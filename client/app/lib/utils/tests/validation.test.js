import * as Validation from '../validation';


describe('validation', () => {
  const fieldName = 'field-name';
  const expectedFieldName = (name) => name.replace('-', ' ');

  describe('isRequired', () => {
    it('returns error string when value is a invalid value', () => {
      const invalidInputs = ['', undefined, null];

      invalidInputs.map(invalidInput => {
        const err = Validation.isRequired(null, null, {}, fieldName);

        expect(err).toEqual(`${expectedFieldName(fieldName)} is required`);
      });
    });

    it('returns undefined when value is a valid value', () => {
      const err = Validation.isRequired('value');

      expect(err).toEqual(undefined);
    });
  });

  describe('minLength', () => {
    const createStrWithLength = length => 'a'.repeat(length);
    const strLength = 3;

    it('returns error string when value is less than given length', () => {
      const invalidString = createStrWithLength(strLength - 1);
      const err = Validation.minLength(strLength)(invalidString, null, {}, fieldName);

      expect(err).toEqual(`${expectedFieldName(fieldName)} is too short. ${strLength} minimum`);
    });

    it('returns undefined when value is a valid value', () => {
      const invalidString = createStrWithLength(strLength);
      const err = Validation.minLength(strLength)(invalidString, null, {}, fieldName);

      expect(err).toEqual(undefined);
    });
  });

  describe('isEmail', () => {
    it('returns error string when value is not a valid email', () => {
      const invalidEmail = 'something.somewhere@anywhere';
      const err = Validation.isEmail(invalidEmail, null, {}, fieldName);

      expect(err).toEqual(`${expectedFieldName(fieldName)} is not valid`);
    });

    it('returns undefined when value is a valid email', () => {
      const validEmail = 'something.somewhere@anywhere.com';
      const err = Validation.isEmail(validEmail, null, {}, fieldName);

      expect(err).toEqual(undefined);
    });
  });
});
