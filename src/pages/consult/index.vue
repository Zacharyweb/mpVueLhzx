<template>
  <div class="container">
    <div class="custom_tabs">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">我的咨询</div>
      <div class="tab_item" :class="{'active':currentTab == 1}" @click="changeTab(1)">客户咨询</div>
      <span class="active_bar active25" :class="{'active75':currentTab == 1}"></span>
    </div>
    <div style="height:45px;"></div>

    <div class="orders_list" v-show="currentTab == 0">
      <!-- 待接单 -->
      <div class="order_item" v-for="(item,index) in myOrders" :key="index" @click="toOrderDetail(1,'u')">
        <div class="order_msg0">
          <span class="order_no">订单号：{{item.orderNo}}</span>
          <div class="order_status">
            <span class="time_count">{{item.hh}}:{{item.mm}}:{{item.ss}}</span>
            <span class="status_text" v-if="item.status == 0">待接单</span>
            <span class="status_text" v-if="item.status == 1">待重新确认</span>
            <span class="status_text" v-if="item.status == 2">待作答</span>   
            <span class="status_text" v-if="item.status == 3">已作答/待确认</span>  
            <span class="status_text" v-if="item.status == 4">已作答/待支付</span>   
            <span class="status_text" v-if="item.status == 5">已作答/待评价</span>    
            <span class="status_text grey" v-if="item.status == 6">已完成</span> 
            <span class="status_text red" v-if="item.status == 7">申诉中</span>   
            <span class="status_text grey" v-if="item.status == 8">已关闭</span>  
          </div>
        </div>

        <div class="top_block">
          <img class="experts_avatar" :src="item.avatarUrl">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">{{item.nickName}}</span>
              <span class="consult_msg" v-if="item.status == 0 || item.status == 1">作答时间：接单后确认</span>
              <span class="consult_msg" v-if="item.status == 2">最晚作答时间：{{item.lastAnswerTime}}</span>
              <span class="consult_msg" v-if="item.status == 3 || item.status == 4 || item.status == 5 || item.status == 6 || item.status == 7">作答时间：2888/08/18 18:28</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">{{item.companyPosition}}&nbsp;|&nbsp;{{item.companyName}}</span>
              <span class="consult_price">￥{{item.price*item.quantity}}</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>{{item.questionRemark}}
          </div>
          <div class="order_time">{{item.creationTime}}</div>
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

      <div class="no_data_tips" v-if="myOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png">
        <span>还没有相关订单哦~</span>
      </div>   
    </div>

    <div class="orders_list" v-show="currentTab == 1">
      <!-- 待接单 -->
      <div class="order_item" @click="toOrderDetail(1,'e')" v-for="(item,index) in customerOrders" :key="index">
        <div class="order_msg0">
          <span class="order_no">订单编号：{{item.orderNo}}</span>
          <div class="order_status">
            <span class="time_count">{{item.hh}}:{{item.mm}}.{{item.ss}}</span>
            <span class="status_text" v-if="item.status == 0">待接单</span>  
            <span class="status_text" v-if="item.status == 1">待重新确认</span>
            <span class="status_text" v-if="item.status == 2">待作答</span>   
            <span class="status_text" v-if="item.status == 3">已作答/待确认</span>  
            <span class="status_text" v-if="item.status == 4">已作答/待支付</span>   
            <span class="status_text" v-if="item.status == 5">已作答/待评价</span>    
            <span class="status_text grey" v-if="item.status == 6">已完成</span> 
            <span class="status_text red" v-if="item.status == 7">申诉中</span>   
            <span class="status_text grey" v-if="item.status == 8">已关闭</span>  
          </div>
        </div>
  
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">{{item.nickName}}</span>
              <span class="consult_msg" v-if="item.status == 0 || item.status == 1">作答时间：接单后确认</span>
              <span class="consult_msg" v-if="item.status == 2">最晚作答时间：{{item.lastAnswerTime}}</span>
              <span class="consult_msg" v-if="item.status == 3 || item.status == 4 || item.status == 5 || item.status == 6 || item.status == 7">作答时间：2888/08/18 18:28</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">{{item.orderUserDesc}}</span>
              <span class="consult_price">￥{{item.price*item.quantity}}</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>{{item.questionRemark}}
          </div>
          <div class="order_time">{{item.creationTime}}</div>
        </div>
        <div class="other_msg_block">
          <span class="other_msg">您已接单，请及时完成作答~</span>
          <span class="action_btn" @click="toComment">马上作答</span>
        </div>

      </div>

      <div class="no_data_tips" v-if="customerOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png">
        <span>还没有相关订单哦~</span>
      </div>   

    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import util from '../../utils/index.js'
import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
  data () {
    return {
      currentTab:0,
      myOrders:[],
      customerOrders:[],
      isLoading:false
    }
  },
  computed:{
    ...mapState({
      consultListTab: state => state.counter.consultListTab,
      userData: state => state.counter.userData
    })
  },

  components: {
    
  },

  methods: {
    changeTab(num){
      if(this.currentTab == num){
        return;
      }
      this.currentTab = num;
    },
    toOrderDetail(status,id){
      this.$router.push({path:'/pages/consultDetail/index',query:{status:status,id:id}});
    },
    toComment(){
       this.$router.push({path:'/pages/comment/index',query:{orderId:1}});
    },
    getUserOrderList(){
      this.isLoading = true;
      this.$http.request({
        url:'GetUserOrderList',
        data:{
          id:this.userData.userId
        }
      }).then(res => {
        this.isLoading = false;
        if(res.code == 1){
          res.data = [res.data[0]] || [];
          res.data.forEach(item => {
            item.creationTime = util.formatTime(new Date(item.creationTime));

            item.leaveReceiptTime = Math.ceil(((+new Date(item.lastReceiptTime)) - (+new Date()))  / 1000);
            item.lastReceiptTime = util.formatTime(new Date(item.lastReceiptTime));

            item.leaveAnswerTime = Math.ceil(((+new Date(item.lastAnswerTime)) - (+new Date())) / 1000);
            item.lastAnswerTime = util.formatTime(new Date(item.lastAnswerTime));

            // this.initItemCount(item,4735);
            
            // if(item.leaveReceiptTime >=0){
            //   this.initItemCount(item,item.leaveReceiptTim);
            // }else if( item.leaveAnswerTime >= 0){
            //   this.initItemCount(item,item.leaveAnswerTime);
            // }
          });
          this.myOrders = res.data;
          // this.initMyOrdersItemCount();
        }
      })
    },
    getExpertOrderList(){
      this.isLoading = true;
      this.$http.request({
        url:'GetExpertOrderList',
        data:{
          id:this.userData.userId
        }
      }).then(res => {
        this.isLoading = false;
        if(res.code == 1){
          res.data = res.data || [];
          res.data.forEach(item => {
            item.creationTime = util.formatTime(new Date(item.creationTime));

            item.leaveReceiptTime = (+new Date(item.lastReceiptTime)) - (+new Date());
            item.lastReceiptTime = util.formatTime(new Date(item.lastReceiptTime));
            
            item.leaveAnswerTime = (+new Date(item.lastAnswerTime)) - (+new Date());
            item.lastAnswerTime = util.formatTime(new Date(item.lastAnswerTime));

          });
          this.customerOrders = res.data;

        }
      })
    },
    initMyOrdersItemCount(){
      this.myOrders.forEach((item)=>{
        item.timer = null;
        let leaveTime = 0;
        if(item.status == 0 && item.lastReceiptTime > 0){
          leaveTime = item.lastReceiptTime;
        }
        if(item.status == 2 && item.lastReceiptTime > 0){
          leaveTime = item.lastReceiptTime;
        }
        if(leaveTime <= 0){
          return;
        }

        item.timer = setInterval(()=>{
          let hh = Math.floor(leaveTime / 3600);
          item.hh = hh < 10 ? '0' + hh : hh;
          console.log(obj);
          console.log(item.hh)
          let mm = Math.floor(leaveTime % 3600 / 60);
          item.mm = mm < 10 ? '0' + mm : mm;
          let ss = leaveTime % 60;
          item.ss = ss < 10 ? '0' + ss : ss;
          leaveTime--;
          if(leaveTime < 0){
            clearInterval(item.timer);
          }
        },1000)
      })
    }
  },
  created () {
  
  },
  onLoad: function (options) {
     console.log(options)
     this.currentTab = this.consultListTab;
  },
  onShow(){
    this.getUserOrderList();
    if(this.userData && this.userData.isExpert == 1){
      this.getExpertOrderList();
    }
  }

}
</script>
<style lang="less" scoped>
  .custom_tabs{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
</style>