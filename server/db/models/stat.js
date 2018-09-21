//const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Stat = db.define('stat', {
  lng: {
    type: Sequelize.FLOAT
    // unique: true,
    // allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT,
  },
  sessionId: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  }

})

module.exports = Stat

/**
 * instanceMethods
 */
// Stat.prototype.xx = function() {
//   return z
// }

/**
 * classMethods
 */
// Stat.xx = function() {
//   return z
// }

/**
 * hooks
 */
// func() {}

// Stat.beforeCreate(func)
// Stat.beforeUpdate(func)
