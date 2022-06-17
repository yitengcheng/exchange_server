/**
 * 角色实体
 */
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String, // 角色名
  type: Number, // 角色类型 1 普通用户 2 企业用户
});

module.exports = mongoose.model("roles", schema, "roles"); // 模型名 schema 数据库集合名
