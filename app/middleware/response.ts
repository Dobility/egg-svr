import { Context } from 'egg';

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ status: 0, msg: any, data: any }
export default () => {
  return async function response(ctx: Context, next) {
    await next();
    if (ctx.status === 200 && ctx.body) {
      ctx.body = {
        status: ctx.status,
        success: ctx.body.success,
        data: ctx.body.data,
      };
    } else {
      ctx.type = 'json';
      const status = ctx.status;
      ctx.body = {
        status: ctx.status,
        success: false,
        message: ctx.statusText,
      };
      // 保证http头的状态码不会因为返回了body而自动变成200
      ctx.status = status;
    }
  };
};
