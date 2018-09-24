import React from 'react'
import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()

let counter = 0

const data = [
[-122.4274806, 37.7714943],
[-122.4273066, 37.7715201],
[-122.4273066, 37.7715201],
[-122.4272509, 37.7715798],
[-122.4272509, 37.7715798],
[-122.4267624, 37.7715055],
[-122.4267288, 37.7715791],
[-122.4269391, 37.7711675],
[-122.4267835, 37.7706707],
[-122.4267257, 37.7704628],
[-122.4265803, 37.7692235],
[-122.4267359, 37.7690979],
[-122.4267359, 37.7690979],
[-122.4267481, 37.768949],
[-122.4266961, 37.7689415],
[-122.4270079, 37.7687781],
[-122.42713522, 37.76913784],
[-122.42713522, 37.76913784],
[-122.42713522, 37.76913784],
[-122.4266759, 37.7690785],
[-122.4265668, 37.7695835],
[-122.4265995, 37.7700708],
[-122.4266871, 37.7702312],
[-122.4269173, 37.7713417],
[-122.4271558, 37.7716194],
[-122.4271558, 37.7716194],
[-122.4275165, 37.771478],
[-122.4275165, 37.771478]
]

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
  timeoutId = setInterval(sendRunnerStats, 10000, true)
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
