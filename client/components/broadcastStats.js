import React from 'react'
import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()

function updatePageWithText(msg) {
  var output = document.getElementById('map')
  output.appendChild(document.createElement('p')).innerHTML = msg
}

function sendRunnerStats(shouldBroadcast = true) {
  const userId = 1

  if (!navigator.geolocation) {
    updatePageWithText(`Geolocation is not supported by your browser`)
    return
  }

  function success(position) {
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    shouldBroadcast &&
      broadcaster.emit('sendRunnerStats', longitude, latitude, userId)
    updatePageWithText(`lat: ${latitude} lng: ${longitude}`)
  }

  function error() {
    console.log('Unable to retrieve your location')
    updatePageWithText(`Unable to retrieve your location`)
  }
  navigator.geolocation.getCurrentPosition(success, error)
}

let timeoutId = null
let sharingStats = false

function startSharingStats() {
  alert('sharing stats')
  updatePageWithText('started sharing stats')
  sharingStats = true
  sendRunnerStats()
  shareStatsOnInterval()
}

function shareStatsOnInterval() {
  const startTime = Date.now()
  updatePageWithText('setInterval loop start')

  timeoutId = setInterval(sendRunnerStats, 10000, true)

  updatePageWithText('setInterval has been set')
}

function stopSharingStats() {
  clearTimeout(timeoutId)
  sharingStats = false
  alert('not sharing stats')
  updatePageWithText('stopped sharing stats')
}

export default function broadcastStats() {
  if (!navigator.geolocation) {
    return <div>'geolocation not supported'</div>
  } else {
    return (
      <React-fragment>
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
}
