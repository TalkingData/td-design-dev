import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/login', controller.sign.signIn);
  router.resources('user', '/api/user', controller.user);
  router.resources('component', '/api/component', controller.component);
  router.resources('document', '/api/document', controller.document);
  router.resources('usage', '/api/usage', controller.usage);
  router.resources('code', '/api/code', controller.code);
  // router.get('/api/document', controller.document.index);
  // router.post('/api/document/:id', controller.document.upsert);
};
