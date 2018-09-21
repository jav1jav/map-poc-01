module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('sendRunnerStats', function(lng, lat, userId) {
      socket.broadcast.emit('sendRunnerStats', lng, lat, userId);
      console.log(lng, lat, userId);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
