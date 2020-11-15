'use strict';


module.exports = (options, app) => {
  return async function (ctx, next) {
    const path = ctx.request.path;
    const isPass = app.config.baseRoutes.indexOf(path);
    const { userinfo = {} } = ctx.session;
    if (isPass !== -1) {
      await next();
    } else {
      if (userinfo && userinfo.token) {
        await next();
      } else {
        await ctx.redirect('/login');
      }
    }
  }
}
