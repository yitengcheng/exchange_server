/**
 * 获取小程序跳转链接接口
 */
const router = require('koa-router')();
const util = require('../../utils/util');
const { getAccessToken } = require('../../utils/appletServer');
const { default: axios } = require('axios');

router.post('/applet/urlSchema', async (ctx) => {
  try {
    const token = await getAccessToken();
    const res = await axios.post(`https://api.weixin.qq.com/wxa/generatescheme?access_token=${token}`);
    if (res?.data?.openlink) {
      ctx.body = util.success({ url: res?.data?.openlink }, '生成成功');
    } else {
      ctx.body = util.fail({}, '链接生成失败，请稍后重新进入');
    }
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
