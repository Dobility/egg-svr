import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // mysql config
  // @ts-ignore
  config.knex = {
    client: {
      dialect: 'mysql',
      connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '******',
        database: 'user',
      },
      pool: { min: 0, max: 5 },
      acquireConnectionTimeout: 30000,
    },
    app: true,
    agent: false,
  };
  // enable request from postman, .ect
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
