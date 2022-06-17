/**
 * 商户实体
 */
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  userName: String, // 账号
  password: String, // 密码
  name: String, // 商店名
  head: String, // 负责人
  headPhone: String, // 负责人联系方式
  address: String, // 地址
  coordinates: [String], // 坐标（经度，纬度）
  createTime: { type: Date, default: Date.now() }, // 创建时间
});

module.exports = mongoose.model("shops", schema, "shops"); // 模型名 schema 数据库集合名
