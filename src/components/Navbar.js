import React, { useState } from 'react'
import { Button, Dropdown, Header, Icon } from 'semantic-ui-react'
import { useAuth } from '../contexts/AuthPorvider'
import LoginModal from './LoginModal'
import PoleModal from './PoleModal'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenPole, setIsOpenPole] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClosePole = () => {
    setIsOpenPole(false)
  }

  const onOpenPole = () => {
    setIsOpenPole(true)
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
            Hi! {user?.username}
          </Header>
        )}
        {user ? (
          <Dropdown
            icon='settings'
            text='Config'
            labeled
            style={{ marginBottom: 10, marginLeft: 10 }}
            button
            floating
            className='icon'
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={onOpenPole}>
                <Icon name='plus' />
                Add Pole
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>
                <Icon name='shutdown' />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            secondary
            style={{ marginBottom: 10, marginLeft: 10 }}
            onClick={onOpen}
          >
            <Icon name='sign in' /> Admin
          </Button>
        )}
      </div>
      <LoginModal isOpen={isOpen} handleClose={handleClose} />
      {isOpenPole && (
        <PoleModal isOpen={isOpenPole} handleClose={handleClosePole} />
      )}
    </nav>
  )
}

export default Navbar
