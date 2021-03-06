import Flyio from './flyCreate'
import {API} from './api'
import Config from './config'

// 异常情况的错误处理
const errorFunction = (reqConfig, err) => {
  // 如果有异常需要提示
  if (!reqConfig.errorAction && reqConfig.isErrorDefaultTip) {
    Config.resError.tipShow(err)
  }
}

const REQUEST = Flyio.request;
let promises = [] 
let loadingTimer = [] // loading的定时器

// 处理Loading逻辑
function handleRequest(rqConfig){
    Config.loading.loadingShow()
    // rqConfig.isLoading && clearTimeout(loadingTimer);
    // loadingTimer = setTimeout(() => {
    //    rqConfig.isLoading && Config.loading.loadingShow();
    // }, Config.loading.limitTime);
    // Promise.all(promises).then(data => {
    //     if (data.length !== promises.length) return
    //     promises = [] // 所有请求完后清除promise数组
    //     clearTimeout(loadingTimer) // 当请求在xxxms内完成则直接清除loading计时器
    // })
    // .catch(function(error){
    //     promises = [] // 请求异常完后清除promise数组
    //     clearTimeout(loadingTimer) // 请求异常则直接清除loading计时器
    // })
}
// 重写request方法，
Flyio.request = function(obj){
    let urlName = obj.url || '';
    let url = '';
    if(urlName){
        url = API[urlName]?API[urlName]:urlName; // 映射请求链接
    }

    let data = obj.data || {}; // 请求数据

    let flyConfig = obj.flyConfig || {}; // flyio配置
    flyConfig = {
        ...Config.flyConfig,
        ...flyConfig
    };

    // 发送请求
    let flyioRequest =  REQUEST.apply(this,[url,data,flyConfig]);
    promises.push(flyioRequest.catch(e => {}));

    let rqConfig = obj.config || {}; // loading及错误提示相关配置
    rqConfig = {
        ...Config.reqConfig,
        ...rqConfig
    };
    handleRequest(rqConfig);

    // 数据返回拦截
    return flyioRequest.then( res => {
       Config.loading.loadingHide() 
       if (res.code == 1) {
           return res;
       }else{
            if(!rqConfig.hideMsg){
               wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 1500
              });
            }
           return res;
       }
    }).catch(err => {
        Config.loading.loadingHide();
        if(err.response.status == 401 || err.status == 401){
            wx.navigateTo({
              url: '/pages/login/index'
            })
        }else{
            wx.showToast({
               title: '服务器维护中，请重试',
               icon: 'none',
               duration: 1500
            });
        }
    })
}

export default Flyio