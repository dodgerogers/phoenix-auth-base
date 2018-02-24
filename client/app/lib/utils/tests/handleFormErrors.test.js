import { formatErrors } from '../handleFormErrors';


describe('formatErrors', () => {
  it('returns object with _error key when error given is a string', () => {
    const error = 'error';
    expect(formatErrors(error)).toMatchObject({ _error: error });
  });

  it('returns the error object', () => {
    const error = { attribute: 'error' };

    expect(formatErrors(error)).toMatchObject(error);
  });
})
