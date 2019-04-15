// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportComponent from '../../../app/service/component';
import ExportDocument from '../../../app/service/document';
import ExportUsage from '../../../app/service/usage';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    component: ExportComponent;
    document: ExportDocument;
    usage: ExportUsage;
    user: ExportUser;
  }
}
