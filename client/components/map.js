import React from 'react'
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
    const stats = this.props.stats
    const zoomVal = 17
    if (stats.length > 0) {
      const lastStat = stats[stats.length - 1]
      this.createMap(lastStat.lon, lastStat.lat, zoomVal)
    } else {
      this.createMap(-122.48369693756104, 37.83381888486939, zoomVal)
    }
  }

  createMap(lon, lat, zoom) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lon, lat],
      zoom: zoom
    })
  }

  updateLayer() {
    const stats = this.props.stats
    const coordinates = stats.map(el => [el.lon, el.lat])
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
    this.map && this.props.stats.length > 0 && this.updateLayer()
    return <div id="map" />
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stats: state.stat.stats
  }
}

export default connect(mapState)(Map)

/**
 * PROP TYPES
 */
Map.propTypes = {
  stats: PropTypes.array
}
