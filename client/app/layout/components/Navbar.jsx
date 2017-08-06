import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Menu, Button, Header, Container } from 'semantic-ui-react';
import CurrentUser from '../../hocs/CurrentUser';
import LoginModal from '../../authentication/components/LoginModal';

const Navbar = (props) => {
  const loggedInLinks = () => (
    <Menu.Item>Logged in as {props.currentUser.get('name')}</Menu.Item>
  );

  const nonLoggedInLinks = () => (
    <Menu.Item>
      <LoginModal
        trigger={<Button color="teal">Login</Button>}
        {...props}
      />
    </Menu.Item>
  )

  return (
    <navbar>
      <Menu attached='top'>
        <Container>
          <Menu.Item>
            <Header>
              Teebox.io
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            {props.currentUser ? loggedInLinks() : nonLoggedInLinks()}
          </Menu.Menu>
        </Container>
      </Menu>
    </navbar>
  );
}

Navbar.propTypes = {
  currentUser: ImmutablePropTypes.map,
};

export { Navbar as PureComponent };
export default CurrentUser(Navbar);
