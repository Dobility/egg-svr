import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // mysql config
  // @ts-ignore
  config.knex = {
    client: {
      dialect: 'mysql',
      connection: {
        host: '192.168.1.200',
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
  return config;
};
