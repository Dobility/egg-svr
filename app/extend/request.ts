export default {
  // 获取所有参数
  get params() {
    // @ts-ignore
    return { ...this.query, ...this.body };
  },
  /**
   * 获取格式化后的参数
   * @param field 字段名
   * @param defaultValue 默认值
   * @param formatter 格式化函数，例如 Number, Date, moment 等
   */
  getParam(field: string, defaultValue?: any, formatter?) {
    const data = this.params[field];
    if (data !== undefined) {
      return formatter ? formatter(data) : data;
    }
    return defaultValue !== undefined ? defaultValue : null;
  },
};
