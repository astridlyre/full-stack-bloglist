const router = require('express').Router()
const BlogEntry = require('../models/blog-entry')
const User = require('../models/user')

router.post('/reset', async (req, res) => {
  await BlogEntry.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = router
