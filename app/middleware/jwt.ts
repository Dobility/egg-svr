import jwt from 'jsonwebtoken';
import { StatusError } from 'egg-shell-decorators';

export default () => async (ctx, next) => {
  const token = ctx.request.headers.authorization;
  try {
    if (token) {
      ctx.jwtData = jwt.verify(token.slice(7), ctx.app.config.jwt.secret);
    } else {
      throw new StatusError('token required', 401);
    }
  } catch (e) {
    throw new StatusError(e.message, 401);
  }
  await next();
};
