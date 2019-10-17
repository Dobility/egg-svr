import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // enable request from postman, .ect
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
