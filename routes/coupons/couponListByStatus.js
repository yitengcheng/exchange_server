/**
 * 根据状态分类获取优惠券列表接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");

router.post("/coupons/redeem", async (ctx) => {
  try {
    const { status } = ctx.request.body; // 1 全部 2 未使用 3 已使用
    const { page, skipIndex } = util.pager(ctx.request.body);
    const { user } = ctx.state;
    let params = { belongUser: user._id };
    if (status !== 1) {
      params = { status, ...params };
    }
    const list = await Coupons.find(params).skip(skipIndex).limit(page.pageSize);
    const total = await Coupons.countDocuments(params);
    ctx.body = util.success({ total, list });
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
