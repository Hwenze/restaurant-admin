const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access',
    'routeHandler'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };


  // 服务端口号
  exports.cluster = {
    listen: {
      path: '',
      port: 8081,
      hostname: '127.0.0.1',
    }
  };

  // 基础路由 即不需要验证的路由
  exports.baseRoutes = [
    '/login',
    '/help',
    '/home',
    '/login/callback',
  ]


  // 配置指定的前端地址
  exports.cors = {
    // origin: '*',

    origin: ctx => ctx.get('origin'),
    credentials: true,
  };

  // session
  exports.session = {
    key: 'EGG_SESS',
    maxAge: 3 * 3600 * 1000, // 一周
    httpOnly:true,     
    encrypt:true,
    renew:true   //每次刷新页面的时候 session都会被延期
  }

  exports.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }

  return exports;
};
