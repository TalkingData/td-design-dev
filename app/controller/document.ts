'use strict';

import { Controller } from 'egg';
// import * as validator from 'validator';

export default class DocumentController extends Controller {
  async show() {
    const { ctx } = this;
    const id = ctx.request.body.id;
    if (!id) {
      ctx.body = {
        status: 0,
        msg: '请传递对应的ID!',
      };
      return;
    }
    const document = await ctx.service.document.findByPara({
      where: {
        component_id: ctx.request.body.id,
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
    const component_id = ctx.request.body.id;
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
