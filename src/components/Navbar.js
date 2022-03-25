import React, { useState } from 'react'
import { Button, Header, Icon } from 'semantic-ui-react'
import { useAuth } from '../contexts/AuthPorvider'
import LoginModal from './LoginModal'

const Navbar = () => {
  const { user, logout } = useAuth()
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
          <Header.Subheader>Show the light for your life.</Header.Subheader>
        </Header.Content>
      </Header>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {user && (
          <Header as='h3' style={{ marginBottom: 5 }}>
            Hi! "{user?.username}"
          </Header>
        )}
        <Button
          secondary
          icon={!!user}
          style={{ marginBottom: 10, marginLeft: 10 }}
          onClick={() => (user ? logout() : onOpen())}
        >
          {user ? (
            <Icon name='shutdown' />
          ) : (
            <>
              <Icon name='sign in' /> Admin
            </>
          )}
        </Button>
      </div>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
    </nav>
  )
}

export default Navbar
