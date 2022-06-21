/**
 * 添加商店账号接口
 */
const router = require('koa-router')();
const Shop = require('../../models/shopSchema');
const util = require('../../utils/util');
const md5 = require('md5');

router.post('/shop/add', async (ctx) => {
  try {
    const { userName, password, name, head, headPhone, address } = ctx.request.body;
    const shop = await Shop.findOne({ userName });
    if (shop) {
      ctx.body = util.fail('', '已有重复账号');
      return;
    }
    await Shop.create({
      userName,
      password: md5(password ?? '123456'),
      name,
      head,
      headPhone,
      address,
    });
    ctx.body = util.success({}, '创建店铺成功，默认密码123456');
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
