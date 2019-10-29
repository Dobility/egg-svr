import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';
import jwt from '../app/middleware/jwt';

export default (app: Application) => {
  EggShell(app, {
    prefix: '/',
    quickStart: true,
    jwtValidation: jwt,
    swaggerOpt: {
      open: true,
      title: '接口文档',
      version: '1.0.0',
      host: '127.0.0.1',
      // @ts-ignore
      port: app.options.port || app.config.cluster.listen.port,
      schemes: [ 'http' ],
      paths: {
        outPath: app.config.swaggerUi.swaggerPath,
        definitionPath: './app/schema',
      },
      tokenOpt: {
        default: 'user',
        tokens: {
          user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ1c2VyMSIsInBhc3N3b3JkIjoiMTIzNDU2IiwicGhvbmUiOiIxMjMiLCJlbWFpbCI6IjFAMS5jbiJ9LCJleHAiOjE1NzIzMzk4NjQsImlhdCI6MTU3MjMzNjI2NH0.YBprvIicvr4GnIg6LsR6EgyuDPpDWZd0Ny-0j8q7WjU',
        },
      },
    },
  });
};
