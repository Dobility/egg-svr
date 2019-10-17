import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
