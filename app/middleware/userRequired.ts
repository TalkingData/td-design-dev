'use strict';
// @ts-ignore
export default (options, app) => {
  /*
   * 需要登录
   */
  return async (ctx, next) => {
    const publicApis = app.config.whiteRouter;
    if (
      !publicApis.includes(ctx.request.path) &&
      !ctx.isAuthenticated() &&
      !ctx.user
    ) {
      const res = {
        status: 401,
        errorMessage: '请先登录再进行访问！',
      };
      ctx.status = 401;
      ctx.body = res;
      return;
    }
    await next();
  };
};
