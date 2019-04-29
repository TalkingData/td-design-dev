'use strict';
// 注册、登录、退出登录

import { Controller } from 'egg';

export default class AutoController extends Controller {
  async findUserId() {
    const { ctx } = this;
    const userId = await ctx.service.auth.findUserId(ctx.request.body.token);
    return userId;
  }
}
