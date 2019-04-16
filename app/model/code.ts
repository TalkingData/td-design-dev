'use strict';

import { Snowflake } from 'node-snowflake';

module.exports = app => {
  const { TEXT, STRING, DATE, BIGINT } = app.Sequelize;

  const Code = app.model.define(
    'code',
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        unique: true,
        defaultValue: Snowflake.nextId,
      },
      component_id: {
        type: BIGINT,
        primaryKey: true,
        unique: true,
        references: {
          model: 'component',
          key: 'id',
        },
      },
      title: STRING,
      desc: TEXT,
      content: TEXT,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      tableName: 'code',
    },
  );

  Code.sync();
  return Code;
};
