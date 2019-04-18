module.exports = [
  // 首页
  {
    path: 'pages/login/index',
    config: {
      navigationBarTitleText: '登录',
      usingComponents: {

      }
    }
  },

  // 首页
  {
    path: 'pages/index/index',
    config: {
      navigationBarTitleText: '咨询堂',
      usingComponents: {
        "van-search": "/static/vant/search/index",
        "van-tag": "/static/vant/tag/index",
        "van-tab": "/static/vant/tab/index",
        "van-tabs": "/static/vant/tabs/index"
      }
    }
  },

  // 使用说明
  {
    path: 'pages/useNotice/index',
    config: {
      navigationBarTitleText: '使用说明',
      usingComponents: {
        "van-steps": "/static/vant/steps/index",
        "van-field":"/static/vant/field/index",
        "van-cell-group":"/static/vant/cell-group/index",
        "van-dialog": "/static/vant/dialog/index"
      }
    }
  },
  
  // 搜索页面
  {
    path: 'pages/search/index',
    config: {
      navigationBarTitleText: '搜索专家',
      usingComponents: {
        "van-search": "/static/vant/search/index"
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
      navigationBarTitleText: '咨询室',
      usingComponents: {
        "van-field":"/static/vant/field/index",
        "van-stepper": "/static/vant/stepper/index"
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
      navigationBarTitleText: '咨询订单',
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
      navigationBarTitleText: '咨询详情',
      usingComponents: {
  
        "van-stepper": "/static/vant/stepper/index",
        "van-datetime-picker": "/static/vant/datetime-picker/index"
      }
    }
  },

  // 专家取消订单
   {
    path: 'pages/cancelOrder/index',
    config: {
      navigationBarTitleText: '取消订单',
      usingComponents: {
    
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
        "van-datetime-picker": "/static/vant/datetime-picker/index"
      }
    }
  },

  // 专家作答
  {
    path: 'pages/answer/index',
    config: {
      navigationBarTitleText: '作答',
      usingComponents: {
        "van-tag": "/static/vant/tag/index",
        "van-action-sheet": "/static/vant/action-sheet/index"
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
      }
    }
  },

  // 选择好友(好像没什么用现在)
  // {
  //   path: 'pages/selectFriend/index',
  //   config: {
  //     navigationBarTitleText: '选择好友',
  //     usingComponents: {
  //       "van-tab": "/static/vant/tab/index",
  //       "van-tabs": "/static/vant/tabs/index"
  //     }
  //   }
  // },
 
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
      navigationBarTitleText: '基础信息',
      usingComponents: {
      
      }
    }
  },

  // 我的关系户
   {
    path: 'pages/myRelation/index',
    config: {
      navigationBarTitleText: '我的关系',
      usingComponents: {
        "van-dialog": "/static/vant/dialog/index",
      }
    }
  },
  // 我的客户
  {
    path: 'pages/myCustomer/index',
    config: {
      navigationBarTitleText: '我的客户',
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
      navigationBarTitleText: '我的专家',
      usingComponents: {
        "van-tab": "/static/vant/tab/index",
        "van-tabs": "/static/vant/tabs/index",
      }
    }
  },
  // 成为专家
  {
    path: 'pages/becomeExpert/index',
    config: {
      navigationBarTitleText: '成为专家',
      usingComponents: {
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
        "van-action-sheet": "/static/vant/action-sheet/index"
      }
    }
  },

  // 我的订单
  // {
  //   path: 'pages/myOrders/index',
  //   config: {
  //     navigationBarTitleText: '我的订单',
  //     usingComponents: {
  //     "van-tag": "/static/vant/tag/index"
  //     }
  //   }
  // },

  // 订单详情
  // {
  //   path: 'pages/orderDetail/index',
  //   config: {
  //     navigationBarTitleText: '订单详情',
  //     usingComponents: {
  //       "van-tag": "/static/vant/tag/index"
  //     }
  //   }
  // },

  // 账单明细
  // {
  //   path: 'pages/billList/index',
  //   config: {
  //     navigationBarTitleText: '账单明细',
  //     usingComponents: {
  //       "van-tab": "/static/vant/tab/index",
  //       "van-tabs": "/static/vant/tabs/index",
  //       "van-datetime-picker": "/static/vant/datetime-picker/index"
  //     }
  //   }
  // },

  // 账单详情
  // {
  //   path: 'pages/billDetail/index',
  //   config: {
  //     navigationBarTitleText: '账单详情',
  //     usingComponents: {
    
  //     }
  //   }
  // },

  // 提现
  // {
  //   path: 'pages/cash/index',
  //   config: {
  //     navigationBarTitleText: '提现',
  //     usingComponents: {
  //       "van-field":"/static/vant/field/index"
        
  //     }
  //   }
  // },

  // 修改手机
  // {
  //   path: 'pages/editMobile1/index',
  //   config: {
  //     navigationBarTitleText: '修改手机号',
  //     usingComponents: {
  //       "van-field":"/static/vant/field/index",
  //       "van-cell-group":"/static/vant/cell-group/index",
  //       "van-dialog": "/static/vant/dialog/index"
  //     }
  //   }
  // },

  // 修改手机
  // {
  //   path: 'pages/editMobile2/index',
  //   config: {
  //     navigationBarTitleText: '修改手机号',
  //     usingComponents: {
  //       "van-field":"/static/vant/field/index",
  //       "van-cell-group":"/static/vant/cell-group/index",
  //       "van-dialog": "/static/vant/dialog/index"
  //     }
  //   }
  // },

  // 银行卡
  // {
  //   path: 'pages/bankCard/index',
  //   config: {
  //     navigationBarTitleText: '银行卡',
  //     usingComponents: {
  //       "van-field":"/static/vant/field/index",
  //       "van-cell-group":"/static/vant/cell-group/index",
  //       "van-dialog": "/static/vant/dialog/index"
  //     }
  //   }
  // } 
]
