<template>
  <div class="container">
    <div class="order_base_msg">
      <div class="order_no">订单号：20190316010203</div>
      <div class="order_status">
        <span class="time_count" v-if="orderStatus == 1 || orderStatus == 3">00:05:45</span>
        <span class="status" v-if="orderStatus == 1">待接单</span>
        <span class="status" v-if="orderStatus == 2">待重新确认</span>
        <span class="status" v-if="orderStatus == 3">待作答</span>
        <span class="status" v-if="orderStatus == 4">已作答/待支付</span>
        <span class="status" v-if="orderStatus == 5">已作答/待评价</span>
        <span class="status" v-if="orderStatus == 6">已完成</span>
        <span class="status" v-if="orderStatus == 7">已关闭</span>
      </div>
    </div>

    <div class="orders_list">
      <div class="order_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <div class="experts_name">朱两边 <span>前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span></div>
            </div>
            <div class="order_msg3">
              <div class="order_response" v-if="orderStatus == 1">预计作答时间：接单后确认</div>
              <div class="order_response" v-if="orderStatus == 7">预计作答时间：--</div>
              <div class="order_deadline" v-if="orderStatus*1 >= 2 && orderStatus != 7">预计作答时间：2019-03-16 12:00:00</div>
              <div class="order_cost"><span>费用：66元</span><span class="sub_text">5分钟内回应&nbsp;|&nbsp;12小时内作答</span></div>
            </div>
          </div>
        </div>

        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题详情：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="question_files">
             <div class="question_files_title">相关附件：</div>
             <div class="img_block">
               <img src="../../../static/img/avatar.jpeg" alt="">
             </div>
          </div>
          <div class="question" style="margin-top:5px">
              <span class="question_title">相关介绍：</span>我是备注我是备注我是备注我是备注我是备注我是备注我是备注我是备注
          </div>
          <div class="order_time">咨询发起时间：2018-12-14 00:00:00</div>
        </div>

        <!-- 专家拒绝并推荐 -->
        <div class="bottom_block" v-if="orderStatus == 7 && rejectType == 2">
          <div class="question">
              <span class="question_title">订单关闭：</span>专家取消订单，原因：不好意思最近太忙没时间回复
          </div>
          <div class="order_time">订单关闭时间：2018-12-14 00:00:00</div>
        </div>

        <!-- 专家拒绝并推荐其他专家 -->
        <div class="bottom_block" v-if="orderStatus == 7 && rejectType == 3">
          <div class="question">
              <span class="question_title">订单关闭：</span>专家取消订单，并推荐了相关专家&nbsp;<span class="link_text">朱两边2</span>&nbsp;,可转至其推荐专家详情页了解推荐专家并重新发起咨询。
          </div>
          <div class="order_time">订单关闭时间：2018-12-14 00:00:00</div>
        </div>

        <!-- 专家修改订单-->
        <div class="bottom_block" v-if="orderStatus == 2">
          <div class="question">
              <span class="question_title">订单变更：</span>专家已变更订单信息，<span class="colorful_text">订单费用由66元变更至88元，作答时间由</span>，请重新确认订单信息。
          </div>
          <div class="order_time">订单变更时间：2018-12-14 00:00:00</div>
        </div>

        <div class="bottom_block" v-if="orderStatus == 4 || orderStatus == 5 || orderStatus == 6">
          <div class="question">
              <span class="question_title">作答内容：</span>我是作答内容我是作答，内容我是作答内容我是作答内容我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容，我是作答内容我是作答内容我是作答内容。
          </div>
          <div class="question_files">
             <div class="question_files_title">相关附件：</div>
             <div class="img_block">
               <img src="../../../static/img/avatar.jpeg" alt="">
             </div>
          </div>

          <div class="order_time">作答时间：2018-12-14 00:00:00</div>
        </div>
        
        <div v-if="userId == 'u'">
           <!-- 待接单时客户的操作 -->
           <div class="other_msg_block" v-if="orderStatus == 1">
             <span class="other_msg">在专家接单前，您可取消订单哦</span>
             <span class="action_btn2">取消订单</span>
           </div>
   
           <!-- 专家修改订单信息后客户的操作 -->
           <div class="other_msg_block" v-if="orderStatus == 2">
             <span class="other_msg">订单信息已修改，请确认是否同意</span>
             <span class="action_btn2">不同意</span>
             <span class="action_btn">同意</span>
           </div>
   
           <!-- 专家回答后用户可进行的操作 -->
           <div class="other_msg_block" v-if="orderStatus == 4 && payStatus == 'N'">
             <span class="other_msg">如果您对作答满意，请支付费用~</span>
             <div class="action_btn_bar">
                 <span class="action_btn2" @click="toAskMore(1)">追问</span>
                 <span class="action_btn" @click="toPay">马上支付</span>
             </div>
           </div>
   
            <!-- 用户支付中时的提示 -->
           <div class="other_msg_block" v-if="orderStatus == 4 && payStatus == 'Y'">
             <span class="other_msg">您已提交支付，请等待专家确认。专家确认后您可继续追问~</span>
           </div>
   
           <!-- 用户支付完成后可进行的操作 -->
           <div class="other_msg_block" v-if="orderStatus == 5">
             <span class="other_msg">您已完成支付，可进行评价或追问~</span>
             <div class="action_btn_bar">
                 <span class="action_btn2" @click="toAskMore(2)">追问</span>
                 <span class="action_btn" @click="toComment">立即评价</span>
             </div>
           </div>
        </div>


        <div v-if="userId == 'e'">
          <!-- 待接单时专家的操作 -->
          <div class="ex_action_block" v-if="orderStatus == 1">
              <div class="action_btn_bar">
                <span class="action_btn2"  @click="toEditOrder">修改订单</span>
                <span class="action_btn2" @click="toRejectOrder">取消订单</span>
                <span class="action_btn">马上接单</span>
             </div>
          </div>
  
          <!-- 修改订单后等待用户确认 -->
          <div class="other_msg_block" v-if="orderStatus == 2">
            <span class="other_msg">您已修改订单信息，请等待用户确认~</span>
          </div>
  
          <!-- 已接单时专家的操作 -->
          <div class="ex_action_block" v-if="orderStatus == 3">
              <div class="action_btn_bar">
                <span class="action_btn" @click="toAnswerPage">马上作答</span>
             </div>
          </div>
          <!-- 用户支付完成后可进行的操作 -->
          <div class="other_msg_block" v-if="orderStatus == 4">
            <span class="other_msg">用户已提交支付，请及时确认~</span>
            <div class="action_btn_bar">
                <span class="action_btn2">未到账</span>
                <span class="action_btn">已到账</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>


  </div>
</template>
<script>

export default {
  data () {
    return {
      orderStatus:0,
      userId:'',
      payStatus:'N',
      rejectType:1, //1:用户取消 2：专家取消并没相关推荐 3:专家取消有相关推荐
    }
  },

  components: {
    
  },

  methods: {
    // 专家修改订单
    toEditOrder(){
      this.$router.push({path:'/pages/editOrder/index',query:{orderId:1}})
    },
    // 专家拒绝订单
    toRejectOrder(){
      this.$router.push({path:'/pages/cancelOrder/index',query:{orderId:1}})
    },

    // 专家去作答
    toAnswerPage(){
      this.$router.push({path:'/pages/answer/index',query:{orderId:1}})
    },
  
    // 用户去支付
    toPay(){
      this.$router.push({path:'/pages/pay/index',query:{orderId:1}})
    },

    // 用户去评论
    toComment(){
      this.$router.push({path:'/pages/comment/index',query:{orderId:1}})
    },

    // 用户去追问
    toAskMore(){

    }
  },
  created () {
   
  },
  onLoad: function (options) {
    this.orderStatus = options.status;
    this.userId = options.id;
  },
  onShow(){
  
  }
}
</script>
<style lang="less" scoped>
  .order_item .top_block {
    height: 96px;
  }
  .order_base_msg{
    padding:15px;
    background-color:#fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f5f7;
    .order_no{
      font-size: 14px;
      color: #666;
    }
    .order_status{
       display: flex;
       align-items: center;
       .time_count{
         font-size: 14px;
         color: #333;
         margin-right: 10px;
       }
      .status{
        font-size: 14px;
        color:#1fb7b6;
      }
    }
  }
</style>