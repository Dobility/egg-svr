# egg.js server framework

egg.js + typescript + egg-shell-decorators + egg-jwt + mongodb/mongoose 构成的无视图层的纯服务端框架。

本框架使用更适合服务端开发的 typescript，同时也遇到和解决了一些问题。



## Branches

```
  master    # 基本框架
  mysql     # master + mysql
* mongo     # master + mongo
```



## 框架搭建过程

### egg 脚手架生成

可直接参考 <https://eggjs.org/zh-cn/tutorials/typescript.html> 的搭建过程

### jwt 引入

token 身份验证是比较流行的做法，使用的是 [egg-jwt](https://github.com/okoala/egg-jwt)，配置和使用直接参考<https://github.com/okoala/egg-jwt>

### node 装饰器

使用装饰器可以大大提高开发效率，如果有过 Java 开发会觉得很熟悉。这里使用的是 [egg-shell-decorators](https://super2god.github.io/egg-shell-decorators/#/)，配置和使用可以直接参考 <https://super2god.github.io/egg-shell-decorators/#/>。使用它可以直接在 controller 就声明了 router，非常方便。

### 参数验证

有时候，我们需要对请求的参数进行有效性验证，例如用户信息注册。可以使用 [egg-validate](https://github.com/eggjs/egg-validate) 工具，配置过程可直接参考 <https://github.com/eggjs/egg-validate>。

### mongodb

这个分支中，使用了数据库 mongodb，如果项目要跑起来的话，需要参考 config/config.{env}.ts 去配置数据库。这里使用了 [egg-mongoose](https://github.com/eggjs/egg-mongoose)，配置和使用参考 <https://github.com/eggjs/egg-mongoose>。



## 细节处理

### 允许 postman 等测试工具访问

在开发时，由于前后端分离，所以服务端的自测经常使用 postman 或类似的工具进行模拟请求，然而使用 post 请求时会发现报 `invalid csrf token`，需要在 config 中关掉 csrf 检查：

```ts
// config/config.local.ts
config.security = {
  csrf: {
    enable: false,
  },
};
```

### 丰富日志输出内容

对于每次请求，egg-logger 都没有打印日志，为了方便对接和检查，可以加上打印请求日志：

```ts
// app/middleware/logger.ts
export default () => {
  return async function logger(ctx: Context, next) {
    // 打印请求内容
    await next();
    // 打印响应内容
  };
};

// config/config.default.ts
config.middleware = ['logger'];
```

### REST-ful 处理

对于前后端分离的服务端可以采用 REST-ful，简单来说就是响应前端异步请求返回json，因此需要对响应和出错都进行包装：

```ts
// app/middleware/response.ts
export default () => {
  return async function response(ctx: Context, next) {
    await next();
    if (ctx.status === 200 && ctx.body) {
      // 响应正常请求
      ctx.body = {
        status: ctx.status,
        success: ctx.body.success || true,
        data: ctx.body.data || {},
      };
    } else {
      // 响应异常请求
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

// config/config.default.ts
config.middleware = ['response'];
// 出错处理
config.onerror = {
  all(err, ctx) {
    ctx.type = 'json';
    ctx.body = JSON.stringify({
      status: ctx.status,
      success: false,
      message: err.message || ctx.statusText || '',
    });
  },
};
```



## 填坑

### 没有发挥检查 token 的作用

> 如果你使用了 `egg-jwt`，那默认所以路由都需要进行身份校验
> 原文链接：<https://super2god.github.io/egg-shell-decorators/#/?id=jwt>

按文档说，引入 egg-jwt 后，会自动验证 token，除非加上 @IgnoreJwt 或 @IgnoreJwtAll。但实际运行时，发现所有路由都不会进行 token 检查。通过 debug 发现，在 egg-shell-decorators/index.js 中有这样几行：

```js
178: if (!ignoreJwt && !ignoreJwtAll && jwt && options.jwtValidation) {
179:   await options.jwtValidation()(ctx, next);
180: }
```

可以看到有个 `options.jwtValidation`，在 debug 时发现它始终为 undefined，所以所有路由都不会进行验证。因此，解决方法就是自己挂上这个方法。在使用过程中，发现 egg-jwt 的 verify 不能直接用，所以还是用最原始的 `jsonwebtoken`：

```ts
// 安装 jsonwebtoken
$ npm i jsonwebtoken -S
$ npm i @types/jsonwebtoken -D

// app/middleware/jwt.ts
export default () => async (ctx, next) => {
  // 使用 jsonwebtoken 的 verfiy 检查 token
  await next();
};

// app/router.ts
import jwt from '../app/middleware/jwt';
export default (app: Application) => {
  EggShell(app, {
    prefix: '/',
    quickStart: true,
    jwtValidation: jwt,		// 这里加上
  });
};
```

