

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
      const { userinfo = {} } = ctx.session;
      const path = ctx.request.path;
      // if (!userinfo || !userinfo.token) {
      //   await ctx.redirect('/login');
      //   return;
      // }
      await ctx.renderClient('admin.js', {
        menuList: ctx.session.menuList,
        userinfo: ctx.session.userinfo
      });
    }
  };
};