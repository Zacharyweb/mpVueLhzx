<template>
  <div class="container">
    <div class="order_edit_panel show">
      <div class="order_base_msg">
        <div class="order_no"><span>订单号：</span>{{orderNo}}</div>
        <div class="order_status">
          <span class="status">待接单</span>
        </div>
      </div>
  
      <div class="orders_list">
        <div class="order_item">
          <div class="top_block">
            <img class="experts_avatar" :src="userAvatarUrl">
            <div class="top_block_right">
              <div class="order_msg1">
                <div class="experts_name">{{userName}}</div>
              </div>
              <div class="order_msg2">
                  <div class="customer_info">
                   <span>{{orderUserDesc}}</span>
                  </div>
              </div>
              <span class="cost_amount">{{amount}}元</span>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="panel_top">
        <span class="cancel_btn" @click="orderEditPanelShow = false">取消</span>
        <span class="title">修改订单</span>
        <span class="submit_btn">提交</span>
      </div> -->

      <div class="edit_list">
     
        <div class="edit_item alt">
          <span class="item_name">修改原因：</span>
          <textarea class="text_area" placeholder="请输入修改原因" v-model="closeDesc"></textarea>
        </div>

        <div class="edit_item">
          <span class="item_name">作答费用：</span>
          <!-- <van-stepper
            :value="amount"
            integer
            min="1"
            max="9999"
            step="1"
            @change="onAmountChange"
          /> -->
          <input class="amount_input" v-model="amount" type="number">
          <span class="item_unit">元</span>
        </div>

        <div class="edit_item">
          <span class="item_name">作答时间：</span>
          <span class="item_content" @click="timePickerShow = true">{{newLastAnswerTime}}</span>
          <img class="item_icon" @click="timePickerShow = true" src="../../../static/img/edit_icon.png">
        </div>

     

        <div class="btn_block" style="padding-bottom:10px;">
          <div class="btn large green" @click="submitModify">提交修改</div>
        </div>
        <div class="btn_bottom_tips">请在{{responseTime}}分钟内修改</div>

        <div class="time_picker_block" :class="{'show':timePickerShow}">
          <van-datetime-picker
           type="datetime"
           :value="currentDate"
           :min-date="minDate"
           :max-date="maxDate"
           @confirm="onTimeChange"
           @cancel="timePickerShow = false"
          />
        </div>

        <div class="time_picker_mask" v-show="timePickerShow" @click="timePickerShow = false"></div>

      </div>
      
    </div>
    <van-dialog id="van-dialog"/>

  </div>
</template>
<script>
import util from '../../utils/index.js'
import { mapState, mapActions } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
      orderId:'',
      timePickerShow:false,
      amount:0,
      oldAmount:'',
  
      minDate: new Date().getTime(),
      maxDate: new Date(2030, 10, 1).getTime(),
      currentDate: new Date().getTime(),
      lastAnswerTime:"",
      newLastAnswerTime:"",
      userAvatarUrl:'',
      orderNo:'',
      userName:'',
      orderUserDesc:'',
      responseTime:'',
      closeDesc:''
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },

  methods: {

    onClassNumChange(){
     
    },
    onTimeChange(e){
      this.newLastAnswerTime = util.formatTime(new Date(e.mp.detail));
      this.timePickerShow = false;
    },

    submitModify(){
      let lastAnswerTime = +new Date(this.lastAnswerTime);
      let newLastAnswerTime = +new Date(this.newLastAnswerTime); 

      if(lastAnswerTime == newLastAnswerTime && this.amount == this.oldAmount){
        this.showToast('未对订单做任何修改');
        return;
      };

      if(!this.closeDesc){
        this.showToast('请填写修改原因');
        return;
      };

      Dialog.confirm({
        title: '确认修改',
        message: '您对订单做出了修改,确定修改吗？'
      }).then(() => {
        this.$http.request({
          url:'ExpertModifyOrder',
          data:{
            id: this.orderId,
            modifyAmount: this.amount*1,
            modifyLastAnswerTime: this.newLastAnswerTime,
            modifyDesc:this.closeDesc
          },
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.showToast('已提交修改');
            setTimeout(()=>{
              this.$router.go(-1);
            },1500)
          }
        })
      }).catch(() => {
        
      });
    }
  },
  created () {
   
  },
  onLoad: function (options) {
    this.orderId = options.orderId;

    let orderData = wx.getStorageSync('orderData');
    this.oldAmount = orderData.amount;
    this.amount = orderData.amount || '0';
    this.lastAnswerTime = orderData.lastAnswerTime;
    this.newLastAnswerTime = util.formatTime(new Date(orderData.lastAnswerTime));
    this.currentDate = new Date(orderData.lastAnswerTime).getTime();

    this.orderNo = orderData.orderNo;
    this.userAvatarUrl = orderData.userAvataUrl;
    this.userName = orderData.userNickName;
    this.orderUserDesc = orderData.userDesc;
    this.responseTime = orderData.lastReceiptTimeOfMinute;
  },
  onShow(){

  },
}
</script>
<style lang="less" scoped>
  .order_edit_panel{
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
    .edit_list{
      padding:15px;
      .edit_item{
        display: flex;
        align-items: center;
        min-height: 45px;
        &.alt{
          align-items: flex-start;
        }
        .item_name{
          margin-right: 5px;
          font-size: 14px;
          color: #333;
        }
        .amount_input{
          padding:0;
          border-bottom:  1px solid #bbb;
          width: 60px; 
          text-align: center;
          font-size: 16px;
          color: #000;
        }
        .item_unit{
          font-size: 14px;
          color: #333;
          margin-left: 5px;
        }
        .item_content{
          font-size: 14px;
          color: #666;
          margin-right: 10px;
        }
        .item_icon{
          width: 18px;
          height: 18px;

        }

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
    .time_picker_block{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      z-index: 2;
      transform: translateY(100%);
      transition: all 0.3s;
      &.show{
        transform: translateY(0);
      }
    }
    .time_picker_mask{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
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
        color: #2d8cf0;
      }
    }
  }
  .btn_bottom_tips{
    font-size: 12px;
    color: #666;
    text-align: center;
  }
</style>