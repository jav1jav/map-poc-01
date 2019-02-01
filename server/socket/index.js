module.exports = io => {
  io.on('connection', socket => {
    console.log(`server/socket/index.js | A socket connection to the server has been made: ${socket.id}`)

    socket.on('sendRunnerStats', function(lng, lat, userId) {
      // const emitLable = 'forwardRunnerStats' + userId
      socket.broadcast.emit('forwardRunnerStats', lng, lat, userId);
      console.log('server/socket/index.js | emit on receipt | lng, lat, userID:', lng, lat, userId);
    });

    socket.on('disconnect', () => {
      console.log(`server/socket/index.js | Connection ${socket.id} has left the building`)
    })
  })
}
