/**
 * 兑换优惠券接口
 */
const router = require('koa-router')();
const Coupons = require('../../models/couponsSchema');
const util = require('../../utils/util');
const dayjs = require('dayjs');

router.post('/coupons/redeem', async (ctx) => {
  try {
    const { couponCode } = ctx.request.body;
    const { user } = ctx.state;
    const coupon = await Coupons.findOne({ couponCode, status: 1, validityTime: { $gte: dayjs().toDate() } });
    if (!coupon) {
      ctx.body = util.fail('', '无效优惠券兑换码');
      return;
    }
    await Coupons.updateOne({ couponCode }, { status: 2, changeTime: Date.now(), belongUser: user._id });
    ctx.body = util.success({}, '优惠券兑换成功');
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
