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
const dataObj = dataIn.trkpt.map(el => {
  let obj = {}
  obj.lon = el.lon
  obj.lat = el.lat
  obj.ele = el.ele
  obj.time = el.time
  obj.hr = el.extensions.TrackPointExtension.hr
  obj.cad = el.extensions.TrackPointExtension.cad
  return obj
})

let counter = 0
function sendFakeRunnerStats(shouldBroadcast = true) {
  const userId = 2
  let latitude = null
  let longitude = null
  let xxx = null
  let yyy = null

  if (counter < data.length) {
    latitude = data[counter][1]
    xxx = dataObj[counter].time
    yyy = dataObj[counter].cad
    longitude = data[counter++][0]

  } else {
    counter = 0
    latitude = data[counter][1]
    xxx = dataObj[counter].time
    yyy = dataObj[counter].cad
    longitude = data[counter++][0]
  }

  shouldBroadcast &&
    broadcaster.emit('sendRunnerStats', longitude, latitude, userId)
  store.dispatch(gotStat([longitude, latitude]))
  updatePageWithText(`lat: ${latitude} lng: ${longitude} time: ${xxx} cad: ${yyy}`)
}


// * * * sendRealRunnerStats * * *
//Function that broadcasts fake data from the data.json file

function sendRealRunnerStats(shouldBroadcast = true) {
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

// * * * sendRunnerStats * * *
//Function that is exported and used in runnerPage that takes an ID and
//then decides to send stats for fake user or real user

export function sendRunnerStats(id) {
  return id === 2 ? sendFakeRunnerStats() : sendRealRunnerStats()
}
