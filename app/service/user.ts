import { Service } from 'egg';

export default class UserService extends Service {

  public async createUser(name: string, password: string, phone: string, email: string) {
    return {
      name, password, phone, email,
    };
  }

  public async getAllUser() {
    return [{
      name: 'user1', phone: '123', email: '1@1.cn',
    }];
  }

  public async getLoginUser(name: string, password: string) {
    return [{
      name: 'user1', password: '123456', phone: '123', email: '1@1.cn',
    }].find(user => user.name === name && user.password === password);
  }

}
