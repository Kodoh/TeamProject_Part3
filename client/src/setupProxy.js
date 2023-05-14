const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/textChat', {
            target: 'http://localhost:5000',
            changeOrigin: true
        }),
        createProxyMiddleware('/dataAnalytics/', {
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );
};