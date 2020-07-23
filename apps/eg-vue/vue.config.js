const path = require('path');
const { name, passid } = require('./project.config.json');
const AssetsCDNWebpackPlugin = require('assets-cdn-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const USE_MOCK = false;
const MOCK_URL = 'http://localhost:3737';
const API_URL = 'http://www.example.com';
const IS_PRO = process.env.NODE_ENV === 'production';

const LIBS_VERION = {
  'vue': '2_6_11',
  'vue-router': '3_1_6',
  'vuex': '3_3_0',
  'axios': '0_19_2',
};

const plugins = [
  // new VueSkeletonWebpackPlugin({
  //   webpackConfig: {
  //     entry: skeletons.entry
  //   },
  //   quiet: true,
  //   minimize: true,
  //   router: skeletons.routers
  // }),
]

if (IS_PRO) {
  plugins.push(new AssetsCDNWebpackPlugin({
    baseURL: `/${passid}/cloud`,
    rename: (type, filename) => `/${filename}/${LIBS_VERION[filename]}.min.${type}`,
    htmls: {
      index: {
        js: ['vue', 'vue-router', 'vuex', 'axios'],
        // css: ['ant-design-vue']
      }
    }
  }))
}

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
  publicPath: IS_PRO
    ? `/${passid}/${name}/`
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
    devtool: IS_PRO ? 'none' : 'source-map',
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
    externals: IS_PRO ? {
      axios: 'axios',
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    } : undefined,
    // plugins: IS_PRO ? [
    //   new BundleAnalyzerPlugin()
    // ] : []
    plugins
  }
}
