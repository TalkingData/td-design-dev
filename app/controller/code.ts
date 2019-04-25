'use strict';

import { Controller } from 'egg';

export default class DocumentController extends Controller {

  /**
   * 列出所有的code段
   */
  async index() {
    const { ctx } = this;
    const code = await ctx.service.code.index();
    ctx.body = {
      status: 1,
      data: code,
    };
  }
  /**
   * 注意这里的ID是关联的组件ID而不是代码段的ID
   */
  async show() {
    const { ctx } = this;
    const code = await ctx.service.code.findByPara({
      where: {
        component_id: ctx.request.body.id,
      },
    });
    ctx.body = {
      status: 1,
      data: code,
    };
  }

  /**
   * 新增
   */
  async create() {
    const { ctx } = this;
    const { component_id, title, desc, content } = ctx.request.body;
    if (!component_id) {
        ctx.body = {
          status : 0,
          msg : '请确认组件id的正确性',
        };
    } else {
      const code = await ctx.service.code.create({
        component_id, title, desc, content,
      });
      ctx.body = {
        status: 1,
        data: code,
      };
    }

  }
  /**
   * 编辑
   */
  async update() {
    const { ctx } = this;
    const { code_id, component_id, title, desc, content } = ctx.request.body;
    const code = await ctx.service.code.update({
      code_id, component_id, title, desc, content,
    });
    ctx.body = {
      status: 1,
      data: code,
    };
  }
}
