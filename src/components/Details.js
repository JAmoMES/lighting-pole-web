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
import { getPoleDataById, updateLightStatusByAdmin } from '../services/light'
import CardSkeleton from './CardSkeleton'
import ChartPM from './ChartPM'
import PoleModal from './PoleModal'

const Details = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [poleData, setPoleData] = useState()
  const [isOpenPole, setIsOpenPole] = useState(false)
  const [history, setHistory] = useState(false)

  const handleClosePole = () => {
    setIsOpenPole(false)
  }

  const onOpenPole = () => {
    setIsOpenPole(true)
  }

  const handleToggle = () => {
    setLoadingButton(true)
    updateLightStatusByAdmin(poleData._id)
      .then(() => {
        setPoleData((poleData) => ({
          ...poleData,
          status: !poleData.status,
        }))
      })
      .finally(() => setLoadingButton(false))
  }

  const openHistory = () => {
    setHistory(true)
  }

  const handleCloseHistory = () => {
    console.log('mayo')
    setHistory(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const poleId = searchParams.get('poleId')
    if (poleId) {
      setLoading(true)
      getPoleDataById(poleId)
        .then(({ data }) => {
          setPoleData(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [searchParams, isOpen])

  useEffect(() => {
    console.log(history)
  })

  return (
    <TransitionablePortal
      open={isOpen}
      onClose={() => !isOpenPole && !history && onClose()}
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
        {poleData?.name && !loading ? (
          <>
            <img
              alt='1'
              src={poleData?.image}
              style={{
                height: '290px',
                width: '100%',
                overflow: 'hidden',
                marginBottom: -6,
              }}
            />
            <Card.Content>
              <Card.Header>{poleData?.name.toUpperCase()}</Card.Header>
              <Card.Meta>
                {poleData?.address ||
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut non exercitationem inventore perfer'}
              </Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Header>
                PM Status
                <p
                  onClick={openHistory}
                  style={{
                    fontSize: 16,
                    color: 'gray',
                    float: 'right',
                    cursor: 'pointer',
                  }}
                >
                  Show History
                </p>
              </Card.Header>
              {poleData.pm ? (
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
                      <Table.Cell>{poleData?.pm.pm1}</Table.Cell>
                      <Table.Cell>{poleData?.pm.pm25}</Table.Cell>
                      <Table.Cell>{poleData?.pm.pm10}</Table.Cell>
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
                  {poleData?.status ? 'open' : 'close'}
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
                      defaultPole={poleData}
                      callback={(data) => {
                        setPoleData((poleData) => ({
                          ...poleData,
                          ...data,
                        }))
                      }}
                    />
                  )}
                  <ChartPM
                    poleId={poleData._id}
                    isOpen={history}
                    handleClose={handleCloseHistory}
                  />
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
