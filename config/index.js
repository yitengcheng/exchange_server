/**
 * 配置文件
 */
module.exports = {
  URL: "mongodb://127.0.0.1:27017/exchange_db", // 数据库地址
  unlessList: [/^\/exApi\/app\/login/, /^\/exApi\/init\/data/], // 接口白名单
  appid: "wx6e94e7eaa811d0bd", // 小程序id
  secret: "efacf5c678f13d1c0a1f033011275314", // 小程序secret
};
