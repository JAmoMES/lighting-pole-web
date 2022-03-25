import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { icon } from 'leaflet'
import Details from '../components/Details'
import { getAllPoleData } from '../services/light'
import { useSearchParams } from 'react-router-dom'
import ChartPM from '../components/ChartPM'

const position = [13.8453, 100.57]

function GetIcon(_iconSize, forecast) {
  return icon({
    iconUrl: require('../assets/images/' + forecast + '.png'),
    iconSize: [_iconSize],
  })
}

const Home = () => {
  const [poles, setPoles] = useState([])
  const [, setSearchParams] = useSearchParams()

  const [currentPole, setCurrentPole] = useState(false)

  const handlePole = (poleId) => {
    setSearchParams({ poleId })
    setCurrentPole((currentPole) => !currentPole)
  }

  const onClose = () => {
    setCurrentPole(false)
  }
  useEffect(() => {
    const unSub = setInterval(() => {
      getAllPoleData().then(({ data }) => {
        setPoles(data)
      })
    }, 2000)
    return () => clearInterval(unSub)
  }, [])

  return (
    <>
      <MapContainer
        center={position}
        zoom={20}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {poles.map((pole) => (
          <Marker
            key={pole._id}
            position={[pole.lat, pole.long]}
            icon={GetIcon(50, pole.status ? 'light_open' : 'light_close')}
            eventHandlers={{
              click: () => handlePole(pole._id),
            }}
          >
            <Tooltip direction='top' opacity={1}>
              {pole.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <ChartPM poleId={'623d7392ba85e001a01522d3'} />
      <Details isOpen={currentPole} onClose={onClose} />
    </>
  )
}

export default Home
