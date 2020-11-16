const path = require('path');
module.exports = {
  target: 'web',
  entry: {
    login: 'app/web/page/login/index.jsx',
    admin: 'app/web/page/admin/index.jsx',
  },
  module: {
    rules: [
      {
        less: {
          enable: true,
          include: [path.resolve(__dirname, 'app/web')],
          exclude: [path.resolve(__dirname, 'node_modules')]
        }
      },
    ]
  },
  resolve: {
    alias: {
      '~web': path.resolve(__dirname, 'app/web'),
      '@web': path.resolve(__dirname, 'app/web'),
    },
  },
  externals:{
    INITIAL_STATE:'window.__INITIAL_STATE__',
  }
};
