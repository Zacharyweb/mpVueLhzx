<template>
 <div class="order_item"  @click="toOrderDetail(orderData.id,'e',orderData.status)">
  <div class="order_msg0">
      <span class="order_no">订单编号：{{orderData.orderNo}}</span>
      <div class="order_status">
        <span class="status_text" v-if="orderData.status == 0">待接单</span>
        <span class="status_text" v-if="orderData.status == 1">待重新确认</span>
        <span class="status_text" v-if="orderData.status == 2">待作答</span>   
        <span class="status_text" v-if="orderData.status == 4">已作答/待支付</span>  
        <span class="status_text" v-if="orderData.status == 6">待确认收款</span>
        <span class="status_text grey" v-if="orderData.status == 7">已完成</span> 
        <span class="status_text red" v-if="orderData.status == 8">待协商</span>   
        <span class="status_text grey" v-if="orderData.status == 9">已关闭</span> 
      </div>
    </div>
    
    <div class="top_block">
      <img class="experts_avatar" :src="orderData.userAvataUrl">
      <div class="top_block_right">
        <div class="order_msg1">
          <span class="experts_name">{{orderData.userNickName}}</span>
          <span class="consult_price">￥{{orderData.amount || '0'}}</span>
        </div>
        <div class="order_msg2">
          <span class="customer_info">{{orderData.userDesc}}</span>
        </div>
      </div>
    </div>

    <div class="bottom_block">
      <div class="question text_ellipsis">
          <span class="question_title">问题：</span>{{orderData.questionRemark}}
      </div>
      <div class="order_time" v-if="orderData.status == 0 || orderData.status == 1">提问时间：{{orderData.creationTime}}</div>
      <div class="order_time" v-if="orderData.status == 2">接单时间：{{orderData.actualAnswerTime}}</div>
      <div class="order_time" v-if="orderData.status == 4 || orderData.status == 8">作答时间：{{orderData.actualAnswerTime}}</div>
      <div class="order_time" v-if="orderData.status == 6">专家收款二维码发送时间：{{orderData.creationTime}}</div>
      <div class="order_time" v-if="orderData.status == 7">到账时间：{{orderData.creationTime}}</div>
      <div class="order_time" v-if="orderData.status == 9">关闭时间：{{orderData.closerTime}}</div>
    </div>

    <div class="other_msg_block" v-if="orderData.status == 0">
      <span class="other_msg">请在{{orderData.lastReceiptTimeOfMinute}}分钟内接单</span>
      <span class="action_btn">看订单</span>
    </div>
    
    <div class="other_msg_block" v-if="orderData.status == 2">
      <span class="other_msg">请在{{orderData.answeringTime/60}}小时内作答</span>
      <span class="action_btn">马上作答</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 6">
      <span class="other_msg">{{orderData.remark}}</span>
      <span class="action_btn">前往确认</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 8">
      <span class="other_msg">{{orderData.remark}}</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 9">

      <span class="other_msg" v-if="orderData.closeType==0" >系统关闭{{orderData.remark?','+orderData.remark:""}}</span>
      <span class="other_msg" v-if="orderData.closeType==1" >用户关闭{{orderData.remark?','+orderData.remark:""}}</span>
      <span class="other_msg" v-if="orderData.closeType==2" >专家关闭{{orderData.remark?','+orderData.remark:""}}</span>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['orderData'],
  computed:{
    ...mapState({
      i18n: state => state.counter.i18n
    })
  },
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
    toOrderDetail(orderId,userType,status){
      this.$router.push({
        path:'/pages/consultDetail/index',
        query:{
          orderId:orderId,
          userType:userType,
          orderStatus:status
        }
      });
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
    }

  }
}
</script>
<style lang="less" scoped>

</style>
