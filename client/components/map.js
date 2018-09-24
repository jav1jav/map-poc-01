import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

mapboxgl.accessToken =
  'pk.eyJ1IjoiamF2aWVyY2FyZXkiLCJhIjoiY2ptYjN4aG5pMDEwcjNwbnF1M2twYW91ZSJ9.UITbabUfCeSDBAXMykIMvw'

/**
 * COMPONENT
 */

class Map extends React.Component {
  map

  constructor(props) {
    super(props)
    this.state = {
      lng: -122.486052,
      lat: 37.830348,
      zoom: 17,
      coords: []
    }
  }

  componentDidMount() {
    this.setState({
      coords: this.props.coordinates
    })

    const {lng, lat, zoom} = this.state
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.42744019999999, 37.7713775],
      zoom,

    })

    // this.map.on('move', () => {
    //   const {lng, lat} = map.getCenter()

    //   this.setState({
    //     lng: lng.toFixed(4),
    //     lat: lat.toFixed(4),
    //     zoom: this.map.getZoom().toFixed(2)
    //   })
    // })

    this.map.on('load', () => {
      this.updateLayer()
    })
  }

  updateLayer() {
    this.map.addLayer({
      id: 'route' + this.state.coords.length,
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: this.state.coords
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 8
      }
    })
  }

  updateLayer2() {
    this.setState({
      coords: data.slice(0, ++counter)
    })
  }

  render() {
    if (this.state.coords.length !== this.props.coordinates.length) {
      this.setState({
        coords: this.props.coordinates
      })
    }


    console.log('rendering | state', this.state)
    this.map && this.state.coords.length > 0 && this.updateLayer()

    const {lng, lat, zoom} = this.state

    return (
      <div id='map' style={{width: 100+ '%', height: 600 }} />
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    sessionID: state.sessionID,
    coordinates: state.stat
  }
}

export default connect(mapState)(Map)

/**
 * PROP TYPES
 */
Map.propTypes = {
  sessionID: PropTypes.string
}
