import React, { useState } from 'react'
import { Button, Header, Icon } from 'semantic-ui-react'
import { useAuth } from '../contexts/AuthPorvider'
import LoginModal from './LoginModal'

const Navbar = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  return (
    <nav className='navbar'>
      {/* <div>YellowPole</div> */}
      <Header as='h2'>
        <Icon name='map outline' />
        <Header.Content>
          YellowPole
          <Header.Subheader>check your light</Header.Subheader>
        </Header.Content>
      </Header>

      <Button
        secondary
        style={{ marginBottom: 10 }}
        onClick={() => !user && onOpen}
      >
        {user ? (
          `Hi! ${user.username}`
        ) : (
          <>
            <Icon name='sign in' /> Admin
          </>
        )}
      </Button>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
    </nav>
  )
}

export default Navbar
