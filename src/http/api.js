// API
const BASE_URL = 'http://api.yuelinshe.com' // 网上获取省市api
const API = {
  // 公共服务
  'getProvince': '/hzui/static/data/province.json', // 获取省市
  'test':'/mms/country/queryValidZoneListForMallHome',
  'AuthorizedLoginByWx':'/api/TokenAuth/AuthorizedLoginByWx',// 微信登录
}

export {API, BASE_URL}
