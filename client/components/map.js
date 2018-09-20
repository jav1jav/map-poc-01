import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

mapboxgl.accessToken = process.env.MAPBOX_TOKEN

//var map = new mapboxgl.Map('map-seven', 'mapbox.streets', {
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [-122.486052, 37.830348],
  zoom: 15,
  scrollWheelZoom: false,
  legendControl: {
    position: 'topright'
  }
})

var geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.0366048812866, 38.89784666877921]
      },
      properties: {
        title: 'The White House',
        'marker-color': '#9c89cc',
        'marker-size': 'medium',
        'marker-symbol': 'building'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.00905323028564, 38.88981361419182]
      },
      properties: {
        title: 'U.S. Capitol',
        'marker-color': '#9c89cc',
        'marker-size': 'medium',
        'marker-symbol': 'town-hall'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-77.0366048812866, 38.89873175227713],
          [-77.03364372253417, 38.89876515143842],
          [-77.03364372253417, 38.89549195896866],
          [-77.02982425689697, 38.89549195896866],
          [-77.02400922775269, 38.89387200688839],
          [-77.01519012451172, 38.891416957534204],
          [-77.01521158218382, 38.892068305429156],
          [-77.00813055038452, 38.892051604275686],
          [-77.00832366943358, 38.89143365883688],
          [-77.00818419456482, 38.89082405874451],
          [-77.00815200805664, 38.88989712255097]
        ]
      },
      properties: {
        stroke: '#fa946e',
        'stroke-opacity': 1,
        'stroke-width': 6
      }
    }
  ]
}



// var myLayer = L.mapbox.featureLayer().addTo(map)
// myLayer.setGeoJSON(geojson)

// map.legendControl.addLegend('<strong>test</strong>')

/**
 * COMPONENT
 */
export const Map = props => {
  const {sessionID} = props

  return (
    <div id="map2">
      <h3>map-poc-01</h3>
    </div>
  )
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
