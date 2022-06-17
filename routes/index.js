const users = require("./users");
const init = require("./init");
const coupons = require("./coupons");

const routers = {
  ...users,
  ...init,
  ...coupons,
};

module.exports = routers;
