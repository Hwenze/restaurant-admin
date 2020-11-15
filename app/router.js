
module.exports = app => {
  const { controller } = app;
  const { admin, api } = controller;

  app.get('/login', admin.login);
  app.post('/login/callback', api.login);
  app.get('/logout', admin.logout);
  app.get('/(.*?)', admin.index);
};
