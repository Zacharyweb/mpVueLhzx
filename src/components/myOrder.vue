<template>
 <div class="order_item"  @click="toOrderDetail(orderData.id,'u',orderData.status)">
    <div class="order_msg0">
      <span class="order_no">{{i18n.orderNo}}：{{orderData.orderNo}}</span>
      <div class="order_status">
        <!-- <span class="time_count" v-show="showCount">{{hh}}:{{mm}}:{{ss}}</span> -->
        <span class="status_text" v-if="orderData.status == 0">{{i18n.to_be_confirmed}}</span>
        <span class="status_text" v-if="orderData.status == 1">{{i18n.to_be_reconfirmed}}</span>
        <span class="status_text" v-if="orderData.status == 2">{{i18n.to_be_answer}}</span>   
        <span class="status_text" v-if="orderData.status == 4">{{i18n.to_be_paid}}</span>  
        <span class="status_text" v-if="orderData.status == 5">待专家确认收款</span>  
        <span class="status_text" v-if="orderData.status == 6">{{i18n.to_be_receipt}}</span>
        <span class="status_text grey" v-if="orderData.status == 7">{{i18n.completed}}</span> 
        <span class="status_text red" v-if="orderData.status == 8">{{i18n.to_be_resolved}}</span>   
        <span class="status_text grey" v-if="orderData.status == 9">{{i18n.closed}}</span>  
    
      </div>
    </div>
    <div class="top_block">
      <img class="experts_avatar" :src="orderData.expertAvataUrl">
      <div class="top_block_right">

        <div class="order_msg1">
          <span class="experts_name">{{orderData.expertNickName}}</span>
          <span class="consult_price">￥{{orderData.amount || '0'}}</span>
        </div>
        <div class="order_msg2">
          <span class="experts_position">{{orderData.expertCompanyPosition}}&nbsp;|&nbsp;{{orderData.expertCompanyName}}</span>
        </div>

      </div>
    </div>
    <div class="bottom_block">
      <div class="question text_ellipsis">
          <span class="question_title">{{i18n.query}}：</span>{{orderData.questionRemark}}
      </div>

      <div class="order_time" v-if="orderData.status == 0 || orderData.status == 1">{{i18n.Asked_at}}：{{orderData.creationTime}}</div>
      <div class="order_time" v-if="orderData.status == 2">{{i18n.accepted_at}}：{{orderData.actualReceiptTime}}</div>
      <div class="order_time" v-if="orderData.status == 4 || orderData.status == 8">{{i18n.replied_at}}：{{orderData.actualAnswerTime}}</div>
      <div class="order_time" v-if="orderData.status == 6">{{i18n.QR_Code_sent_at}}：{{orderData.confirm1Datetime}}</div>
      <div class="order_time" v-if="orderData.status == 7 && orderData.amount>0">{{i18n.paid_at}}：{{orderData.confirm3Datetime}}</div>
      <div class="order_time" v-if="orderData.status == 7 && orderData.amount==0">免单时间：{{orderData.lastModificationTime}}</div>   
      <div class="order_time" v-if="orderData.status == 9">{{i18n.Close_at}}：{{orderData.closerTime}}</div>

    </div>
    <div class="other_msg_block" v-if="orderData.status == 0">
      <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">专家会在 <span class="other_msg_text">{{orderData.responseTime}}</span>分钟内回应</span>
      <span class="other_msg" v-else>addvisor will respond in <span class="other_msg_text">{{orderData.responseTime}}</span> minutes</span>
    </div>

    <div class="other_msg_block" v-if="orderData.status == 1">
      <span class="other_msg">{{orderData.remark}}</span>
      <span class="action_btn">{{i18n.To_confirm}}</span>
    </div>

    <div class="other_msg_block" v-if="orderData.status == 2">
      <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">专家会在{{orderData.answeringTime/60}}小时内作答</span>
       <span class="other_msg" v-else>addvisor will answer in {{orderData.answeringTime/60}} hours</span>
    </div>

    <div class="other_msg_block" v-if="orderData.status == 4">
      <span class="other_msg">{{orderData.remark}}</span>
      <span class="action_btn">{{i18n.Go}}</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 6">
      <span class="other_msg">{{orderData.remark}}</span>
      <span class="action_btn">{{i18n.To_pay}}</span>
    </div>

    <div class="other_msg_block" v-if="orderData.status == 8||orderData.status == 7">
      <span class="other_msg">{{orderData.remark}}</span>
    </div>
    <div class="other_msg_block" v-if="orderData.status == 9">
      <span class="other_msg" v-if="orderData.closeType==0" >{{i18n.LANGTYPE == 'cn_j'?'系统关闭':'closed by system'}}{{orderData.remark?','+orderData.remark:""}}</span>
      <span class="other_msg" v-if="orderData.closeType==1" >{{i18n.LANGTYPE == 'cn_j'?'用户关闭':'closed by user'}}{{orderData.remark?','+orderData.remark:""}}</span>
      <span class="other_msg" v-if="orderData.closeType==2" >{{i18n.LANGTYPE == 'cn_j'?'专家关闭':'closed by advisor'}}{{orderData.remark?','+orderData.remark:""}}</span>
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
      showCount:false,
      isCounting:false

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
      this.$router.push({path:'/pages/consultDetail/index',query:{orderId:orderId,userType:userType,orderStatus:status}});
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
    }
    
  }
}
</script>
<style lang="less" scoped>

</style>
