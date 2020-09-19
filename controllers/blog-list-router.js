const blogListRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const BlogEntry = require('../models/blog-entry')
const User = require('../models/user')

blogListRouter.get('/', async (req, res) => {
  const blogList = await BlogEntry.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(blogList)
})

blogListRouter.get('/:id', async (req, res) => {
  const blog = await BlogEntry.findById(req.params.id)
  blog ? res.json(blog) : res.status(404).end()
})

blogListRouter.delete('/:id', async (req, res) => {
  const token = req.token,
    decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  if (!user.blogEntries.includes(req.params.id))
    return res.status(401).json({ error: 'This does not belong to you!' })

  const deletedEntry = await BlogEntry.findByIdAndDelete(req.params.id)

  user.blogEntries = user.blogEntries.filter(
    entry => entry.toString() !== req.params.id
  )
  await user.save()
  res.status(204).json(deletedEntry)
})

blogListRouter.put('/:id', async (req, res) => {
  const token = req.token,
    decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    blurb: req.body.blurb,
    likes: req.body.likes,
    user: req.body.user.id,
    comments: req.body.comments,
  }

  const updatedEntry = await BlogEntry.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })

  res.json(updatedEntry)
})

blogListRouter.post('/', async (req, res) => {
  const token = req.token,
    decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid' })

  const user = await User.findById(decodedToken.id),
    newBlogEntry = new BlogEntry({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      blurb: req.body.blurb,
      likes: req.body.likes,
      user: user._id,
    }),
    savedEntry = await newBlogEntry.save()

  user.blogEntries = user.blogEntries.concat(savedEntry._id)
  await user.save()

  const payload = await savedEntry.populate('user', {
    username: 1,
    name: 1,
  })

  res.status(201).json(payload)
})

module.exports = blogListRouter
