/**
 * 初始化接口
 */
const router = require('koa-router')();
const Shop = require('../../models/shopSchema');
const util = require('../../utils/util');

router.post('/init/data', async (ctx) => {
  try {
    await Shop.create({
      userName: 'admin', // 账号
      password: '123456', // 密码
      name: '测试店铺a', // 店铺名
      head: '门卫大爷', // 负责人
      headPhone: '13984842424', // 负责人联系方式
      address: '贵州省贵阳市南明区甲秀楼', // 地址
      coordinates: ['106.726275', '26.577236'], // 坐标
    });
    ctx.body = util.success({}, '初始化成功');
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
