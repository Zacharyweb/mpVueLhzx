// API
const BASE_URL = 'http://api.yuelinshe.com' // 网上获取省市api
const API = {
  // 公共服务
  'getProvince': '/hzui/static/data/province.json', // 获取省市
  'test':'/mms/country/queryValidZoneListForMallHome',



  'AuthorizedLoginByWx':'/api/Users/AuthorizedLoginByWx',// 微信登录

  'SendCode':'/api/LhzxSmsCode/SendCode', //发送短信验证码
  'CheckCode':'/api/LhzxSmsCode/CheckCode', //验证验证码
  'PutCurrentUser':'/api/Users/PutCurrentUser',// 提交专家信息成为专家
  'GetAllMajor':'/api/Users/GetAllMajor', // 获取专家分类标签,
  'GetAllBusinessArea': '/api/Users/GetAllBusinessArea', // 获取所有领域


  
  'GetExpertList':'/api/Users/GetExpertList', // 获取专家列表
  'GetUserDetail':'/api/Users/GetUserDetail/',//获取专家详情信息

  'UploadFile':'/api/LhzxFile/Post', //上传文件

  'SetWorkStatus':'/api/Users/SetWorkStatus', // 更新工作状态
 
}

export {API, BASE_URL}
