const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/auth/', '/team/', '/chat/'],
    createProxyMiddleware({
      target: 'http://3.36.99.28:8080',
      changeOrigin: true,
    })
  );
};
