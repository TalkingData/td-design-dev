'use strict';
// @ts-ignore
export default (options, app) => async (ctx, next) => {
  const { adminRouter, authSalt } = app.config;
  if (adminRouter.includes(ctx.request.path)) {
    try {
      console.log(ctx.Model, '----ctx.header.authorization')
      const { user, token } = JSON.parse(ctx.header.authorization);
      const hash = await ctx.helper.scryptHash(user, new Buffer(authSalt));
      if (hash !== token) {
        ctx.body = {
          status: 0,
          message: '请先登录再进行访问！',
        };
        return;
      }
    } catch (e) {
      console.log(e);
      ctx.body = {
        status: 0,
        message: '请先登录再进行访问2！',
      };
      return;
    }
  }
  await next();
};
