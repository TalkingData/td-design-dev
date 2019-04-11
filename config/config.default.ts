import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.security = {
    csrf: {
      enable: false,
    },
  };
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554189200015_2950';

  // add your egg config in here
  config.middleware = [ 'userRequired' ];
  config.adminRouter = [ '/api/user' ];
  // config.adminRouter = [ '/api/document' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  config.cors = {
    origin: ctx => ctx.get('origin'),
    // origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  config.authSalt = 'KOG&';

  // // 添加mysql的配置
  // config.mysql = {
  //   client: {
  //     host: '127.0.0.1',
  //     port: '3306',
  //     user: 'root',
  //     password: 'cqmyg323',
  //     database: 'test',
  //   },
  //   // 是否加载到app上
  //   app: true,
  //   // 是否加载到agent上
  //   agent: false,
  // };

  // 使用sequelize管理数据层代码
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    username: 'root',
    password: 'cqmyg323',
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
