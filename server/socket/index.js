module.exports = io => {
  io.on('connection', socket => {
    console.log(`server/socket/index.js | A socket connection to the server has been made: ${socket.id}`)

    socket.on('sendRunnerStats', function(...payload) {
      // const emitLable = 'forwardRunnerStats' + userId
      socket.broadcast.emit('forwardRunnerStats', payload);
      console.log('server/socket/index.js | emit on receipt | userID, lat, lon:', ...payload);
    });

    socket.on('disconnect', () => {
      console.log(`server/socket/index.js | Connection ${socket.id} has left the building`)
    })
  })
}
