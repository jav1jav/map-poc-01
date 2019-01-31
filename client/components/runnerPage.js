import React from 'react'
import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()
import Map from './map'
import store from '../store'
import {gotStat} from '../store/stat'

const dataIn = require('./data.json')

const data = dataIn.trkpt.map(el => [el.lon, el.lat])

let counter = 0

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
  const userId = 2
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

  shouldBroadcast &&
    broadcaster.emit('sendRunnerStats', longitude, latitude, userId)
  store.dispatch(gotStat([longitude, latitude]))
  updatePageWithText(`lat: ${latitude} lng: ${longitude}`)
}

let timeoutId = null
// let sharingStats = false

function startSharingStats() {
  alert('sharing stats')
  updatePageWithText('Started sharing stats.')
  // sharingStats = true
  sendRunnerStats(true)
  shareStatsOnInterval()
}

function shareStatsOnInterval() {
  timeoutId = setInterval(sendRunnerStats, 3000, true)
}

function stopSharingStats() {
  clearTimeout(timeoutId)
  // sharingStats = false
  alert('not sharing stats')
  updatePageWithText('Stopped sharing stats.')
}

export default function runnerView() {
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
