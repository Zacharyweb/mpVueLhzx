// import Fly from 'flyio'
import Fly from 'flyio/dist/npm/wx'
import {BASE_URL} from './api'
const request = new Fly

request.config.headers={
  'content-type': 'application/json'
};

// //设置超时
// request.config.timeout=10000;

// //设置请求基地址
request.config.baseURL = BASE_URL

request.interceptors.request.use((request) => {
  // 封装wx请求cookie
  // let cookie
  // if(wx.getStorageSync('wx_cookie') && wx.getStorageSync('t0_cookie')){
  //   cookie = wx.getStorageSync('t0_cookie') + ';' + wx.getStorageSync('wx_cookie')
  // }else if(wx.getStorageSync('wx_cookie')){
  //   cookie = wx.getStorageSync('wx_cookie')
  // }else{
  //   cookie = wx.getStorageSync('t0_cookie')
  // }
  // if(cookie){
  //   request.headers.cookie = cookie
  // }
  request.headers["X-Tag"]="flyio";
  return request
})

request.interceptors.response.use((response, promise) => {
    // if (response.headers['set-cookie']) {
    //   var setCookie = response.headers['set-cookie'].replace(new RegExp('Path=/'), '').split(',')
    //   var headStr = setCookie[0].startsWith('ft')
    //   if(headStr){
    //     wx.setStorageSync('wx_cookie', setCookie[0])
    //   }else{
    //     wx.setStorageSync('t0_cookie', setCookie[0])
    //   }
    // }
    return promise.resolve(response.data);
  },(err, promise) => {
    return promise.reject(err)
  }
)
export default request
