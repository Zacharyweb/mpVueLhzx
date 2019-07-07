<template>
 <div class="order_item"  @click="toOrderDetail(orderData.id,'e')">
  <div class="order_msg0">
      <span class="order_no">订单编号：{{orderData.orderNo}}</span>
      <div class="order_status">
        <span class="time_count" v-show="showCount">{{hh}}:{{mm}}:{{ss}}</span>
        <span class="status_text" v-if="orderData.status == 0">待接单</span>
        <span class="status_text" v-if="orderData.status == 1">待重新确认</span>
        <span class="status_text" v-if="orderData.status == 2">待作答</span>   
        <span class="status_text" v-if="orderData.status == 3">已作答/待确认</span>  
        <span class="status_text" v-if="orderData.status == 4">已作答/待支付</span>
        <span class="status_text" v-if="orderData.status == 5">待专家确认收款</span> 
        <span class="status_text" v-if="orderData.status == 6">已支付/待评价</span>    
        <span class="status_text grey" v-if="orderData.status == 7">已完成</span> 
        <span class="status_text red" v-if="orderData.status == 8">申诉中</span>   
        <span class="status_text grey" v-if="orderData.status == 9">已关闭</span>  
        <span class="status_text grey" v-if="orderData.status == -1">已取消</span>
      </div>
    </div>
    <div class="top_block">
      <img class="experts_avatar" :src="orderData.avatarUrl">
      <div class="top_block_right">
        <div class="order_msg1">
          <span class="experts_name">{{orderData.nickName}}</span>
          <!-- <span class="consult_msg" v-if="orderData.status == 0 || orderData.status == 1">作答时间：接单后确认</span>
          <span class="consult_msg" v-if="orderData.status == 2">最晚作答时间：{{orderData.lastAnswerTime}}</span>
          <span class="consult_msg" v-if="orderData.status == 3 || orderData.status == 4 || orderData.status == 5 || orderData.status == 6 || orderData.status == 7 || orderData.status == 8">作答时间：2888/08/18 18:28</span> -->
        </div>
        <div class="consult_time_msg">
          <span v-if="orderData.status == 0 || orderData.status == 1">作答时间：接单后确认</span>
          <span v-if="orderData.status == 2">最晚作答时间：{{orderData.lastAnswerTime}}</span>
          <span v-if="orderData.actualAnswerTime">作答时间：{{orderData.actualAnswerTime}}</span>
        </div>
        <div class="order_msg2">
          <span class="customer_info">{{orderData.orderUserDesc}}</span>
          <span class="consult_price">￥{{orderData.amount || '0'}}</span>
        </div>
      </div>
    </div>
    <div class="bottom_block">
      <div class="question">
          <span class="question_title">问题：</span>{{orderData.questionRemark}}
      </div>
      <div class="order_time">{{orderData.creationTime}}</div>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 2">
      <span class="other_msg">您已接单，请及时完成作答~</span>
      <span class="action_btn">马上作答</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 5">
      <span class="other_msg">用户已支付，请及时确认收款~</span>
      <span class="action_btn">前往确认</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 8">
      <span class="other_msg">订单申诉中，请留意平台的结果通知</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['orderData'],
  data () {
    return {
      hh:'00',
      mm:'00',
      ss:'00',
      timer:null,
      showCount:false
    }
  },
  create(){

  },
  onLoad(){
    this.initCount();
  },
  onShow(){
    clearInterval(this.timer);
    this.showCount = false;
    if(!this.isCounting){
      this.initCount();
    } 
  },
  onHide(){
    clearInterval(this.timer);
    this.showCount = false;
    this.isCounting = false;
  },
  methods: {
    toOrderDetail(orderId,userType){
      this.$router.push({path:'/pages/consultDetail/index',query:{orderId:orderId,userType:userType}});
    },
    initCount(){
      // this.countDown(300);
      this.isCounting = true;
      if(this.orderData.status == 0 && this.orderData.leaveReceiptTime >=0){
        if(this.orderData.leaveReceiptTime <=300){
          this.countDown(this.orderData.leaveReceiptTime);
        }
      }else if(this.orderData.status == 2 && this.orderData.leaveAnswerTime >=0){
        console.log(this.orderData.leaveAnswerTime);
        if(this.orderData.leaveReceiptTime <= 3600){
          this.countDown(this.orderData.leaveAnswerTime);
        }
      }
    },
    countDown(leaveTime){
      let counts = leaveTime;

      this.timer = setInterval(()=>{
        let hh = Math.floor(counts / 3600);
        this.hh = hh < 10 ? '0' + hh : hh;
        let mm = Math.floor(counts % 3600 / 60);
        this.mm = mm < 10 ? '0' + mm : mm;
        let ss = counts % 60;
        this.ss = ss < 10 ? '0' + ss : ss;
        if(!this.showCount){
          this.showCount = true;
        };
        counts--;
        if(counts < 0){
          this.showCount = false;
          clearInterval(this.timer);
        }
      },1000)
    }

  }
}
</script>
<style lang="less" scoped>

</style>
