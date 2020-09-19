const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  blurb: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
    default: [],
  },
  createdOn: {
    type: Date,
    required: true,
    default: new Date(),
  },
  comments: {
    type: Array,
    required: false,
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

blogEntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogEntrySchema)
