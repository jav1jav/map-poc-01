const router = require('express').Router()
const {Stat} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const stats = await Stat.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['lat', 'lng', 'userId']
    })
    res.json(stats)
  } catch (err) {
    next(err)
  }
})

router.get('/mystats', async (req, res, next) => {
  const id = req.user.id;
  console.log('server/api/stats.js | mystats route | user id', id)
  try {
    const stats = await Stat.findAll({
      where: {userId: id},
      attributes: ['lat', 'lng']
    })
    res.json(stats)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const stats = await Stat.create(req.body)
    res.json(stats)
  } catch (err) {
    next(err)
  }
})
