import { Controller } from 'egg';
import { Get, IgnoreJwt, Post } from 'egg-shell-decorators';

export default class UserController extends Controller {

  @Get('/userInfo')
  public async userInfo() {
    return this.ctx.jwtData.data;
  }

  @Post('/userList')
  public async userList() {
    return await this.ctx.service.user.getAllUser();
  }

  @IgnoreJwt
  @Post('/register')
  public async register() {
    const {
      name = '',
      password = '',
      phone = '',
      email = '',
    } = this.ctx.request.params;
    const rule = {
      name: 'string',
      password: 'password',
      phone: 'string',
      email: 'email',
    };
    this.ctx.validate(rule, {
      name, password, phone, email,
    });
    await this.ctx.service.user.createUser(name, password, phone, email);
  }

}
