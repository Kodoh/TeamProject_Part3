const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/textChat', {
            target: 'http://34.70.137.123:80',
            changeOrigin: true
        }),
        createProxyMiddleware('/dataAnalytics/', {
            target: 'http://34.70.137.123:80',
            changeOrigin: true
        })
    );
};