

module.exports = app => {
  return class AdminController extends app.Controller {
    async login() {
      const { ctx } = this;
      const { userinfo = {} } = ctx.session;
      if (userinfo && userinfo.token) {
        await ctx.redirect('/');
        return;
      }
      await ctx.renderClient('login.js', {});
    }
    async index() {
      const { ctx } = this;
      const { userinfo = {}, menuList = [] } = ctx.session;
      const { token = null } = userinfo;
      if (!userinfo || !userinfo.token) {
        await ctx.redirect('/login');
        return;
      }
      await ctx.renderClient('admin.js', {
        menuList: menuList.concat(ctx.app.config.baseRoutes||[]),
        userinfo: userinfo,
        token: token
      });
    }

    async logout() {
      const { ctx } = this;

      ctx.session = null;
      ctx.cookies.set('x-uid.sig', null);
      ctx.cookies.set('x-uid', null);
      await ctx.redirect('/login');
    }
  };
};