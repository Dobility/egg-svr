export default {
  /**
   * 生成 token
   * @param data 要绑定保存的数据
   * @param expHour 过期小时
   */
  setToken(data: any, expHour?: number) {
    const exp = expHour === undefined ? 1 : expHour;
    // @ts-ignore
    return this.jwt.sign({
      data,
      exp: Math.floor(Date.now() / 1000) + exp * 3600,
      // @ts-ignore
    }, this.config.jwt.secret);
  },
};
