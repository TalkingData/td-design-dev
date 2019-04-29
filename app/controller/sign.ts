'use strict';
// 注册、登录、退出登录

import { Controller } from 'egg';
import * as validator from 'validator';

export default class SignController extends Controller {
  // 储存auth
  async storeAuth(info) {
    const isStore = await this.ctx.service.auth.findUserId(info.token);
    console.log(isStore, '----isStore')
    if (!isStore) {
      await this.ctx.service.auth.create(info);
    }
  }
  // 登录
  async signIn() {
    const { ctx, app } = this;
    const { name, pass } = ctx.request.body;
    let existUsers;
    if (validator.isEmail(name)) {
      existUsers = await ctx.service.user.findByPara({
        where: {
          email: name,
        },
      });
    } else {
      existUsers = await ctx.service.user.findByPara({
        where: {
          name,
        },
      });
    }
    if (existUsers.length === 0) {
      ctx.body = {
        status: 0,
        message: '用户不存在',
      };
      return;
    }
    const existUser = existUsers[0];
    const passVerify = await ctx.helper.scryptVerify(pass, existUser.pass);
    if (passVerify) {
      const token = await ctx.helper.scryptHash(name, new Buffer(app.config.authSalt));
      await this.storeAuth({
        token : token,
        user_id : existUser.id,
      })
      ctx.body = {
        status: 1,
        data: {
          Authorization: JSON.stringify({
            user: name,
            token,
          }),
        },
      };
    } else {
      ctx.body = {
        status: 0,
        message: '用户名或密码不正确',
      };
    }
  }

  // 登出
  async signOut() {}
}
