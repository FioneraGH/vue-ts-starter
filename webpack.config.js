// You can install more packages below to config more as you like:
// eslint
// babel-eslint
// eslint-config-standard
// eslint-loader
// eslint-plugin-html
// eslint-plugin-promise
// eslint-plugin-standard
// postcss-cssnext

const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

const bannerPlugin = new webpack.BannerPlugin(
  '// { "framework": "Vue" }\n'
)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function getBaseConfig() {
  return {
    // devtool: '#cheap-module-eval-source-map',
    devtool: '#source-map',
    entry: {
      app: path.resolve('./src/app.ts')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        'vue': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        // disable eslint
        // {
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   exclude: /node_modules/
        // },
        {
          test: /\.ts$/,
          loader: 'tslint-loader',
          enforce: 'pre',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.vue(\?[^?]+)?$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [bannerPlugin,
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true
      })]
  }
}

const webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
// deal with styles
utils.styleLoaders({ sourceMap: false }).forEach(entry => {
  webConfig.module.rules.push(entry)
})

function obj2string(o) {
  var r = []
  if (typeof o === 'string') {
    return '"' + o.replace(/(['"\\])/g, '\\$1').replace(/(\n)/g, '\\n').replace(/(\r)/g, '\\r').replace(/(\t)/g, '\\t') + '"'
  }
  if (typeof o === 'object') {
    if (!o.sort) {
      for (let i in o) {
        r.push(i + ':' + obj2string(o[i]))
      }
      if (!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
        r.push('toString:' + o.toString.toString())
      }
      r = '{' + r.join() + '}'
    } else {
      for (let i = 0; i < o.length; i++) {
        r.push(obj2string(o[i]))
      }
      r = '[' + r.join() + ']'
    }
    return r
  }
  return o.toString()
}

console.log('The final configuration is:\n\n' + obj2string(webConfig.module) + '\n\nConfiguration end.\n')

// const weexConfig = getBaseConfig()
// weexConfig.output.filename = '[name].weex.js'
// weexConfig.module.rules[3].use.push('weex-loader')

module.exports = [webConfig]
