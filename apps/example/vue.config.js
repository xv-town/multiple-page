const path = require('path');
const { name } = require('./project.config.json');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const USE_MOCK = false;
const MOCK_URL = 'http://localhost:3737';
const API_URL = 'http://www.example.com'

const timeStamp = (() => {
  let _time = new Date();
  return {
    time: `${_time.getFullYear()}-${_time.getMonth() +
      1}-${_time.getDate()}(${_time.getHours()}:${_time.getMinutes()})`,
    timeValue: _time.valueOf(),
  };
})();

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? `/static/${name}/`
    : '/',
  outputDir: resolve(`../../dist/${name}`),
  devServer: {
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: USE_MOCK ? MOCK_URL : API_URL,
        cookieDomainRewrite: {
          '*': ''
        }
      }
    }
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
        'public': resolve('../public')
      },
    },
    output: {
      filename: `js/[name].js?t=${timeStamp.time}`,
      chunkFilename: `js/chunks/[name].js?t=${timeStamp.time}`
    },
    // plugins: process.env.NODE_ENV === 'production' ? [
    //   new BundleAnalyzerPlugin()
    // ] : []
  }
}
