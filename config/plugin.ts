import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  knex: {
    enable: true,
    package: 'egg-knex',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
