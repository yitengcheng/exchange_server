const users = require("./users");
const init = require("./init");

const routers = {
  ...users,
  ...init,
};

module.exports = routers;
