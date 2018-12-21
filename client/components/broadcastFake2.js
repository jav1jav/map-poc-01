import React from 'react'
import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()
const dataIn = require('./data.json')

const data = dataIn.trkpt.map(el =>
  [el.lon, el.lat]
)

let counter = 0


function updatePageWithText(msg) {
  var output = document.getElementById('map')
  var previousEntry = output.firstChild
  var date = new Date(Date.now())
  output.insertBefore(
    document.createElement('p'),
    previousEntry
  ).innerHTML = `${date.toLocaleTimeString()} ${msg}`
}

function sendRunnerStats(shouldBroadcast = true) {
  const userId = 1
  let latitude = null
  let longitude = null

  if (counter < data.length) {
    latitude = data[counter][1]
    longitude = data[counter++][0]
  } else {
    counter = 0
    latitude = data[counter][1]
    longitude = data[counter++][0]
  }

  shouldBroadcast && broadcaster.emit('sendRunnerStats', longitude, latitude, userId)
  updatePageWithText(`lat: ${latitude} lng: ${longitude}`)
}

let timeoutId = null

function startSharingStats() {
  alert('sharing stats')
  updatePageWithText('Started sharing stats.')
  sendRunnerStats(true)
  shareStatsOnInterval()
}

function shareStatsOnInterval() {
  timeoutId = setInterval(sendRunnerStats, 3000, true)
}

function stopSharingStats() {
  clearTimeout(timeoutId)
  alert('not sharing stats')
  updatePageWithText('Stopped sharing stats.')
}

export default function broadcastStats() {
  if (!navigator.geolocation) {
    return <div>'geolocation not supported'</div>
  } else {
    return (
      <React-fragment>
        <div>
          <button type="submit" onClick={sendRunnerStats}>
            Send Current Position
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
        <div id="map" />
      </React-fragment>
    )
  }
}
