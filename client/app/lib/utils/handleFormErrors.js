import { SubmissionError } from 'redux-form/immutable';


export function formatErrors(error) {
  if (typeof(error) === 'object') {
    return error;
  }
  return { _error: error };
};

export default function handleFormErrors(error) {
  throw new SubmissionError(formatErrors(error));
}
