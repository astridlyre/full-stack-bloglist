const palindrome = string => {
  return string.split('').reverse().join('')
}

const average = array => {
  return array.length === 0
    ? 0
    : array.reduce((sum, current) => sum + current, 0) / array.length
}

module.exports = {
  palindrome,
  average,
}
