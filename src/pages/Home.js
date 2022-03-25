import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { icon } from 'leaflet'
import Details from '../components/Details'
import { getAllPoldData } from '../services/light'
import { useSearchParams } from 'react-router-dom'

const position = [13.8453, 100.57]

function GetIcon(_iconSize, forecast) {
  return icon({
    iconUrl: require('../assets/images/' + forecast + '.png'),
    iconSize: [_iconSize],
  })
}

const Home = () => {
  const [polds, setPolds] = useState([])
  const [, setSearchParams] = useSearchParams()

  const [currentPold, setCurrentPold] = useState(false)

  const handlePold = (poldId) => {
    setSearchParams({ poldId })
    setCurrentPold((currentPold) => !currentPold)
  }

  const onClose = () => {
    setCurrentPold(false)
  }
  useEffect(() => {
    const unSub = setInterval(() => {
      getAllPoldData().then(({ data }) => {
        setPolds(data)
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
        {polds.map((pold) => (
          <Marker
            key={pold._id}
            position={[pold.lat, pold.long]}
            icon={GetIcon(50, 'light_open')}
            eventHandlers={{
              click: () => handlePold(pold._id),
            }}
          >
            <Tooltip direction='top' opacity={1}>
              {pold.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <Details isOpen={currentPold} onClose={onClose} />
    </>
  )
}

export default Home
