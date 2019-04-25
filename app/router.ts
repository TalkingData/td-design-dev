import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/login', controller.sign.signIn);
  router.resources('user', '/api/user', controller.user);
  // 组件
  router.post('/api/component/create', controller.component.create);
  router.post('/api/component', controller.component.index);
  router.post('/api/component/get', controller.component.show);
  // 文档
  router.post('/api/document/show', controller.document.show);
  router.post('/api/document/update', controller.document.update);
  router.resources('usage', '/api/usage', controller.usage);
  router.resources('code', '/api/code', controller.code);
  // router.get('/api/document', controller.document.index);
  // router.post('/api/document/:id', controller.document.upsert);
};
