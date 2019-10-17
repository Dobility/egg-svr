// tslint:disable-next-line:no-var-requires
const httpStatus = require('http-status');

export default {
  // 获取状态码对应解释
  get statusText() {
    // @ts-ignore
    return httpStatus[this.status];
  },
};
