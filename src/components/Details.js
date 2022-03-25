import React from 'react'
import { Card, Icon, Image, TransitionablePortal } from 'semantic-ui-react'
import map from '../assets/images/1.png'

const Details = ({ isOpen, onClose }) => {
  return (
    <TransitionablePortal
      open={isOpen}
      onClose={onClose}
      transition={{ animation: 'fade left', duration: 500 }}
    >
      <Card
        style={{
          right: '3%',
          position: 'fixed',
          top: '10%',
          zIndex: 1000,
        }}
      >
        <Image src={map} wrapped ui={false} />
        <Card.Content>
          <Card.Header>Daniel</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
          <Card.Description>
            Daniel is a comedian living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            10 Friends
          </a>
        </Card.Content>
      </Card>
    </TransitionablePortal>
  )
}

export default Details
