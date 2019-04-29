'use strict';

import { Service } from 'egg';

export default class Auth extends Service {
  async findUserId(token) {
    return await this.ctx.model.Auth.findOne({
      where : { token : token },
    });
  }
  async create(info) {
    console.log(info, '-----info')
    return this.ctx.model.Auth.create({
      ...info
    });
  }
}
