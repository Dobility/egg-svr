import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571108310250_3357';

  // add your egg config in here
  config.middleware = [ 'logger', 'response' ];

  // error
  config.onerror = {
    all(err, ctx) {
      ctx.type = 'json';
      ctx.body = JSON.stringify({
        status: ctx.status,
        success: false,
        message: err.message || ctx.statusText || '',
      });
    },
  };

  // jwt
  config.jwt = {
    secret: '123456',
  };

  // the return config will combines to EggAppConfig
  return config;
};
