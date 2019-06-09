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

  'UpdateUserBaseInfo':'/api/Users/UpdateUserBaseInfo',//更新用户基本信息
  'CheckHasFollowed':'/api/LhzxFollow/HasFollowed',//获取是否关注
  'AddUserFollow':'/api/LhzxFollow/AddUserFollow', //添加关注
  'DeleteUserFollow':'/api/LhzxFollow/DeleteUserFollow', //取消关注
  'UploadFile':'/api/LhzxFile/Post', //上传文件
  'SetWorkStatus':'/api/Users/SetWorkStatus', // 更新工作状态
  'GetSearchHistory':'/api/LhzxSearchHistory/Get/', // 搜索记录
  'DeleteSearchHistory':'/api/LhzxSearchHistory/Delete/', //清空记录

  'CreateOrder':'/api/LhzxOrder/PostOrder',//创建订单
  'GetUserOrderList':'/api/LhzxOrder/UserOrderList',//获取用户订单
  'GetExpertOrderList':'/api/LhzxOrder/ExpertOrderList',//获取专家的订单
  'GetOrderDetail':'/api/LhzxOrder/GetOrderDetail/',//获取订单详情
  'ReceiptOrder':'/api/LhzxOrder/Receipt', //专家接单
  'ModifyOrderOrder':'/api/LhzxOrder/ModifyOrder',//专家修改订单信息
  'UserResureOrder':'/api/LhzxOrder/DoSureOrderInfo', //用户重新确认订单
  'AnswerOrder':'/api/LhzxOrder/Answer', //专家作答
  'UserDoSureAnswer':'/api/LhzxOrder/UserDoSure', // 用户确认（超过最后确认时间还未操作会自动确认）
  'UserPaying':'/api/LhzxOrder/Paying',//  用户支付订单（操作后系统将专家的收款二维码以模板消息发送给用户）
  'PaymentVoucher':'/api/LhzxOrder/PaymentVoucher', // 用户提交支付凭证
  'ExpertPaySure':'/api/LhzxOrder/PaySure', // 专家确认订单（操作后系统将订单完成的消息推送给用户）
  'UseComment':'/api/LhzxOrder/OrderComment', //用户评价(超过最后评价时间后系统将自动好评)
  'UserComplaining':'/api/LhzxOrder/Complaining', // 申诉
  'ClosedOrder':'/api/LhzxOrder/Closed', // 关闭订单

  'AddUserFriend':'/api/LhzxFriend/AddUserFriend', //添加关系户
  'DeleteUserFriend':'/api/LhzxFriend/DeleteUserFriend', // 删除关系户
  'getSureUserFriendList':'/api/LhzxFriend/SureUserFriendList/', //获取关系户申请列表
  'SureUserFriend':'/api/LhzxFriend/SureUserFriend',// 同意被邀请添加为关系户
  'GetUserFriendList':'/api/LhzxFriend/UserFriendList',//获取用户的关系户好友

  'ShareExpert':'/api/LhzxShare/AddShare', // 分享专家

  'GetConsultedExpertList':'/api/LhzxFriend/GetConsultedList/',//获取咨询过的专家
  'GetInquiredExpertList':'/api/LhzxFriend/GetInquiredList/', //获取询问过的专家
  'GetFollowedExpertList':'/api/LhzxFriend/GetFollowedList/', //获取询问过的专家

}

export {API, BASE_URL}
