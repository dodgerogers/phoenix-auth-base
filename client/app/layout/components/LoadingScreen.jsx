import React from 'react'
import { Loader } from 'semantic-ui-react';

import 'semantic-ui-css/components/loader.css';


const LoadingScreen = (props) => {
  if (props.error) {
    return <div>Could not load the page, please try again</div>;
  } else if (props.timedOut) {
    return <div>Refresh the page</div>;
  } else if (props.pastDelay) {
    return <Loader active />;
  } else {
    return null;
  }
}

export default LoadingScreen;
