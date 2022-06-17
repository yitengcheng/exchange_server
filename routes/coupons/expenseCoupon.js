/**
 * 消费优惠券接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");
const dayjs = require("dayjs");
const Shop = require("../../models/shopSchema");

router.post("/coupons/expense", async (ctx) => {
  try {
    const { couponid } = ctx.request.body;
    const { user } = ctx.state;
    const coupon = await Coupons.findOne({ _id: couponid, status: 2, validityTime: { $gte: dayjs().toDate() } });
    const shop = await Shop.findById(user._id);
    if (!shop) {
      ctx.body = util.fail("", "请商家先进行登录");
      return;
    }
    if (!coupon) {
      ctx.body = util.fail("", "无效优惠券，无法使用");
      return;
    }
    const res = await Coupons.updateOne({ _id: couponid }, { status: 3, useTime: Date.now(), consumerShop: shop._id });
    ctx.body = util.success({}, `优惠券使用成功`);
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
