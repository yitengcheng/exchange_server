/**
 * 商店账号登录接口
 */
const router = require("koa-router")();
const Shop = require("../../models/shopSchema");
const util = require("../../utils/util");
const log4j = require("../../utils/log4");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

router.post("/shop/login", async (ctx) => {
  try {
    const { userName, password } = ctx.request.body;
    const shop = await Shop.findOne({ userName, password: md5(password) }, { password: 0, userName: 0, __v: 0 });
    if (!shop) {
      ctx.body = util.fail("", "账号或密码错误");
      return;
    }
    const token = jwt.sign({ ...shop?._doc }, "cdxs", { expiresIn: "24h" });
    ctx.body = util.success({ token, shopInfo: shop }, "登录成功");
  } catch (error) {
    ctx.body = util.fail(error.stack);
  }
});

module.exports = router;
