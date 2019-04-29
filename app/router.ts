import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/login', controller.sign.signIn);
  router.post('/api/user/register', controller.user.create);
  // 鉴权
  router.post('/api/user/auth', controller.auth.findUserId);
  // 获取用户信息
  router.post('/api/user/get', controller.user.show);
  // 组件
  router.post('/api/component/create', controller.component.create);
  router.post('/api/component', controller.component.index);
  router.post('/api/component/get', controller.component.show);
  // 文档
  router.post('/api/document/get', controller.document.show);
  router.post('/api/document/update', controller.document.update);
  // 用例
  router.post('/api/usage/get', controller.usage.show);
  router.post('/api/usage/update', controller.usage.update);
  // 运行
  router.post('/api/code/get', controller.code.show);
  router.post('/api/code/create', controller.code.create);
  router.post('/api/code/update', controller.code.update);
  // router.resources('code', '/api/code', controller.code);
  // router.get('/api/document', controller.document.index);
  // router.post('/api/document/:id', controller.document.upsert);
};
