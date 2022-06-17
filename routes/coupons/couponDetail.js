/**
 * 查看优惠券详情接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");

router.post("/coupons/detail", async (ctx) => {
  try {
    const { couponId } = ctx.request.body;
    const { user } = ctx.state;
    const res = await Coupons.findOne({ _id: couponId, belongUser: user._id });
    if (!res) {
      ctx.body = util.fail("", "没有这张优惠券");
      return;
    }
    ctx.body = util.success(res, "查询成功");
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
