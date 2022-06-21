/**
 * 用户实体
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  openid: String, // 微信openid
  loginDate: Date, // 上次登录时间
});

module.exports = mongoose.model('users', schema, 'users'); // 模型名 schema 数据库集合名
