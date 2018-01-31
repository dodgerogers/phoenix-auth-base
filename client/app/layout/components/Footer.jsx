import React from 'react';
import { Segment, Container, Grid, Header, List, Divider } from 'semantic-ui-react';

const Footer = (props) => (
  <footer
    style={{
      borderTop: '1px solid rgba(34,36,38,.15)',
      borderBottom: '1px solid rgba(255,255,255,.1)',
    }
  }>
    <Segment
      vertical
      style={{ padding: '3em 0em' }}
    >
      <Container textAlign='center'>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as='h4' content='Group 1' />
              <List link>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h4' content='Group 2' />
              <List link>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h4' content='Group 3' />
              <List link>
                <List.Item as='a'>Link One</List.Item>
                <List.Item as='a'>Link Two</List.Item>
                <List.Item as='a'>Link Three</List.Item>
                <List.Item as='a'>Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h4' content='Footer Header' />
              <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider section />
        <List horizontal divided link>
          <List.Item as='a' href='#'>Site Map</List.Item>
          <List.Item as='a' href='#'>Contact Us</List.Item>
          <List.Item as='a' href='#'>Terms and Conditions</List.Item>
          <List.Item as='a' href='#'>Privacy Policy</List.Item>
        </List>
      </Container>
    </Segment>
  </footer>
);

export default Footer;
