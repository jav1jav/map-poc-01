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
    // const coordinates = this.props.coordinates
    const stats = this.props.statsArr
    // const coordinates = [stats.lon, stats.lat]
    // console.log('map.js | cdm | coordinates from props: ', coordinates)
    // let lon = -122.48369693756104
    // let lat = 37.83381888486939
    // let lastStat = {}
    // if (coordinates.length > 0) {
    //   lon = coordinates[coordinates.length - 1].lon
    //   lat = coordinates[coordinates.length - 1].lat
    // }
    if (stats.length > 0) {
      console.log('map.js | cdm | stats from props: ', stats)
      const lastStat = stats[stats.length - 1]
      console.log('map.js | cdm | last stat lon lat: ', lastStat.lon, lastStat.lat)
      this.createMap(lastStat.lon, lastStat.lat)
    } else {
      this.createMap(-122.48369693756104, 37.83381888486939)
    }




  }

  createMap(lon, lat) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lon, lat],
      zoom: 17
    })
  }

  updateLayer() {

    // const coordinates = this.props.coordinates
    const stats = this.props.statsArr
    // const lastStat = stats[stats.length - 1]
    const coordinates = stats.map(el => [el.lon, el.lat])
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
    // console.log('map.js | render | props: ', this.props)
    this.map && this.props.statsArr.length > 0 && this.updateLayer()
    // if (this.props.coordinates.length > 0) {
    //   const coordinates = this.props.coordinates
    //   const lon = coordinates[coordinates.length - 1][0]
    //   const lat = coordinates[coordinates.length - 1][1]

    //   this.createMap(lon, lat)
    //   this.updateLayer()
    // }

    return <div id="map" style={{width: 100 + '%', height: 400}} />
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    sessionID: state.sessionID,
    // coordinates: state.stat
    statsArr: state.stat
  }
}

export default connect(mapState)(Map)

/**
 * PROP TYPES
 */
Map.propTypes = {
  sessionID: PropTypes.string
}
