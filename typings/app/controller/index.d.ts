// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComponent from '../../../app/controller/component';
import ExportDocument from '../../../app/controller/document';
import ExportHome from '../../../app/controller/home';
import ExportSign from '../../../app/controller/sign';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    component: ExportComponent;
    document: ExportDocument;
    home: ExportHome;
    sign: ExportSign;
    user: ExportUser;
  }
}
