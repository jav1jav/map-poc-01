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

  componentDidMount() {
    const coordinates = this.props.coordinates
    console.log('map.js | cdm | coordinates from props: ', coordinates)
    let lng = -122.48369693756104
    let lat = 37.83381888486939
    if (coordinates.length > 0) {
      lng = coordinates[coordinates.length - 1][0]
      lat = coordinates[coordinates.length - 1][1]
    }
    this.createMap(lng, lat)
  }

  createMap(lng, lat) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom: 17
    })
  }

  updateLayer() {

    const coordinates = this.props.coordinates
    console.log(
      'map.js | updateLayer | this.props.coordinates ',
      coordinates
    )
    this.map.addLayer({
      id: 'route' + coordinates.length,
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
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
    this.map.flyTo({center: coordinates[coordinates.length-1]});
  }

  render() {
    console.log('map.js | render | props: ', this.props)
    this.map && this.props.coordinates.length > 0 && this.updateLayer()
    // if (this.props.coordinates.length > 0) {
    //   const coordinates = this.props.coordinates
    //   const lng = coordinates[coordinates.length - 1][0]
    //   const lat = coordinates[coordinates.length - 1][1]

    //   this.createMap(lng, lat)
    //   this.updateLayer()
    // }

    return <div id="map" style={{width: 100 + '%', height: 600}} />
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
