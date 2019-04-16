'use strict';

import { Service } from 'egg';

export default class Code extends Service {
  async index() {
    return this.ctx.model.Code.findAll();
  }

  async find(id) {
    const code = await this.ctx.model.Code.findById(id);
    if (!code) {
      this.ctx.throw(404, 'code not found');
    }
    return code;
  }

  async findByPara(params) {
    const code = await this.ctx.model.Code.findAll(params);
    return code;
  }

  async create(code) {
    return this.ctx.model.Code.create(code);
  }

}
