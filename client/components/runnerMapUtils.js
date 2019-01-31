import {EventEmitter} from 'events'
export const broadcaster = new EventEmitter()

import store from '../store'
import {gotStat} from '../store/stat'



// * * * updatePageWithText * * *
//Utility function used to write a value (msg) to a 'log' element on a page
//This was used in development to validate that the app was sending data
//and to log when user started sharing and stopped sharing data.

export function updatePageWithText(msg) {
  var output = document.getElementById('log')
  var previousEntry = output.firstChild
  var date = new Date(Date.now())
  output.insertBefore(
    document.createElement('p'),
    previousEntry
  ).innerHTML = `${date.toLocaleTimeString()} ${msg}`
}


// * * * sendFakeRunnerStats * * *
//Function that broadcasts fake data from the data.json file

const dataIn = require('./data.json')
const data = dataIn.trkpt.map(el => [el.lon, el.lat])

let counter = 0
export function sendFakeRunnerStats(shouldBroadcast = true) {
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


// * * * sendRealRunnerStats * * *
//Function that broadcasts fake data from the data.json file

export function sendRealRunnerStats(shouldBroadcast = true) {
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

export function sendRunnerStats(id) {
  console.log('runnerMapUtils | sendRunnerStats | id: ', id)
  return id === 2 ? sendFakeRunnerStats() : sendRealRunnerStats()
}
