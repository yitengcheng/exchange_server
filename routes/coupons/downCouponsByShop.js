/**
 * 查看优惠券详情接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");
const dayjs = require("dayjs");
const Shop = require("../../models/shopSchema");
const xlsx = require("xlsx");
const _ = require("lodash");
const path = require("path");

router.post("/coupons/downCouponsByShop", async (ctx) => {
  try {
    const { shopName, month } = ctx.request.body; // month 可为空，为空是上月记录
    let monthParams = {};
    let shopParams = {};
    if (month) {
      monthParams = {
        useTime: {
          $gte: dayjs(dayjs(dayjs().month(month - 1)).startOf("month")).toDate(),
          $lte: dayjs(dayjs(dayjs().month(month - 1)).endOf("month")).toDate(),
        },
      };
    } else {
      monthParams = {
        useTime: {
          $gte: dayjs(dayjs(dayjs().subtract(1, "month")).startOf("month")).toDate(),
          $lte: dayjs(dayjs(dayjs().subtract(1, "month")).endOf("month")).toDate(),
        },
      };
    }
    if (shopName) {
      const shop = await Shop.findOne({ name: shopName });
      if (!shop) {
        ctx.body = util.fail("", "未知店铺");
        return;
      }
      shopParams = { consumerShop: shop?._id };
    }
    const coupons = await Coupons.find({ status: 3, ...monthParams, ...shopParams }).populate("consumerShop");
    const wb = xlsx.utils.book_new();
    const data = _.map(coupons, "_doc");
    let couponData = [];
    data.forEach((element) => {
      couponData.push({
        使用时间: dayjs(element.useTime).format("YYYY-MM-DD"),
        消费店铺: element.consumerShop.name,
        使用条件: element.serviceConditions,
        减免金额: element.creditAmount,
        劵码: element.couponCode,
      });
    });
    const ws = xlsx.utils.json_to_sheet(couponData);
    xlsx.utils.book_append_sheet(wb, ws, "优惠券");
    await xlsx.writeFile(wb, path.join(__dirname + `../../../public/excel/优惠券使用情况.xlsx`));
    ctx.body = util.success({ url: `https://ydhj.qiantur.com/excel/优惠券使用情况.xlsx` });
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
