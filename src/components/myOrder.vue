<template>
 <div class="order_item"  @click="toOrderDetail(1,'u')">
    <div class="order_msg0">
      <span class="order_no">订单号：{{orderData.orderNo}}</span>
      <div class="order_status">
        <span class="time_count" v-show="showCount">{{hh}}:{{mm}}:{{ss}}</span>
        <span class="status_text" v-if="orderData.status == 0">待接单</span>
        <span class="status_text" v-if="orderData.status == 1">待重新确认</span>
        <span class="status_text" v-if="orderData.status == 2">待作答</span>   
        <span class="status_text" v-if="orderData.status == 3">已作答/待确认</span>  
        <span class="status_text" v-if="orderData.status == 4">已作答/待支付</span>   
        <span class="status_text" v-if="orderData.status == 5">已作答/待评价</span>    
        <span class="status_text grey" v-if="orderData.status == 6">已完成</span> 
        <span class="status_text red" v-if="orderData.status == 7">申诉中</span>   
        <span class="status_text grey" v-if="orderData.status == 8">已关闭</span>  
      </div>
    </div>
    <div class="top_block">
      <img class="experts_avatar" :src="orderData.avatarUrl">
      <div class="top_block_right">
        <div class="order_msg1">
          <span class="experts_name">{{orderData.nickName}}</span>
          <span class="consult_msg" v-if="orderData.status == 0 || orderData.status == 1">作答时间：接单后确认</span>
          <span class="consult_msg" v-if="orderData.status == 2">最晚作答时间：{{orderData.lastAnswerTime}}</span>
          <span class="consult_msg" v-if="orderData.status == 3 || orderData.status == 4 || orderData.status == 5 || orderData.status == 6 || orderData.status == 7">作答时间：2888/08/18 18:28</span>
        </div>
        <div class="order_msg2">
          <span class="experts_position">{{orderData.companyPosition}}&nbsp;|&nbsp;{{orderData.companyName}}</span>
          <span class="consult_price">￥{{orderData.price*orderData.quantity}}</span>
        </div>
      </div>
    </div>
    <div class="bottom_block">
      <div class="question">
          <span class="question_title">问题：</span>{{orderData.questionRemark}}
      </div>
      <div class="order_time">{{orderData.creationTime}}</div>
    </div>
    <div class="other_msg_block">
      <span class="other_msg">专家已修改订单信息，请重新确认</span>
      <span class="action_btn">前往确认</span>
    </div>
    <!-- <div class="other_msg_block">
      <span class="other_msg">专家已作答，请及时确认</span>
      <span class="action_btn">前往确认</span>
    </div>
    <div class="other_msg_block">
      <span class="other_msg">订单待支付80元，请及时完成支付</span>
      <span class="action_btn">前往支付</span>
    </div>
    <div class="other_msg_block">
      <span class="other_msg">订单支付完成，可对专家进行评价</span>
      <span class="action_btn" @click="toComment">去评价</span>
    </div> -->
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
    toOrderDetail(status,id){
      this.$router.push({path:'/pages/consultDetail/index',query:{status:status,id:id}});
    },
    initCount(){
      // this.countDown(300);
      this.isCounting = true;
      if(this.orderData.status == 0 && this.orderData.leaveReceiptTime >=0){
        if(this.orderData.leaveReceiptTime <=300){
          this.countDown(this.orderData.leaveReceiptTime);
        }
      }else if(this.orderData.status == 2 && this.orderData.leaveAnswerTime >=0){
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
    },
    toComment(){
       this.$router.push({path:'/pages/comment/index',query:{orderId:1}});
    },

  }
}
</script>
<style lang="less" scoped>

</style>
