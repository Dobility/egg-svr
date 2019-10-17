import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';
import jwt from '../app/middleware/jwt';

export default (app: Application) => {
  EggShell(app, {
    prefix: '/',
    quickStart: true,
    jwtValidation: jwt,
  });
};
