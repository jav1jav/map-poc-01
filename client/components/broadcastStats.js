import React from 'react'
import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()
import Map from './map'
import store from '../store'
import { gotStat } from '../store/stat'



function updatePageWithText(msg) {
  var output = document.getElementById('log')
  var previousEntry = output.firstChild
  var date = new Date(Date.now())
  output.insertBefore(
    document.createElement('p'),
    previousEntry
  ).innerHTML = `${date.toLocaleTimeString()} ${msg}`
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
      store.dispatch(gotStat([longitude, latitude]))
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
  updatePageWithText('Started sharing stats.')
  sharingStats = true
  sendRunnerStats()
  shareStatsOnInterval()
}

function shareStatsOnInterval() {
  timeoutId = setInterval(sendRunnerStats, 4000, true)
}

function stopSharingStats() {
  clearTimeout(timeoutId)
  sharingStats = false
  alert('not sharing stats')
  updatePageWithText('Stopped sharing stats.')
}

export default function broadcastStats() {
  if (!navigator.geolocation) {
    return <div>'geolocation not supported'</div>
  } else {
    return (
      <React-fragment>
        <Map />
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
        <div id="log" />
      </React-fragment>
    )
  }
}
