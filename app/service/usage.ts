'use strict';

import { Service } from 'egg';

export default class Usage extends Service {
  async findByPara(params) {
    const usage = await this.ctx.model.Usage.findAll(params);
    if (!usage) {
      this.ctx.throw(404, 'usage not found');
    }
    return usage;
  }

  async find(id) {
    const usage = await this.ctx.model.Usage.findById(id);
    if (!usage) {
      this.ctx.throw(404, 'usage not found');
    }
    return usage;
  }
  async create(usage) {
    return this.ctx.model.Usage.create(usage);
  }

  // 新增或者更新
  async upsert({ params, updates }) {
    // const usage = await this.ctx.model.Usage.findById(id);
    // if (!usage) {
    //   return this.ctx.model.Usage.create(updates);
    // }
    // return usage.update(updates);
    const usage = await this.ctx.model.Usage.findAll(params);
    if (usage.length === 0) {
      return this.ctx.model.Usage.create(updates);
    }
    return this.ctx.model.Usage.update(
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
