/**
 * 生成优惠券接口
 */
const router = require("koa-router")();
const Coupons = require("../../models/couponsSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");
const dayjs = require("dayjs");
const xlsx = require("xlsx");
const _ = require("lodash");
const path = require("path");

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
    const couponData = await Coupons.find({ batchNum: batch.length + 1 });
    const wb = xlsx.utils.book_new();
    const data = _.map(couponData, "_doc");
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "优惠券");
    await xlsx.writeFile(wb, path.join(__dirname + `../../../public/excel/批次${batch.length + 1}优惠券.xlsx`));
    ctx.body = util.success(
      { url: `https://ydhj.qiantur.com/excel/批次${batch.length + 1}优惠券.xlsx` },
      `成功生成${createNum}张优惠券`
    );
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
