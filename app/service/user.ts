import { Service } from 'egg';

export default class UserService extends Service {

  public async createUser(name: string, password: string, phone: string, email: string) {
    return this.ctx.model.User.insertMany({
      name, password, phone, email,
    });
  }

  public async getAllUser() {
    return this.ctx.model.User.find();
  }

  public async getLoginUser(name: string, password: string) {
    return this.ctx.model.User.findOne({ name, password });
  }

}
