import { Service } from 'egg';

export default class UserService extends Service {

  public async createUser(name: string, password: string, phone: string, email: string) {
    return this.app.knex.insert({ name, password, phone, email }).from('user');
  }

  public async getAllUser() {
    return this.app.knex.select().from('user');
  }

  public async getLoginUser(name: string, password: string) {
    return this.app.knex.select().from('user').where({ name, password });
  }

}
