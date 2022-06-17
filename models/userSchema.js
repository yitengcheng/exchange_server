/**
 * 用户实体
 */
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userName: String, // 登录账号
  password: String, // 登录密码
  openid: String, // 微信openid
  role: { type: mongoose.Types.ObjectId, ref: "roles" }, // 角色id
  loginDate: Date, // 上次登录时间
  shop: { type: mongoose.Types.ObjectId, ref: "shops" }, // 所属店铺
});

module.exports = mongoose.model("users", schema, "users"); // 模型名 schema 数据库集合名
