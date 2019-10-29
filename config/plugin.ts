import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  swaggerUi: {
    enable: true,
    package: 'egg-swagger-view',
  },
};

export default plugin;
