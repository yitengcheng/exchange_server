/**
 * 小程序后端函数
 */

const { default: axios } = require("axios");
const config = require("../config");

module.exports = {
  getAppletOpenId(code) {
    return new Promise(async (resolve, reject) => {
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${code}&grant_type=authorization_code`;
      const response = await axios.get(url);
      const { openid, errcode, errmsg } = response.data;
      if (!errcode) {
        resolve(openid);
      } else {
        reject({ errcode, errmsg });
      }
    });
  },
  getAccessToken() {
    return new Promise(async (resolve, reject) => {
      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`;
      const response = await axios.get(url);
      const { access_token, errcode, errmsg } = response.data;
      if (errcode === 0) {
        resolve(access_token);
      } else {
        reject({ errcode, errmsg });
      }
    });
  },
};
