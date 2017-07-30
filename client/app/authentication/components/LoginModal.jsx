import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import LoginForm from './LoginForm.jsx'

const LoginModal = (props) => (
  <Modal
    size="mini"
    trigger={<Button>Show Modal</Button>}
  >
    <Modal.Content>
      <LoginForm {...props} />
    </Modal.Content>
  </Modal>
)

export default LoginModal
