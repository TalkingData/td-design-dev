'use strict';

import { Controller } from 'egg';
// import * as validator from 'validator';

export default class ComponentController extends Controller {
  /**
   * 列出所有组件
   */
  async index() {
    const { ctx } = this;
    const component = await ctx.service.component.index();
    ctx.body = {
      status: 1,
      data: component,
    };
  }

  /**
   * 根据组件ID查询组件所有信息：文档、用法、代码
   */
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data: any = {};
    data.document = await ctx.service.document.findByPara({ where: { id, }, });
    data.usage = await ctx.service.usage.findByPara({ where: { id, }, });
    data.code = await ctx.service.code.findByPara({ where: { component_id: id, }, });
    ctx.body = {
      status: 1,
      data,
    };
  }

  /**
   * 创建组件
   */
  async create() {
    const { ctx } = this;
    const label = ctx.request.body.label || '';
    const text = ctx.request.body.text || '';
    const userInfo = await ctx.service.user.check(ctx);
    if (!userInfo || userInfo && userInfo.status !== 2) {
      ctx.body = {
        status: 0,
        data: '你没有创建权限',
      };
      return;
    }
    const component = await ctx.service.component.create({
      label,
      text,
    });
    ctx.body = {
      status: 1,
      data: component,
    };
  }
}
