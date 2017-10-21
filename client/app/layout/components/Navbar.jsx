import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Menu, Button, Header, Container, Dropdown, Image } from 'semantic-ui-react';
import LoginModal from '../../authentication/components/LoginModal';
import LoginButtonContainer from '../../common/containers/LoginButtonContainer';
import RegistrationButtonContainer from '../../common/containers/RegistrationButtonContainer';


const Navbar = (props) => {
  const loggedInLinks = () => {
    const trigger = (
      <span>
        <Image avatar src={props.currentUser.get('avatar')} />
        <span>{props.currentUser.get('name')}</span>
      </span>
    );

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
    <LoginButtonContainer wrapper={Menu.Item} />,
    <RegistrationButtonContainer wrapper={Menu.Item} />,
  ]);

  return (
    <navbar>
      <Menu fixed="top">
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
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
