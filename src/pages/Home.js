import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { icon } from 'leaflet'
import Details from '../components/Details'

const position = [13.8453, 100.57]

function GetIcon(_iconSize, forecast) {
  return icon({
    iconUrl: require('../assets/images/' + forecast + '.png'),
    iconSize: [_iconSize],
  })
}

const Home = () => {
  const [currentPold, setCurrentPold] = useState(false)

  const handlePold = () => {
    setCurrentPold((currentPold) => !currentPold)
  }

  const onClose = () => {
    console.log('close!!')
    setCurrentPold(false)
  }

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
        <Marker
          position={position}
          icon={GetIcon(50, 'light_open')}
          eventHandlers={{
            click: handlePold,
          }}
        >
          <Tooltip direction='top' opacity={1}>
            permanent Tooltip for Rectangle
          </Tooltip>
        </Marker>
      </MapContainer>
      <Details isOpen={currentPold} onClose={onClose} />
    </>
  )
}

export default Home
