import { EggAppConfig, PowerPartial } from 'egg';
import { getAbsoluteFSPath } from 'egg-swagger-view';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // enable request from postman, .ect
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // @ts-ignore
  config.static = {
    dir: [
      { dir: getAbsoluteFSPath(), prefix: '/' },
      { dir: './docs', prefix: '/docs' },
    ],
  };
  return config;
};
