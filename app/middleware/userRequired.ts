'use strict';
// @ts-ignore
export default (options, app) => async (ctx, next) => {
  const { adminRouter } = app.config;
  if (adminRouter.includes(ctx.request.path)) {
    ctx.body = {
      status: 0,
      message: '请先登录再进行访问！',
    };
    return;
  }
  await next();
};
