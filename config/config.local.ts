import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // mongo config
  const db = {
    host: '127.0.0.1',
    port: '27017',
    user: 'root',
    password: '******',
    database: 'user',
  };
  config.mongoose = {
    client: {
      url: `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}?authSource=admin`,
      options: {},
    },
  };
  // enable request from postman, .ect
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
