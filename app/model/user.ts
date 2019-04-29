'use strict';
import { Snowflake } from 'node-snowflake';
module.exports = app => {
  const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        unique: true,
        defaultValue: Snowflake.nextId,
      },
      name: STRING(30),
      email: STRING(30),
      pass: STRING,
      // status 1=>普通用户 2=>超级管理员
      status: { type: INTEGER, defaultValue: 1 },
      // active: BOOLEAN,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      tableName: 'user',
    },
  );

  // 同步:没有就新建,有就不变
  User.sync();
  // 先删除后同步
  // User.sync({
  //   force: true,
  // });

  return User;
};
