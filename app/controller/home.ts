import { Controller } from 'egg';
import { Get, IgnoreJwtAll } from 'egg-shell-decorators';

@IgnoreJwtAll
export default class HomeController extends Controller {

  @Get('/')
  public async index() {
    return 'hello';
  }

  @Get('/login')
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
