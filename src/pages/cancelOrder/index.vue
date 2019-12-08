<template>
  <div class="container">
    <div class="order_reject_panel show">
      <div class="order_base_msg">
        <div class="order_no"><span>{{i18n.orderNo}}：</span>{{orderData.orderNo}}</div>
        <div class="order_status">
          <span class="status">{{i18n.to_be_confirmed}}</span>
        </div>
      </div>
  
      <div class="orders_list">
        <div class="order_item">
          <div class="top_block">
            <img class="experts_avatar" :src="orderData.userAvataUrl">
            <div class="top_block_right">
              <div class="order_msg1">
                <div class="experts_name">{{orderData.userNickName}}</div>
              </div>
              <div class="order_msg2">
                  <div class="customer_info">
                   <span>{{orderData.userDesc}}</span>
                  </div>
              </div>
              <span class="cost_amount">￥{{orderData.amount}}</span>
            </div>
          </div>
        </div>
      </div>
   
      <div class="quick_reson_list">
  
        <div class="reson_item"  @click="changeResonId(1)">
          <span class="custom_checkbox" :class="{'active': rejectResonId == 1}"></span>
          <span class="reson_text">{{i18n.LANGTYPE == 'cn_j'?'不好意思，最近忙不过来，希望下次能再为你服务。':'Sorry,too busy to work on this.Hope that Ican be of service next time'}}</span>
        </div>

        <div class="reson_item"  @click="changeResonId(2)">
          <span class="custom_checkbox" :class="{'active': rejectResonId == 2}"></span>
          <span class="reson_text">{{i18n.LANGTYPE == 'cn_j'?'不好意思，这个问题不在我的专业领域，希望下次能再为你服务。':'Sorry,this question is beyond my area of expertise.Hope that Ican be of servise next time'}}</span>
        </div>

        <div class="reson_item" @click="changeResonId(4)">
          <span class="custom_checkbox" :class="{'active': rejectResonId == 4}"></span>
          <span class="reson_text">{{i18n.Other_reasons}}</span>
        </div>
      </div>

      <div class="input_block" v-if="rejectResonId == 4">
        <textarea v-if="!modalShow" class="text_area" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入其他原因':'please enter other reason'" v-model="closeDesc"></textarea>
      </div>


      <div class="quick_reson_list">
        <div class="reson_item" >
          <span class="reson_text bold">{{i18n.LANGTYPE == 'cn_j'?'推荐同业好友':'recommend other advisors'}}&nbsp;</span>
          <span class="item_content blue" @click="toSelectOtherExpert" v-show="otherExpertId == 0">{{i18n.LANGTYPE == 'cn_j'?'去选择专家好友 ':'choose from "my friends"'}}</span>
          <span class="item_content" @click="toSelectOtherExpert" v-show="otherExpertId != 0">{{i18n.LANGTYPE == 'cn_j'?'已选择专家':'advisors you want to be recommend'}}-{{selectedOtherExpertName}}</span>
        </div>
      </div>

    

      <div class="btn_block" style="padding-bottom:10px;">
        <div class="btn large green" @click="submit">{{i18n.done}}</div>
      </div> 
      <div class="btn_bottom_tips">{{i18n.LANGTYPE == 'cn_j'? '请在'+ orderData.responseTime + '分钟内回应':'please submit in '+ orderData.responseTime + ' minutes'}}</div>

    </div>

    <div class="friends_list" :class="{'show':friendsListShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="cancelOtherExpert">{{i18n.cancel}}</span>
        <span class="title">{{i18n.LANGTYPE == 'cn_j'?'选择推荐专家':'select advisors'}}</span>
        <span class="submit_btn" @click="submitOtherExpert">{{i18n.done}}</span>
      </div>
      
      <div class="friend_item" v-for="(item,index) in friendsList" :key="index" @click="selectOtherExpertChange(index)">
        <div class="left">
          <img class="friend_avatar" :src="item.avatarUrl">
          <div class="friend_msg">
            <div class="friend_name">{{item.nickName}}</div>
            <!-- <div class="friend_position">{{item.position}}</div> -->
          </div>
        </div>
        <span class="select_icon" :class="{'actived':item.flag}"></span>
      </div>
    
    </div>
    <van-dialog id="van-dialog"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
      closeDesc:'',
      rejectResonId:1,
      orderId:0,

      otherExpertId:0,
      selectedOtherExpertName:'',
      friendsList:[],
      friendsListShow:false,
      amount: this.amount*1,
     

      orderData:{},
      modalShow:false
     
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },
  methods: {
    getExpertFriendsList(){
      this.$http.request({
        url:'GetUserFriendList',
        data:{
          userId: this.userData.userId,
          isExpert:1
        },
        flyConfig:{
          method: 'post',
        },
        config:{
          hideMsg:true
        }
      }).then(res => {
        if(res.code == 1){
          res.data.forEach(item => {
            item.flag = false;
          }); 
          this.friendsList = res.data || [];
        }
      })
    },
    
    changeResonId(flag){
      if(this.rejectResonId == flag) return;
      this.rejectResonId = flag;
    },

    toSelectOtherExpert(){
      if(this.friendsList.length == 0){
        this.showToast('没有可选择的专家好友');
        return;
      }
      this.friendsListShow = true;
    },
    // 选择其他专家变动
    selectOtherExpertChange(index){
      let flag = this.friendsList[index].flag;
      this.friendsList.forEach(item => {
        item.flag = false;
      });
      if(!flag){
        this.friendsList[index].flag =  true;
      }
    },
    submitOtherExpert(){
      this.otherExpertId = 0;
      let obj = {};
      this.friendsList.forEach(item => {
        if(item.flag){
          this.otherExpertId = item.id;
          this.selectedOtherExpertName = item.nickName;
        }
      });
      this.friendsListShow = false;
    },

    cancelOtherExpert(){
      this.otherExpertId = 0;
      this.friendsList.forEach(item => {
        item.flag = false;
      }); 
      this.friendsListShow = false;
    },
  
    submit(){
      let closeDesc;
      if(this.rejectResonId == 1){
        closeDesc = '不好意思，最近忙不过来，希望下次能再为你服务。';
      }else if(this.rejectResonId == 2){
        closeDesc = '不好意思，这个问题不在我的专业领域，希望下次能再为你服务。';
      }else{
        if(!this.closeDesc){
           this.showToast('请填写其他原因');
           return;
        }else{
          closeDesc = this.closeDesc;
        }
      }

      this.modalShow = true;
      Dialog.confirm({
        title: this.i18n.Confirm_decline,
        message: '您确定取消该订单吗？'
      }).then(() => {
        this.modalShow = false;
        this.$http.request({
          url:'ExpertClosed',
          data:{
            closeType: 2,
            closeDesc: closeDesc,
            closerId: this.userData.userId,
            orderId:this.orderId*1,
            otherExpertId:this.otherExpertId?this.otherExpertId:0
          },
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          this.modalShow = false;
          if(res.code == 1){
            this.showToast(this.i18n.LANGTYPE == 'cn_j'?'订单已取消':'Order closed');
            setTimeout(()=>{
              this.$router.go(-1);
            },1500);
          }
        })
      }).catch(() => {
        this.modalShow = false;
      });
    }
  },
  created () {
   
  },
  onLoad: function (options) {
    this.modalShow = false;
    this.orderId = options.orderId;
    this.otherExpertId = 0;
    this.amount = options.amount;
    this.friendsListShow = false;
    
    this.orderData = wx.getStorageSync('orderData');
    this.getExpertFriendsList();
  },
  onShow(){

  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
  }
}
</script>
<style lang="less" scoped>
  .order_reject_panel{
    position: fixed;
    transform: translateX(100%);
    transition: all 0.3s;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    &.show{
      transform: translateX(0);
    }
    .panel_top{
      display: flex;
      align-items: center;
      height: 40px;
      padding:0 10px;
      .cancel_btn{
        width: 60px;
        font-size: 13px;
        color: #333;
      }
      .title{
        flex: 1;
        font-size: 15px;
        text-align: center;
        color: #333;
      }
      .submit_btn{
        width: 60px;
        height: 24px;
        border-radius: 3px;
        font-size: 13px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #1fb7b6;
      }
    }
    .quick_reson_list{
      margin:0 20px;
      padding-top: 15px;
      .reson_item{
        display: flex;
        padding :10px 0;
        .custom_checkbox{
          padding-left: 20px;
          margin-right: 0;
        }
        .reson_text{
          &.bold{
            font-weight: bold;
          }
          font-size: 13px;
          line-height: 1.5;
        }
        .item_content{
          &.bule{
            color: #0c6ad4;
          }
          font-size: 14px;
          color: #666;
          margin-right: 10px;
        }
      }
    }
    .input_block{
      padding:0 20px;
      display: flex;
      .text_area{
        flex: 1;
        height: 80px;
        padding:10px;
        font-size: 14px;
        border:1px solid #eee;
        border-radius: 4px;
        background-color: #fafafa;
      }
    }
  }
  .panel_top{
    display: flex;
    align-items: center;
    height: 40px;
    padding:0 10px;
    .cancel_btn{
      width: 60px;
      font-size: 13px;
      color: #333;
    }
    .title{
      flex: 1;
      font-size: 15px;
      text-align: center;
      color: #333;
    }
    .submit_btn{
      width: 60px;
      height: 24px;
      border-radius: 3px;
      font-size: 13px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1fb7b6;
    }
  }
  .friends_list{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    transform: translateY(100%);
    transition: all 0.3s;
    z-index: 9;
    &.show{
       transform: translateY(0);
    }
    .friend_item{
      margin:0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      border-bottom: 1px solid #f3f3f3;
      padding-right: 10px;
      .left{
        display: flex;
        align-items: center;
        .friend_avatar{
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border:2px solid #eee;
          margin-right: 10px;
        }
        .friend_msg{
          .friend_name{
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
          }
          .friend_position{
            font-size: 13px;
            color: #666;
          }
        }
      }
      .select_icon{
        width: 16px;
        height: 16px;
        border: 1px solid #e3e3e3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &.actived::after{
          content: '';
          width: 10px;
          height: 10px;
          background-color: #1fb7b6;
          border-radius: 50%;
        }
      }
    }
  }
  .btn_block{
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  .order_base_msg{
    padding:15px;
    background-color:#fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f5f7;
    .order_no{
      span{
        font-size: 14px;
      }
      font-size: 12px;
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
      .status.grey{
        color: #ccc;
      }
      .status.red{
        // color: #e96900;
        color: #fa3200;
      }
      .status.blue{
        color: #1fb7b6;
      }
    }
  }
  .btn_bottom_tips{
    font-size: 12px;
    color: #666;
    text-align: center;
  }
</style>