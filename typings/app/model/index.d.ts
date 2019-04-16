// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCode from '../../../app/model/code';
import ExportComponent from '../../../app/model/component';
import ExportDocument from '../../../app/model/document';
import ExportUsage from '../../../app/model/usage';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Code: ReturnType<typeof ExportCode>;
    Component: ReturnType<typeof ExportComponent>;
    Document: ReturnType<typeof ExportDocument>;
    Usage: ReturnType<typeof ExportUsage>;
    User: ReturnType<typeof ExportUser>;
  }
}
