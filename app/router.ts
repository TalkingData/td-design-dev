import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/login', controller.sign.signIn);
  router.resources('user', '/api/user', controller.user);
  router.resources('document', '/api/document', controller.document);
  // router.get('/api/document', controller.document.index);
  // router.post('/api/document/:id', controller.document.upsert);
};
