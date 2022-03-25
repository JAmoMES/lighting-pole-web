import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-leaflet'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { Modal, TransitionablePortal } from 'semantic-ui-react'
import { getPmStatus } from '../services/pm'

function timeToDate(timestamp) {
  const d = new Date(timestamp * 1000)
  return (
    d.getDate() +
    '-' +
    (d.getMonth() + 1) +
    '-' +
    d.getFullYear() +
    ' ' +
    d.getHours() +
    ':' +
    d.getMinutes()
  )
}

function mapDateTime(pmData) {
  pmData.forEach((data) => {
    data.date = timeToDate(data.timestamp)
  })
  return pmData
}

const ChartPM = ({ poleId, isOpen, handleClose }) => {
  const [pmValue, setPmValue] = useState()

  useEffect(() => {
    getPmStatus(poleId).then(({ data }) => {
      setPmValue(mapDateTime(data))
    })
  }, [poleId])

  return (
    <TransitionablePortal
      open={isOpen}
      transition={{
        animation: 'scale',
        duration: 300,
      }}
    >
      <Modal onClose={handleClose} open size='small' closeIcon>
        <Modal.Header>PM History</Modal.Header>
        <Modal.Content style={{ height: 400 }}>
          {pmValue && (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={pmValue}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  padding={{ left: 30, right: 30 }}
                  angle={-45}
                  height={100}
                  dx={-30}
                  dy={40}
                />
                <YAxis />
                <Tooltip wrapperStyle={{ zIndex: 1000 }} active={true} />
                <Legend verticalAlign='top' height={36} />
                <Line type='monotone' dataKey='pm1' stroke='#8884d8' />
                <Line type='monotone' dataKey='pm25' stroke='#82ca9d' />
                <Line type='monotone' dataKey='pm10' stroke='#82cadd' />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Modal.Content>
      </Modal>
    </TransitionablePortal>
  )
}

export default ChartPM
