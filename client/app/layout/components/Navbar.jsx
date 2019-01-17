import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Menu, Button, Header, Container, Dropdown, Image } from 'semantic-ui-react';
import { ModalIds, ModalTrigger } from '../../common/modals';
import UserAvatar from '../../common/components/UserAvatar';


const Navbar = (props) => {
  const loggedInLinks = () => {
    const trigger = (<UserAvatar user={props.currentUser} />)

    return (
      <Dropdown item trigger={trigger}>
        <Dropdown.Menu>
          <Dropdown.Header>My Account</Dropdown.Header>
          <Dropdown.Item>
            <a onClick={props.signOut}>Sign out</a>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }


  const nonLoggedInLinks = () => ([
    <ModalTrigger key="login" text="Login" id={ModalIds.SIGN_IN_MODAL} wrapper={Menu.Item} />,
    <ModalTrigger key="signup" text="Sign up" id={ModalIds.REGISTRATION_MODAL} wrapper={Menu.Item} />,
  ]);

  return (
    <div id="navbar">
      <Menu
        fixed="top"
        style={{
          boxShadow: 'none'
         }}
      >
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
    </div>
  );
}

Navbar.propTypes = {
  currentUser: ImmutablePropTypes.map,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
