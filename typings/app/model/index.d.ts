// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDocument from '../../../app/model/document';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Document: ReturnType<typeof ExportDocument>;
    User: ReturnType<typeof ExportUser>;
  }
}
