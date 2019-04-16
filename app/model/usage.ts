'use strict';

module.exports = app => {
  const { TEXT, DATE, BIGINT } = app.Sequelize;

  const Usage = app.model.define(
    'usage',
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        unique: true,
        references: {
          model: 'component',
          key: 'id',
        },
      },
      content: TEXT,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      tableName: 'usage',
    },
  );

  Usage.sync();
  return Usage;
};
