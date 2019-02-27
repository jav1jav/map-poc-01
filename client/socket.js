import io from 'socket.io-client'
import { broadcaster, convertStatsArrayToObj } from './components/runnerMapUtils'
import store from './store'
import { gotStat } from './store/stat'

//This makes me a little sad, to create the socket and then disconnect it
//right away, but I'm missing something here. If I don't do this, then anyone
//coming to the site automatically gets a socket connection even if they haven't
//logged in. I set it so the socket isn't even imported by a component until user
//has already logged in, but even so, connection gets made.
//Disconnecting the socket after connecting, however, creates a socket that can
//be managed by user-home.js (ie. connected/disconnected), but doesn't let anyone
//not logged in get connected.
const socket = io.connect()
socket.io.disconnect()

export const socketDisconnect = () => {
  socket.io.disconnect()
}

export const socketReconnect = () => {
  socket.connect(window.location.origin, {'forceNew':true })
}

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('disconnect', () => {
  console.log('Disconnected!')
})

socket.on('forwardRunnerStats', function(...payload) {
  const stat = convertStatsArrayToObj(payload)
  store.dispatch(gotStat(stat))
});

broadcaster.on('sendRunnerStats', (...payload) => {
  socket.emit('sendRunnerStats', ...payload);
})

export default socket
