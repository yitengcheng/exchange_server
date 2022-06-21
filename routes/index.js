const users = require('./users');
const init = require('./init');
const coupons = require('./coupons');
const shop = require('./shop');
const applet = require('./applet');

const routers = {
  ...users,
  ...init,
  ...coupons,
  ...shop,
  ...applet,
};

module.exports = routers;
