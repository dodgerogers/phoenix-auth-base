export default function formatErrors(error) {
  if (typeof(error) === 'object') {
    return error;
  }
  return { _error: error };
};
