import React from 'react'
import {sendRunnerStats} from './runnerMapUtils'
import Map from './map'

function updatePageWithText(msg) {
  var output = document.getElementById('log')
  var previousEntry = output.firstChild
  var date = new Date(Date.now())
  output.insertBefore(
    document.createElement('p'),
    previousEntry
  ).innerHTML = `${date.toLocaleTimeString()} ${msg}`
}

let timeoutId = null

function startSharingStats() {
  alert('sharing stats')
  updatePageWithText('Started sharing stats.')
  sendRunnerStats(true)
  timeoutId = setInterval(sendRunnerStats, 3000, true)
}

function stopSharingStats() {
  clearTimeout(timeoutId)
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
