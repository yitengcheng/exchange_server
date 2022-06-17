/**
 * 生成优惠券接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");
const dayjs = require("dayjs");

router.post("/coupons/create", async (ctx) => {
  try {
    const { number, validityTime, serviceConditions, creditAmount } = ctx.request.body;
    const batch = await Coupons.aggregate().group({
      _id: "$batchNum",
    });
    for (let index = 0; index < number; index++) {
      await Coupons.create({
        validityTime: dayjs(validityTime).toDate(),
        status: 1,
        serviceConditions,
        creditAmount,
        couponCode: util.couponCreate(),
        batchNum: batch.length + 1,
      });
    }
    const createNum = await Coupons.countDocuments({ batchNum: batch.length + 1 });
    ctx.body = util.success({}, `成功生成${createNum}张优惠券`);
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
