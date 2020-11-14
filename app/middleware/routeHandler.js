'use strict';


module.exports = (options, app) => {
  return async function (ctx, next) {
    const path = ctx.request.path;
    const isPass = app.config.baseRoutes.find(item => item === path);
    console.log('heder',ctx.header.authorization);
    // const { }
    const { userinfo = {} } = ctx.session;
    if (isPass) {
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
