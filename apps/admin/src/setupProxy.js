const proxy = require('http-proxy-middleware');

const IS_MOCK = true;

module.exports = function (app) {
  app.use(proxy('/api', {
    target: IS_MOCK ? 'http://localhost:3737' : '',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }));
};
