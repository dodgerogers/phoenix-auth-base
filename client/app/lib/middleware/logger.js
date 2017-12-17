const logger = ({ getState }) => {
  return next => action => {

    const isDevBuild = process.env.NODE_ENV !== 'production';
    if (isDevBuild) {
      console.log('will dispatch', action);
    }

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
};

export default logger;
