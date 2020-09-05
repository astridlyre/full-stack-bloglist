const dummy = blogEntries => {
  return 1
}

const totalLikes = blogEntries => {
  if (!blogEntries.length) return 0
  let s = 0
  blogEntries.forEach(entry => (s += entry.likes))
  return s
}

const favoriteBlog = blogEntries => {
  if (!blogEntries.length) return null
  let topBlog = blogEntries[0]
  for (let i = 1; i < blogEntries.length; i++) {
    if (blogEntries[i].likes > topBlog.likes) topBlog = blogEntries[i]
  }
  return topBlog
}

const mostBlog = blogEntries => {
  // make sure some blogs exist
  if (!blogEntries.length) return null

  // set inital first author
  const authors = [{ author: blogEntries[0].author, blogs: 1 }]
  // set initial top author
  let topAuthor = authors[0]
  // for each blog entry check to see if the author exists in our array
  for (let i = 1; i < blogEntries.length; i++) {
    authors.forEach(author => {
      // if yes, increment blog count
      if (author.author === blogEntries[i].author) {
        author.blogs++
        if (author.blogs > topAuthor.blogs) topAuthor = author
        return
      }
      // if no, add new author to array with one blog count
      if (author.author !== blogEntries[i].author) {
        let newAuthor = {
          author: blogEntries[i].author,
          blogs: 1,
        }
        authors.push(newAuthor)
        if (newAuthor.blogs > topAuthor.blogs) topAuthor = newAuthor
      }
    })
  }
  return topAuthor
}

const mostLikes = blogEntries => {
  if (!blogEntries.length) return null
  const authors = [
    { author: blogEntries[0].author, likes: blogEntries[0].likes },
  ]
  let topAuthor = authors[0]

  for (let i = 1; i < blogEntries.length; i++) {
    authors.forEach(author => {
      if (author.author === blogEntries[i].author) {
        author.likes += blogEntries[i].likes
        if (author.likes > topAuthor.likes) topAuthor = author
        return
      }
      if (author.author !== blogEntries[i].author) {
        let newAuthor = {
          author: blogEntries[i].author,
          likes: blogEntries[i].likes,
        }
        authors.push(newAuthor)
        if (newAuthor.likes > topAuthor.likes) topAuthor = newAuthor
      }
    })
  }
  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
}
