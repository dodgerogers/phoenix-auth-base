import React from 'react'
import { Loader, Segment } from 'semantic-ui-react';

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
    console.log(props.error);
    return errorScreen('We\'re sorry we can\'t load the page');
  } else if (props.timedOut) {
    console.log('Timed out');
    return errorScreen('Refresh the page');
  } else if (props.pastDelay) {
    console.log('Took too long');
    return <Loader active />;
  } else {
    return null;
  }
}

export default LoadingScreen;
