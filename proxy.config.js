const proxy = [
    {
      context: '/api',
      target: 'https://itunes.apple.com',
      pathRewrite: {'^/api' : ''},
      "changeOrigin": true
    }
  ];
  module.exports = proxy;