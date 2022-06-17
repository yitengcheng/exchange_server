/**
 * 商家查看已消费优惠券列表接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");
const shopSchema = require("../../models/shopSchema");

router.post("/coupons/listByShop", async (ctx) => {
  try {
    const { type } = ctx.request.body; // 1 全部 2 上月 3 本月
    const { page, skipIndex } = util.pager(ctx.request.body);
    const { user } = ctx.state;
    const shop = await shopSchema.findById(user._id);
    if (!shop) {
      ctx.body = util.fail("", "请商家先进行登录");
      return;
    }
    let params = { consumerShop: shop._id, status: 3 };
    if (type === 2) {
      params = {
        useTime: {
          $gte: dayjs(dayjs(dayjs().subtract(1, "month")).startOf("month")).toDate(),
          $lte: dayjs(dayjs(dayjs().subtract(1, "month")).endOf("month")).toDate(),
        },
        ...params,
      };
    } else if (type === 3) {
      params = {
        useTime: {
          $gte: dayjs(dayjs().startOf("month")).toDate(),
          $lte: dayjs(dayjs().endOf("month")).toDate(),
        },
        ...params,
      };
    }
    const list = await Coupons.find(params).skip(skipIndex).limit(page.pageSize);
    const total = await Coupons.countDocuments(params);
    ctx.body = util.success({ total, list });
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
