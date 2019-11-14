module.exports = [
  // 首页
  {
    path: 'pages/index/index',
    config: {
      navigationBarTitleText: '问税易',
      enablePullDownRefresh: true,
      usingComponents: {
        "van-search": "/static/vant/search/index",
        "van-tag": "/static/vant/tag/index",
        "van-tab": "/static/vant/tab/index",
        "van-tabs": "/static/vant/tabs/index",
        "van-area": "/static/vant/area/index"
      }
    }
  },
  // 登录
  {
    path: 'pages/login/index',
    config: {
      navigationBarTitleText: '登录',
    }
  },

  // 搜索页面
  {
    path: 'pages/search/index',
    config: {
      navigationBarTitleText: '搜索专家',
      usingComponents: {
        "van-search": "/static/vant/search/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 专家详情
  {
    path: 'pages/expertDetail/index',
    config: {
      navigationBarTitleText: '专家详情',
      usingComponents: {
        "van-action-sheet": "/static/vant/action-sheet/index"
      }
    }
  },

  // 专家名片
  {
    path: 'pages/expertCard/index',
    config: {
      navigationBarTitleText: '专家名片',
      usingComponents: {
        "van-button": "/static/vant/button/index",
      }
    }
  },

  // 问候聊天室
  {
    path: 'pages/chatRoom/index',
    config: {
      navigationBarTitleText: '问候聊天',
      usingComponents: {
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },
  // 消息列表页
  {
    path: 'pages/msgList/index',
    config: {
      navigationBarTitleText: '问候列表',
      usingComponents: {
         "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 发起咨询
  {
    path: 'pages/startConsult/index',
    config: {
      navigationBarTitleText: '发起咨询',
      usingComponents: {
        "van-field":"/static/vant/field/index",
        "van-stepper": "/static/vant/stepper/index"
      }
    }
  },

  // 咨询步骤
  {
    path: 'pages/consultNotice/index',
    config: {
      navigationBarTitleText: '咨询步骤',
      usingComponents: {
        "van-steps": "/static/vant/steps/index",
        "van-field":"/static/vant/field/index",
        "van-cell-group":"/static/vant/cell-group/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 咨询订单列表
  {
    path: 'pages/consult/index',
    config: {
      navigationBarTitleText: '问答',
      enablePullDownRefresh: true,
      usingComponents: {
        "van-tag": "/static/vant/tag/index",
        "van-action-sheet": "/static/vant/action-sheet/index"
      }
    }
  },

  // 咨询详情/订单详情
  {
    path: 'pages/consultDetail/index',
    config: {
      navigationBarTitleText: '问答详情',
      usingComponents: {
        "van-stepper": "/static/vant/stepper/index",
        "van-datetime-picker": "/static/vant/datetime-picker/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 专家取消订单
   {
    path: 'pages/cancelOrder/index',
    config: {
      navigationBarTitleText: '取消订单',
      usingComponents: {
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },
  // 专家修改订单
  {
    path: 'pages/editOrder/index',
    config: {
      navigationBarTitleText: '修改订单',
      usingComponents: {
        "van-stepper": "/static/vant/stepper/index",
        "van-datetime-picker": "/static/vant/datetime-picker/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 专家作答
  {
    path: 'pages/answer/index',
    config: {
      navigationBarTitleText: '作答',
      usingComponents: {
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 用户申诉
  {
    path: 'pages/appeal/index',
    config: {
      navigationBarTitleText: '申诉',
      usingComponents: {
        
      }
    }
  },

  // 结算支付
  {
    path: 'pages/pay/index',
    config: {
      navigationBarTitleText: '结算支付',
      usingComponents: {
        "van-tag": "/static/vant/tag/index",
        "van-action-sheet": "/static/vant/action-sheet/index"
      }
    }
  },

  // 评价
  {
    path: 'pages/comment/index',
    config: {
      navigationBarTitleText: '评价',
      usingComponents: {
        "van-action-sheet": "/static/vant/action-sheet/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },


 
  // 个人中心
  {
    path: 'pages/mine/index',
    config: {
      navigationBarTitleText: '我的',
      usingComponents: {
        "van-action-sheet": "/static/vant/action-sheet/index",
      }
    }
  },

  // 基础信息
   {
    path: 'pages/baseMsg/index',
    config: {
      navigationBarTitleText: '本人',
      usingComponents: {
      
      }
    }
  },

  // 我的关系户
   {
    path: 'pages/myRelation/index',
    config: {
      navigationBarTitleText: '关系',
      enablePullDownRefresh: true,
      usingComponents: {
        "van-dialog": "/static/vant/dialog/index",
        "van-tab": "/static/vant/tab/index",
        "van-tabs": "/static/vant/tabs/index",
      }
    }
  },
  // 我的客户
  {
    path: 'pages/myCustomer/index',
    config: {
      navigationBarTitleText: '客户',
      usingComponents: {
        "van-tab": "/static/vant/tab/index",
        "van-tabs": "/static/vant/tabs/index",
    
      }
    }
  },
  // 我的专家
  {
    path: 'pages/myExpert/index',
    config: {
      navigationBarTitleText: '专家',
      usingComponents: {
        "van-tab": "/static/vant/tab/index",
        "van-tabs": "/static/vant/tabs/index",
      }
    }
  },

  // 专家注册概述
  {
    path: 'pages/becomeExpertPre/index',
    config: {
      navigationBarTitleText: '专家注册概述',
      usingComponents: {
        "van-steps": "/static/vant/steps/index",
        "van-area": "/static/vant/area/index"
      }
    }
  },

  // 专家注册
  {
    path: 'pages/becomeExpert/index',
    config: {
      navigationBarTitleText: '专家注册',
      usingComponents: {
        "van-steps": "/static/vant/steps/index",
        "van-area": "/static/vant/area/index"
      }
    }
  },

  // 设置
  {
    path: 'pages/set/index',
    config: {
      navigationBarTitleText: '设置',
      usingComponents: {
        "van-action-sheet": "/static/vant/action-sheet/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },

  // 帮助
  {
    path: 'pages/helpCenter/index',
    config: {
      navigationBarTitleText: '帮助',
    }
  },

  {
    path: 'pages/useNotice/index',
    config: {
      navigationBarTitleText: '使用说明',
    }
  },
  {
    path: 'pages/userHelp/index',
    config: {
      navigationBarTitleText: '常见问题',
    }
  },
  {
    path: 'pages/userProtocol/index',
    config: {
      navigationBarTitleText: '用户协议',
    }
  },
]
