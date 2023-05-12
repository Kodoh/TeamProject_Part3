const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/users', {
            target: 'http://localhost:5000',
            changeOrigin: true
        }),
        createProxyMiddleware('/groups', {
            target: 'http://localhost:5000',
            changeOrigin: true
        }),
        createProxyMiddleware('/private', {
            target: 'http://localhost:5000',
            changeOrigin: true
        }),
        createProxyMiddleware('/membership', {
            target: 'http://localhost:5000',
            changeOrigin: true
        }),
        createProxyMiddleware('/messages', {
            target: 'http://localhost:5000',
            changeOrigin: true
        }),
    );
};