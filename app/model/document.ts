'use strict';

import { Snowflake } from 'node-snowflake';

module.exports = app => {
  const { TEXT, DATE, BIGINT } = app.Sequelize;

  const Document = app.model.define(
    'document',
    {
      // id: { type: INTEGER, },
      // id: {
      //   type: BIGINT,
      //   primaryKey: true,
      //   unique: true,
      //   references: {
      //     model: 'component',
      //     key: 'id',
      //   },
      // },
      id: {
        type: BIGINT,
        primaryKey: true,
        unique: true,
        defaultValue: Snowflake.nextId,
      },
      component_id: {
        type: BIGINT,
      },
      content: TEXT,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      tableName: 'document',
    },
  );

  // 同步:没有就新建,有就不变
  Document.sync();
  // 先删除后同步
  // User.sync({
  //   force: true,
  // });

  return Document;
};
