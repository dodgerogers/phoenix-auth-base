import React from 'react';
import { Menu, Button, Header, Container } from 'semantic-ui-react';
import LoginModal from '../../authentication/components/LoginModal';

const Navbar = (props) => {
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
            <Menu.Item>
              <LoginModal
                trigger={<Button color="teal">Login</Button>}
                {...props}
              />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </navbar>
  );
}

export default Navbar;
