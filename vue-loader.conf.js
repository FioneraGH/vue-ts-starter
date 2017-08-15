var utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: false
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ]
}
