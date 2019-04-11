'use strict';

import { Service } from 'egg';

export default class Document extends Service {
  async findByPara(params) {
    const user = await this.ctx.model.User.findAll(params);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(document) {
    return this.ctx.model.Document.create(document);
  }

  // 新增或者更新
  async upsert({ id, updates }) {
    const document = await this.ctx.model.Document.findById(id);
    if (!document) {
      this.ctx.model.Document.create(updates);
    }
    return document.update(updates);
  }
}
