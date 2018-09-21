import io from 'socket.io-client'
import { broadcaster } from './components/broadcastStats'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

//socket.on('sendRunnerStats', )

broadcaster.on('sendRunnerStats', (...payload) => {
  socket.emit('sendRunnerStats', ...payload);
  console.log('client', ...payload);
})

export default socket
