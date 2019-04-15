'use strict';

import { Snowflake } from 'node-snowflake';

module.exports = app => {
  const { STRING, BIGINT, DATE } = app.Sequelize;

  const Component = app.model.define(
    'component',
    {
      id: { type: BIGINT, primaryKey: true, unique: true, defaultValue: Snowflake.nextId },
      label: STRING,
      text: STRING,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      tableName: 'component',
    },
  );

  // 同步:没有就新建,有就不变
  Component.sync();
  // 先删除后同步
  // User.sync({
  //   force: true,
  // });

  return Component;
};
