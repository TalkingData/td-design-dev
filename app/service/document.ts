'use strict';

import { Service } from 'egg';

export default class Document extends Service {
  async findByPara(params) {
    const document = await this.ctx.model.Document.findAll(params);
    if (!document) {
      this.ctx.throw(404, 'document not found');
    }
    return document;
  }

  async find(id) {
    const document = await this.ctx.model.Document.findById(id);
    if (!document) {
      this.ctx.throw(404, 'document not found');
    }
    return document;
  }

  async create(document) {
    return this.ctx.model.Document.create(document);
  }

  // 新增或者更新
  async upsert({ params, updates }) {
    const document = await this.ctx.model.Document.findAll(params);
    if (document.length === 0) {
      return this.ctx.model.Document.create(updates);
    }
    return this.ctx.model.Document.update(
      {
        content : updates.content,
      },
      {
        where : {
          component_id : updates.component_id,
        },
      });
  }
}
