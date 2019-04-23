'use strict';

import { Controller } from 'egg';
// import * as validator from 'validator';

export default class DocumentController extends Controller {
  async show() {
    const { ctx } = this;
    const document = await ctx.service.document.findByPara({
      where: {
        component_id: ctx.params.id,
      },
    });
    ctx.body = {
      status: 1,
      data: document,
    };
  }

  // 新增或者更新
  async update() {
    const { ctx } = this;
    const component_id = ctx.params.id;
    const content = ctx.request.body.content || '';
    const document = await ctx.service.document.upsert({
      params: {
        where: {
          component_id,
        },
      },
      updates: { component_id, content },
    });
    ctx.body = {
      status: 1,
      data: document,
    };
  }
}
