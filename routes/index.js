const users = require("./users");
const init = require("./init");
const coupons = require("./coupons");
const shop = require("./shop");

const routers = {
  ...users,
  ...init,
  ...coupons,
  ...shop,
};

module.exports = routers;
