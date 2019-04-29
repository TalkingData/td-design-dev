'use strict';

import { Controller } from 'egg';
import * as validator from 'validator';

export default class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.index();
  }

  async show() {
    const user = await this.ctx.service.user.check(this.ctx);
    if (user) {
      this.ctx.body = {
        status: 1,
        data: user,
      };
    } else {
      this.ctx.body = {
        status: 0,
        message: '暂无此用户',
      };
    }
  }

  async create() {
    const { ctx, service } = this;

    const name = validator.trim(ctx.request.body.name || '').toLowerCase();
    const email = validator.trim(ctx.request.body.email || '').toLowerCase();
    const pass = validator.trim(ctx.request.body.pass || '');
    const rePass = validator.trim(ctx.request.body.rePass || '');

    let msg;
    if ([ name, email, pass, rePass ].some(item => item === '')) {
      msg = '信息不完整';
    } else if (name.length < 5) {
      msg = '用户名不能少于5个字符';
    } else if (!ctx.helper.validateId(name)) {
      msg = '用户名不合法';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法';
    } else if (pass !== rePass) {
      msg = '两次输入密码不一致';
    }
    if (msg) {
      ctx.body = {
        status: 0,
        message: msg,
      };
      return;
    }
    const { Op } = this.app.Sequelize;
    const users = await service.user.findByPara({
      where: {
        [Op.or]: [{ name }, { email }],
      },
    });
    if (users.length > 0) {
      ctx.body = {
        status: 0,
        message: '用户名或邮箱已被使用。',
      };
      return;
    }
    const passEncryption = await ctx.helper.scryptEncryption(pass);

    const user = await ctx.service.user.create({
      name,
      email,
      pass: passEncryption,
    });
    ctx.status = 200;
    ctx.body = {
      status: 1,
      data: user,
    };
  }

  // async update() {
  //   const ctx = this.ctx;
  //   const id = ctx.helper.parseInt(ctx.params.id);
  //   const body = ctx.request.body;
  //   ctx.body = await ctx.service.user.update({ id, updates: body });
  // }

  // async destroy() {
  //   const ctx = this.ctx;
  //   const id = ctx.helper.parseInt(ctx.params.id);
  //   await ctx.service.user.del(id);
  //   ctx.status = 200;
  // }
}
