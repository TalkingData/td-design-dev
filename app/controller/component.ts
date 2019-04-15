'use strict';

import { Controller } from 'egg';
// import * as validator from 'validator';

export default class ComponentController extends Controller {
  async index() {
    const { ctx } = this;
    const component = await ctx.service.component.index();
    ctx.body = {
      status: 1,
      data: component,
    };
  }

  // 创建
  async create() {
    const { ctx } = this;
    const label = ctx.request.body.label || '';
    const text = ctx.request.body.text || '';
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
