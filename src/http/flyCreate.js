// import Fly from 'flyio'
import Fly from 'flyio/dist/npm/wx'
import {BASE_URL} from './api'
import store from '../store/index'

const request = new Fly

request.config.headers={
  'content-type': 'application/json'
};

// //设置超时
// request.config.timeout=10000;

// //设置请求基地址
request.config.baseURL = BASE_URL

request.interceptors.request.use((request) => {
  request.headers["X-Tag"]="flyio";
  // if(store.state.counter.userData && store.state.counter.userData.accessToken){
  //    request.headers.Authorization = 'Bearer ' + store.state.counter.userData.accessToken;
  // }else{
  //   let userDataStr = wx.getStorageSync('userData');
  //   if (userDataStr) {
  //     let userData = JSON.parse(userDataStr);
  //     store.dispatch('counter/updateUserMsg',userData);
  //     if(userData.accessToken){
  //       request.headers.Authorization = 'Bearer ' + store.state.counter.userData.accessToken;
  //     }
  //   }
  // };

  if(!request.headers.Authorization){
    request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjJiYTRlNGM5LTU1M2YtNTBhYS1lMGRiLTM5ZWQ2YWExNjVhOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsInN1YiI6IjIiLCJqdGkiOiI5MzA3NWI2MC01YWNjLTRkMTMtYjI5Mi1mZjNmOTQyMzE1ZWMiLCJpYXQiOjE1NTc4OTAwMDgsIm5iZiI6MTU1Nzg5MDAwOCwiZXhwIjoxNTU3OTc2NDA4LCJpc3MiOiJQcm8iLCJhdWQiOiJQcm8ifQ.ls3V9YgSmMkrxV7jIEW56bqPageGmML7D9hRzn8es7I';
  }
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
