import React from 'react'
import { Card, Placeholder } from 'semantic-ui-react'

const CardSkeleton = () => {
  return (
    <>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>
      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length='very short' />
            <Placeholder.Line length='very long' />
            <Placeholder.Line length='very long' />
          </Placeholder.Header>
        </Placeholder>
      </Card.Content>
      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length='very short' />
            <Placeholder.Line length='very long' />
          </Placeholder.Header>
        </Placeholder>
      </Card.Content>
      <Card.Content extra>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line length='short' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>
    </>
  )
}

export default CardSkeleton
