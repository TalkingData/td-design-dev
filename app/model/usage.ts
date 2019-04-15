'use strict';

module.exports = app => {
  const { STRING, DATE, BIGINT } = app.Sequelize;

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
      content: STRING,
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
