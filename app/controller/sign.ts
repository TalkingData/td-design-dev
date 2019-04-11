'use strict';
// 注册、登录、退出登录

import { Controller } from 'egg';
import * as validator from 'validator';

export default class SignController extends Controller {
  // 登录
  async signIn() {
    const { ctx } = this;
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
    if (!existUsers) {
      ctx.body = {
        status: 0,
        message: '用户不存在',
      };
      return;
    }
    const existUser = existUsers[0];
    console.log('--------------start-------------');
    console.log(pass, existUser.pass);
    console.log('--------------end-------------');

    const passVerify = await ctx.helper.scryptVerify(pass, existUser.pass);
    if (passVerify) {
      const token = await ctx.helper.scryptEncryption(name);
      ctx.body = {
        status: 1,
        data: { token },
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