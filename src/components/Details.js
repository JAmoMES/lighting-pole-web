import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Button,
  Card,
  Icon,
  Table,
  TransitionablePortal,
} from 'semantic-ui-react'
import { useAuth } from '../contexts/AuthPorvider'
import { getPoldDataById, updateLightStatusByAdmin } from '../services/light'
import CardSkeleton from './CardSkeleton'
import PoleModal from './PoleModal'

const Details = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [poldData, setPoldData] = useState()
  const [isOpenPole, setIsOpenPole] = useState(false)

  const handleClosePole = () => {
    setIsOpenPole(false)
  }

  const onOpenPole = () => {
    setIsOpenPole(true)
  }

  const handleToggle = () => {
    setLoadingButton(true)
    updateLightStatusByAdmin(poldData._id)
      .then(() => {
        setPoldData((poldData) => ({
          ...poldData,
          status: !poldData.status,
        }))
      })
      .finally(() => setLoadingButton(false))
  }

  useEffect(() => {
    if (!isOpen) return
    const poldId = searchParams.get('poldId')
    if (poldId) {
      setLoading(true)
      getPoldDataById(poldId)
        .then(({ data }) => {
          setPoldData(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [searchParams, isOpen])

  return (
    <TransitionablePortal
      open={isOpen}
      onClose={() => !isOpenPole && onClose()}
      transition={{ animation: 'fade left', duration: 500 }}
    >
      <Card
        style={{
          right: '3%',
          position: 'fixed',
          top: '10%',
          zIndex: 1000,
          overflow: 'hidden',
        }}
        className='cover'
      >
        {poldData?.name && !loading ? (
          <>
            <img
              alt='1'
              src={poldData?.image}
              style={{
                height: '290px',
                width: '100%',
                overflow: 'hidden',
                marginBottom: -6,
              }}
            />
            <Card.Content>
              <Card.Header>{poldData?.name.toUpperCase()}</Card.Header>
              <Card.Meta>
                {poldData?.address ||
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut non exercitationem inventore perfer'}
              </Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Header>PM Status</Card.Header>
              {poldData.pm ? (
                <Table
                  celled
                  fixed
                  singleLine
                  color='yellow'
                  textAlign='center'
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>PM 1</Table.HeaderCell>
                      <Table.HeaderCell>PM 2.5</Table.HeaderCell>
                      <Table.HeaderCell>PM 10</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{poldData?.pm.pm1}</Table.Cell>
                      <Table.Cell>{poldData?.pm.pm25}</Table.Cell>
                      <Table.Cell>{poldData?.pm.pm10}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              ) : (
                <Card.Meta>No PM data</Card.Meta>
              )}
            </Card.Content>
            <Card.Content extra>
              <p>
                <Icon name='lightbulb' color='yellow' />
                light status:{' '}
                <span style={{ color: 'black' }}>
                  {poldData?.status ? 'open' : 'close'}
                </span>
              </p>
              {user && (
                <div style={{ display: 'flex' }}>
                  <Button
                    loading={loadingButton}
                    style={{ display: 'block', flexGrow: 1, marginRight: 8 }}
                    secondary
                    onClick={handleToggle}
                  >
                    Toggle Light
                  </Button>
                  <Button
                    icon
                    style={{ display: 'block' }}
                    onClick={onOpenPole}
                  >
                    <Icon name='settings' />
                  </Button>
                  {isOpenPole && (
                    <PoleModal
                      isOpen={isOpenPole}
                      handleClose={handleClosePole}
                      defaultPole={poldData}
                      callback={(data) => {
                        setPoldData((poldData) => ({
                          ...poldData,
                          ...data,
                        }))
                      }}
                    />
                  )}
                </div>
              )}
            </Card.Content>
          </>
        ) : (
          <CardSkeleton />
        )}
      </Card>
    </TransitionablePortal>
  )
}

export default Details
