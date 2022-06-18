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
    const { couponCode, shopId } = ctx.request.body;
    const coupon = await Coupons.findOne({ couponCode, status: 2, validityTime: { $gte: dayjs().toDate() } });
    const shop = await Shop.findById(shopId);
    if (!shop) {
      ctx.body = util.fail("", "请商家先进行登录");
      return;
    }
    if (!coupon) {
      ctx.body = util.fail("", "无效优惠券，无法使用");
      return;
    }
    const res = await Coupons.updateOne({ couponCode }, { status: 3, useTime: Date.now(), consumerShop: shop._id });
    ctx.body = util.success({}, `优惠券使用成功`);
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
