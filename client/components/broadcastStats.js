import React from 'react'
import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()

let counter = 0

const data = [
  [-122.48369693756104, 37.83381888486939],
  [-122.48348236083984, 37.83317489144141],
  [-122.48404026031496, 37.83114119107971],
  [-122.48404026031496, 37.83049717427869],
  [-122.48348236083984, 37.829920943955045],
  [-122.48356819152832, 37.82954808664175],
  [-122.48507022857666, 37.82944639795659],
  [-122.48610019683838, 37.82880236636284],
  [-122.48695850372314, 37.82931081282506],
  [-122.48700141906738, 37.83080223556934],
  [-122.48751640319824, 37.83168351665737],
  [-122.48803138732912, 37.832158048267786],
  [-122.48888969421387, 37.83297152392784],
  [-122.48987674713133, 37.83263257682617],
  [-122.49043464660643, 37.832937629287755],
  [-122.49125003814696, 37.832429207817725],
  [-122.49163627624512, 37.832564787218985],
  [-122.49223709106445, 37.83337825839438],
  [-122.49378204345702, 37.83368330777276]
]

function sendRunnerStats(shouldBroadcast = true) {
  const userId = 1
  //const lngLat = data.slice(counter, ++counter)[0]
  function success(position) {
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    shouldBroadcast &&
      broadcaster.emit('sendRunnerStats', longitude, latitude, userId)
  }

  function error() {
    console.log('Unable to retrieve your location')
  }
  navigator.geolocation.getCurrentPosition(success, error)
}
// the function below keeps you from hitting a button repeatedly
// but what you need is something that will run every minute
// runEvery (func, time) {
//   let startTime = Date.now()
//   return () => {
//     if (startTime - Date.now > time ) {
//       func()
//       startTime = Date.now
//     }
//   }
// }

let timeoutId = null
let sharingStats = false

function startSharingStats() {
  alert('sharing stats')
  sharingStats = true
  sendRunnerStats()
  shareStatsOnInterval()
}

function shareStatsOnInterval() {
  while (sharingStats) {
    timeoutId = window.setTimeout(sendRunnerStats, 10000, true)
  }
}

function stopSharingStats() {
  window.clearTimeout(timeoutId)
  sharingStats = false
  alert('not sharing stats')
}

export default function broadcastStats() {
  return (
    <React-fragment>
      <h1>
        {navigator.geolocation
          ? 'geolocation supported'
          : 'geolocation not supported'}
      </h1>
      <div>
        <button type="submit" onClick={sendRunnerStats}>
          Get Current Position
        </button>
      </div>
      <div>
        <button type="submit" onClick={startSharingStats}>
          Start Sharing Location Stats
        </button>
      </div>
      <div>
        <button type="submit" onClick={stopSharingStats}>
          Stop Sharing Location Stats
        </button>
      </div>
      <div>
        Share Status:{sharingStats ? `Sharing Stats` : `Not Sharing Stats`}
      </div>
      <div id="map" />
    </React-fragment>
  )
}
