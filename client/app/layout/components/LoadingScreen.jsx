import React from 'react'
import { Loader, Segment } from 'semantic-ui-react';

import 'semantic-ui-css/components/loader.css';
import 'semantic-ui-css/components/segment.css';


const errorScreen = text => (
  <div
    style={{
      maxWidth: '300px',
      margin: '10% auto',
      textAlign: 'center',
      fontFamily: 'Lato',
    }}
  >
    <Segment color="red">
      {text}
    </Segment>
  </div>
)

const LoadingScreen = props => {
  if (props.error) {
    return errorScreen('We\'re sorry we can\'t load the page');
  } else if (props.timedOut) {
    return errorScreen('Refresh the page');
  } else if (props.pastDelay) {
    return <Loader active />;
  } else {
    return null;
  }
}

export default LoadingScreen;
