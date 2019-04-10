import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/login', controller.sign.signIn);
  router.resources('user', '/api/user', controller.user);
};
