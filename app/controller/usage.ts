'use strict';

import { Controller } from 'egg';
// import * as validator from 'validator';

export default class UsageController extends Controller {
  async show() {
    const { ctx } = this;
    const usage = await ctx.service.usage.findByPara({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.body = {
      status: 1,
      data: usage,
    };
  }

  // 新增或者更新
  async update() {
    const { ctx } = this;
    const component_id = ctx.params.id;
    const content = ctx.request.body.content || '';
    const usage = await ctx.service.usage.upsert({
      params: {
        where: {
          component_id,
        },
      },
      updates: { component_id, content },
    });
    ctx.body = {
      status: 1,
      data: usage,
    };
  }
}
