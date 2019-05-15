// API
const BASE_URL = 'http://api.yuelinshe.com' // 网上获取省市api
const API = {
  // 公共服务
  'getProvince': '/hzui/static/data/province.json', // 获取省市
  'test':'/mms/country/queryValidZoneListForMallHome',



  'AuthorizedLoginByWx':'/api/TokenAuth/AuthorizedLoginByWx',// 微信登录

  'SendSms':'/api/TokenAuth/SendSms', //发送短信验证码
  'VerSmsCodeAsync':'/api/TokenAuth/VerSmsCodeAsync', //验证验证码



  'GetAllExperts':'/api/services/app/User/GetAll', // 获取专家列表





  'GetAllTags':'/api/services/app/Tag/GetAll', // 获取专家分类标签
}

export {API, BASE_URL}
