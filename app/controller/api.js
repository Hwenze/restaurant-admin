
module.exports = app => {
  return class ApiController extends app.Controller {
    async login() {
      const { ctx } = this;
      const { username = null, password = null } = ctx.request.body;
      const result = await ctx.service.user.fetch('post', '/login', { username, password });
      if (result && result.code === 200 && result.data && result.data.userinfo) {
        ctx.session.userinfo = result.data.userinfo;
        ctx.session.menuList = result.data.menuList;
        ctx.cookies.set('x-uid', result.data.userinfo.username);
        ctx.body = {
          code: 200,
          msg: result.msg,
          data: result.data.userinfo.token
        };
      } else {
        ctx.body = {
          code: 500,
          msg: result.msg || '登陆失败',
        }
      }
    }
  }
}