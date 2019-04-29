'use strict';
import { Snowflake } from 'node-snowflake';
module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;

  const Auth = app.model.define(
    'auth',
    {
      id : {
        type: BIGINT,
        primaryKey: true,
        unique: true,
        defaultValue: Snowflake.nextId,
      },
      user_id: {
        type : STRING,
      },
      token: STRING,
    },
    {
      tableName: 'auth',
    },
  );

  Auth.sync();
  return Auth;
};
