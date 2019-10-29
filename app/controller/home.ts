import { Controller } from 'egg';
import { Description, Get, IgnoreJwtAll, Parameters, Post } from 'egg-shell-decorators';

@IgnoreJwtAll
export default class HomeController extends Controller {

  @Get('/')
  @Description('首页')
  public async index() {
    return 'hello';
  }

  @Post('/login')
  @Description('登录')
  @Parameters([{ name: 'body', type: 'object', in: 'body', schema: { $ref: 'login' } }])
  public async login() {
    const {
      name = '',
      password = '',
    } = this.ctx.request.params;
    const user = await this.ctx.service.user.getLoginUser(name, password);
    if (user) {
      const token = this.app.setToken(user);
      return {
        user,
        token,
      };
    }
    return false;
  }

}
