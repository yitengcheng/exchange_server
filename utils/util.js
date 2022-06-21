/**
 * 通用工具函数
 */
const log4js = require('./log4');
const _ = require('lodash');

const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 101, // 参数错误
  USER_ACCOUNT_ERROR: 201, // 账号或密码错误
  USER_LOGIN_ERROR: 301, // 用户未登录
  BUSINESS_ERROR: 501, // 业务请求失败
  AUTH_ERROR: 401, // 认证失败或TOKEN过期
};

module.exports = {
  /**
   *
   * @param {number} pageNum
   * @param {number} pageSize
   * @returns
   */
  pager({ pageNum = 1, pageSize = 10 }) {
    pageNum *= 1;
    pageSize *= 1;
    const skipIndex = (pageNum - 1) * pageSize;
    return {
      page: {
        pageSize,
        pageNum,
      },
      skipIndex,
    };
  },
  success(data = '', msg = '', code = CODE.SUCCESS) {
    log4js.debug(data);
    return {
      code,
      msg,
      data,
    };
  },
  fail(stack, msg = '访问失败，请联系开发商', code = CODE.BUSINESS_ERROR) {
    log4js.debug(stack);
    return {
      code,
      msg,
    };
  },
  // 模糊查询
  fuzzyQuery(fields, keyword) {
    const reg = new RegExp(keyword, 'i');
    let query = [];
    fields.forEach((element) => {
      query.push({ [element]: { $regex: reg } });
    });
    return { $or: query };
  },
  // 劵码生成
  couponCreate() {
    let code = '';
    for (let index = 0; index < 10; index++) {
      if (index === 0) {
        code += `${_.random(1, 9)}`;
      } else {
        code += `${_.random(0, 9)}`;
      }
    }
    return code;
  },
  CODE,
};
