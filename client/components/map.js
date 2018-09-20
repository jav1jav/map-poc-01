import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

mapboxgl.accessToken = 'pk.eyJ1IjoiamF2aWVyY2FyZXkiLCJhIjoiY2ptYjN4aG5pMDEwcjNwbnF1M2twYW91ZSJ9.UITbabUfCeSDBAXMykIMvw'

/**
 * COMPONENT
 */
console.log(process.env)
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: -122.4552940,
      lat: 37.7665200,
      zoom: 13
    }
  }

  componentDidMount() {
    const {lng, lat, zoom} = this.state
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
      scrollWheelZoom: false,
      legendControl: {
        position: 'topright'
      }
    })

    map.on('move', () => {
      const {lng, lat} = map.getCenter()

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })
  }

  render() {
    const {lng, lat, zoom} = this.state

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div
          ref={el => (this.mapContainer = el)}
          className="absolute top right left bottom"
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    sessionID: state.sessionID
  }
}

export default connect(mapState)(Map)

/**
 * PROP TYPES
 */
Map.propTypes = {
  sessionID: PropTypes.string
}
