/**
 * 优惠券实体
 */
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  belongUser: { type: mongoose.Types.ObjectId, ref: "users" }, // 所属人
  status: Number, // 状态 1 已生成 2 未使用 3 已使用
  validityTime: Date, // 有效期
  createTime: { type: Date, default: Date.now() }, // 创建日期
  changeTime: Date, // 兑换日期
  useTime: Date, // 使用日期
  consumerShop: { type: mongoose.Types.ObjectId, ref: "shops" }, // 消费店铺
  serviceConditions: Number, // 使用条件
  creditAmount: Number, // 减免金额
  couponCode: { type: String, unique: true }, // 劵码
  batchNum: Number,
});

module.exports = mongoose.model("coupons", schema, "coupons"); // 模型名 schema 数据库集合名
