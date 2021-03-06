var utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: false
  }),
  // for autoprefixer
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ],
  // for tslint
  ts: ['ts-loader', 'tslint-loader']
}
