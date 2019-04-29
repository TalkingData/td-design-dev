'use strict';

import { Service } from 'egg';

export default class User extends Service {
  async index() {
    return this.ctx.model.User.findAndCountAll({
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(token) {
    const user = await this.ctx.model.User.findOne({
      where : {
        pass : token,
      },
    });
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async findByPara(params) {
    const user = await this.ctx.model.User.findAll(params);
    return user;
  }

  async create(user) {
    return this.ctx.model.User.create(user);
  }
  async check(self) {
    if (!self.user) {
      const token = self.request.body.token;
      if (token) {
        const auth = await this.ctx.model.Auth.findOne({
          where : {
            token : token,
          },
        });
        if (auth) {
          const user = await this.ctx.model.User.findOne({
            where : {
              id : auth.user_id,
            },
          })
          if (user) {
            self.user = user;
          } else {
            self.user = null;
          }
        }else {
          self.user = null;

        }

      } else {
        self.user = null;
      }
    } else {
      return self.user;
    }
    return self.user;
  }

  // async update({ id, updates }) {
  //   const user = await this.ctx.model.User.findById(id);
  //   if (!user) {
  //     this.ctx.throw(404, 'user not found');
  //   }
  //   return user.update(updates);
  // }

  // async del(id) {
  //   const user = await this.ctx.model.User.findById(id);
  //   if (!user) {
  //     this.ctx.throw(404, 'user not found');
  //   }
  //   return user.destroy();
  // }
}
