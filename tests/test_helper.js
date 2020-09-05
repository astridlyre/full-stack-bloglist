const BlogEntry = require('../models/blog-entry')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogEntries = [
  {
    title: 'My cool blog post',
    author: 'Daniel',
    url: 'http://www.coolblog.com',
    likes: 5,
  },
  {
    title: 'Spiffy bois',
    author: 'Ashley',
    url: 'http://www.getspiffybois.org',
    likes: 87,
  },
]

const nonExistingId = async userId => {
  const newBlogEntry = new BlogEntry({
    title: 'Not gonna work',
    author: 'Fake Guy',
    url: 'http://www.fake.url',
    likes: 29890,
    user: userId,
  })
  await newBlogEntry.save()
  await newBlogEntry.remove()

  return newBlogEntry._id.toString()
}

const initialUser = async () => {
  const passwordHash = await bcrypt.hash('password', 10),
    user = new User({ username: 'user', passwordHash }),
    savedUser = await user.save()

  return savedUser
}

const blogsInDb = async () => {
  const blogs = await BlogEntry.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogEntries,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUser,
}
