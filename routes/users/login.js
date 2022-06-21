/**
 * 登录接口
 */
const router = require('koa-router')();
const User = require('../../models/userSchema');
const util = require('../../utils/util');
const jwt = require('jsonwebtoken');
const appletServer = require('../../utils/appletServer');
const { to } = require('await-to-js');
const { CODE } = require('../../utils/util');

router.post('/app/login', async (ctx) => {
  try {
    const { code } = ctx.request.body;
    const [err, openid] = await to(appletServer.getAppletOpenId(code));
    if (err) {
      ctx.body = util.fail(err, '小程序登录错误', CODE.USER_LOGIN_ERROR);
    }
    const res = await User.findOneAndUpdate({ openid }, { openid, loginDate: Date.now() }, { upsert: true, new: true });
    const token = jwt.sign({ ...res?._doc }, 'cdxs', { expiresIn: '24h' });
    if (res) {
      ctx.body = util.success({ token, userInfo: res }, '登录成功');
    } else {
      ctx.body = util.fail('', '登录失败', CODE.USER_LOGIN_ERROR);
    }
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
