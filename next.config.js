const withImages = require('next-images')


module.exports = withImages({
  webpack5: false,
  env: {
  apiUrl:'http://104.248.241.90:8000'

  }
})
