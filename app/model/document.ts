'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Document = app.model.define(
    'document',
    {
      id: { type: INTEGER, primaryKey: true },
      content: STRING,
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
