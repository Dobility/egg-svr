import { Context } from 'egg';

export default () => {
  return async function logger(ctx: Context, next) {
    const s = JSON.stringify;
    let log = `request: { query: ${s(ctx.request.query || {})}, body: ${s(ctx.request.body || {})} }`;
    ctx.logger.info(log);
    await next();
    log = `${ctx.status} response: ${s(ctx.body)}`;
    ctx.logger.info(log);
  };
};
