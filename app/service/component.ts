'use strict';

import { Service } from 'egg';

export default class Component extends Service {
  async index() {
    const component = await this.ctx.model.Component.findAll();
    if (!component) {
      this.ctx.throw(404, 'component not found');
    }
    return component;
  }

  async create(component) {
    return this.ctx.model.Component.create(component);
  }
}
