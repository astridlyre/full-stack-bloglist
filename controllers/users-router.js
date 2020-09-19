const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogEntries', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  if (req.body.password.length < 5)
    return res
      .status(400)
      .json({ error: 'Password must be at least 5 characters' })

  const saltRounds = 10,
    passwordHash = await bcrypt.hash(req.body.password, saltRounds),
    user = new User({
      username: req.body.username,
      name: req.body.name,
      passwordHash,
    }),
    savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.put('/:id', async (req, res) => {
  const token = req.token,
    decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  if (decodedToken.id === req.params.id) {
    const user = await User.findById(decodedToken.id)

    user.name = req.body.name
    user.bio = req.body.bio

    await user.save()
    res.json(updatedEntry)
  }

  return res.status(400).json({ error: 'Could not process request' })
})

module.exports = usersRouter
