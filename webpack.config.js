const path = require('path');
module.exports = {
  target: 'web',
  entry: {
    login: 'app/web/page/login/index.jsx',
    admin: 'app/web/page/admin/index.jsx'
  },
  module: {
    rules: [
      {
        less: true
      },
    ]
  },
  resolve: {
    alias: {
      '~web': path.resolve(__dirname, 'app/web')
    }
  }
};
