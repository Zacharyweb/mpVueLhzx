<template>
  <div class="container">
    <div class="order_base_msg">
      <div class="order_no">订单号：20190316010203</div>
      <div class="order_status">
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
              <div class="experts_name">朱两边 <span>(高级财务专家)</span></div>
            </div>
            <div class="order_msg3">
              <div  class="order_response" v-if="orderStatus == 1 || orderStatus == 7">接单截至时间：2019-03-16 12:00:00</div>
              <div  class="order_deadline" v-if="orderStatus*1 >= 2 && orderStatus != 7">作答截至时间：2019-03-16 12:00:00</div>
              <div  class="order_class">作答节数：1节<span>(66元/节)</span></div>
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
               <img src="../../../static/img/avatar.jpeg" alt="">
               <img src="../../../static/img/avatar.jpeg" alt="">
               <img src="../../../static/img/avatar.jpeg" alt="">
               <img src="../../../static/img/avatar.jpeg" alt="">
             </div>
          </div>
          <div class="question" style="margin-top:5px">
              <span class="question_title">相关备注：</span>我是备注我是备注我是备注我是备注我是备注我是备注我是备注我是备注
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
              <span class="question_title">订单关闭：</span>专家取消订单，并推荐了相关专家&nbsp;<span class="link_text">朱两边</span>&nbsp;,可转至其推荐专家详情页了解推荐专家并重新发起咨询。
          </div>
          <div class="order_time">订单关闭时间：2018-12-14 00:00:00</div>
        </div>

        <!-- 专家修改订单-->
        <div class="bottom_block" v-if="orderStatus == 2">
          <div class="question">
              <span class="question_title">订单变更：</span>专家已变更订单信息,<span class="colorful_text">作答节数需要由1节变成2节</span>,请重新确认订单信息。
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
               <img src="../../../static/img/avatar.jpeg" alt="">
               <img src="../../../static/img/avatar.jpeg" alt="">
               <img src="../../../static/img/avatar.jpeg" alt="">
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
                 <span class="action_btn" @click="commentPanelShow = true">立即评价</span>
             </div>
           </div>
        </div>


        <div v-if="userId == 'e'">
          <!-- 待接单时专家的操作 -->
          <div class="ex_action_block" v-if="orderStatus == 1">
              <div class="action_btn_bar">
                <span class="action_btn2"  @click="orderEditPanelShow  = true">修改订单</span>
                <span class="action_btn2" @click="rejectPanelShow = true">取消订单</span>
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

    <!-- 用户评论组件 -->
    <div class="comment_panel" :class="{'show': commentPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="commentPanelShow = false">取消</span>
        <span class="title">发表评价</span>
        <span class="submit_btn">提交</span>
      </div>
      <div class="input_block">
        <textarea class="text_area" placeholder="请输入评价内容"></textarea>
      </div>
      
      <div class="select_list">
        <div class="select_item fbt">
          <div class="left">
            <img src="../../../static/img/comment_icon1.png">
            <span>满意程度</span>
          </div>
          <div class="right" @click="showActionSheet1">
            <span>满意</span>
            <img src="../../../static/img/arrow_right3.png">
          </div>
        </div>

        <div class="select_item fbt">
         <div class="left">
            <img src="../../../static/img/comment_icon2.png">
           <span>谁可以看</span>
         </div>
         <div class="right" @click="showActionSheet2">
           <span>仅自己</span>
           <img src="../../../static/img/arrow_right3.png">
         </div>
        </div>

        <div class="select_item">
         <div class="left">
            <img src="../../../static/img/comment_icon3.png">
            <span>专家可见</span>
         </div>
         <div class="right" @click="showActionSheet3">
           <span>不可见</span>
           <img src="../../../static/img/arrow_right3.png">
         </div>
        </div>
      </div>
    </div>

    <!-- 专家拒绝原因组件 -->
    <div class="order_reject_panel" :class="{'show': rejectPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="rejectPanelShow = false">取消</span>
        <span class="title">取消订单</span>
        <span class="submit_btn">提交</span>
      </div>
      <div class="quick_reson_list">
        <van-radio-group :value="rejectResonId" @change="rejectResonChange">
          <div class="reson_item">
            <van-radio name="1"></van-radio>
            <div class="reson_text">不好意思，最近忙不过来，希望下次能再为你服务。</div> 
          </div>
          <div class="reson_item">
            <van-radio name="2"></van-radio>
            <div class="reson_text">不好意思，这个问题不在我的专业领域，希望下次能再为你服务。</div> 
          </div>
        </van-radio-group>
      </div>
      <div class="input_block">
        <textarea class="text_area" placeholder="请输入其他原因"></textarea>
      </div>
    </div>

    <!-- 专家修改订单信息组件 -->
    <div class="order_edit_panel" :class="{'show':orderEditPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="orderEditPanelShow = false">取消</span>
        <span class="title">修改订单</span>
        <span class="submit_btn">提交</span>
      </div>
      <div class="edit_list">
        <div class="edit_item">
          <span class="item_name">作答节数：</span>
          <van-stepper
            :value="classNum"
            integer
            min="1"
            max="99"
            step="1"
            @change="onClassNumChange"
          />
        </div>
        <div class="edit_item">
          <span class="item_name">作答时间：</span>
          <span class="item_content" @click="timePickerShow = true">2019-03-17 23:34:00</span>
          <img class="item_icon" @click="timePickerShow = true" src="../../../static/img/edit_icon.png">
        
        </div>
        <div class="edit_item">
          <span class="item_name">推荐至其他专家：</span>
          <span class="item_content" @click="friendsListShow = true">选择专家好友</span>
          <img class="item_icon" @click="friendsListShow = true" src="../../../static/img/friend_icon2.png">
        
        </div>

        <div class="time_picker_block" :class="{'show':timePickerShow}">
          <van-datetime-picker
           type="datetime"
           :value="currentDate"
           :min-date="minDate"
           :max-date="maxDate"
           :bind:change="onTimeChange"
          />
        </div>
        <div class="time_picker_mask" v-show="timePickerShow" @click="timePickerShow = false"></div>

        <div class="friends_list" :class="{'show':friendsListShow}">
          <div class="panel_top">
            <span class="cancel_btn" @click="friendsListShow = false">取消推荐</span>
            <span class="title">选择推荐专家</span>
            <span class="submit_btn">提交</span>
          </div>
          <div class="friend_item">
            <div class="left">
              <img class="friend_avatar" src="../../../static/img/avatar.jpeg">
              <div class="friend_msg">
                <div class="friend_name">朱两边</div>
                <div class="friend_position">高级财务专家</div>
              </div>
            </div>
            <span class="select_icon actived"></span>
          </div>
          <div class="friend_item">
            <div class="left">
              <img class="friend_avatar" src="../../../static/img/avatar.jpeg">
              <div class="friend_msg">
                <div class="friend_name">朱两边</div>
                <div class="friend_position">高级财务专家</div>
              </div>
            </div>
            <span class="select_icon"></span>
          </div>
        </div>
      </div>
  
     
    </div>

    <van-action-sheet
      :show="actionSheet1Show"
      :actions="actions1"
      @close="closeActionSheet1"
      @select="selectAction1"
    />
    <van-action-sheet
      :show="actionSheet2Show"
      :actions="actions2"
      @close="closeActionSheet2"
      @select="selectAction2"
    />
    <van-action-sheet
      :show="actionSheet3Show"
      :actions="actions3"
      @close="closeActionSheet3"
      @select="selectAction3"
    />
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
      currentTab:0,
      rejectResonId:'2',
      commentPanelShow: false,
      rejectPanelShow: false,
      orderEditPanelShow: false,
      actionSheet1Show: false,
      timePickerShow:false,
      friendsListShow:false,
      actions1:[
        {
          targetId:1,
          name: '满意',
        },
        {
          targetId:2,
          name: '一般'
        },
        {
          targetId:3,
          name: '不满意'
        }
      ],

      actionSheet2Show:false,
      actions2:[
        {
          targetId:1,
          name: '仅自己',
        },
        {
          targetId:2,
          name: '选中关系户可见'
        }
      ],

      actionSheet3Show:false,
      actions3:[
        {
          targetId:1,
          name: '可见',
        },
        {
          targetId:2,
          name: '不可见'
        }
      ],
      classNum:1,
      minDate: new Date().getTime(),
      maxDate: new Date(2030, 10, 1).getTime(),
      currentDate: new Date().getTime()

    }
  },

  components: {
    
  },

  methods: {
    showActionSheet1(){
      this.actionSheet1Show = true;
    },
    showActionSheet2(){
      this.actionSheet2Show = true;
    },
    showActionSheet3(){
      this.actionSheet3Show = true;
    },
    closeActionSheet1(){
      this.actionSheet1Show = false;
    },
    closeActionSheet2(){
      this.actionSheet2Show = false;
    },
    closeActionSheet3(){
      this.actionSheet3Show = false;
    },
   
    selectAction1(data){
      if(data.mp.detail.targetId == 1){

      }else{
       
      };
      this.actionSheet1Show = false;
    },
    selectAction2(data){
      if(data.mp.detail.targetId == 2){
          // this.$router.push('/pages/editMobile1/index');
      }else{
       
      };
      this.actionSheet2Show = false;
    },
    selectAction3(data){
      if(data.mp.detail.targetId == 1){

      }else{
       
      };
      this.actionSheet3Show = false;
    },

    rejectResonChange(data){
 
      this.rejectResonId = data.mp.detail;

    },
    onClassNumChange(){

    },
    onTimeChange(){

    },

    toPay(){
      this.$router.push({path:'/pages/pay/index',query:{orderId:1}})
    },

    // 追问
    toAskMore(){

    },

    // 马上作答
    toAnswerPage(){
      this.$router.push({path:'/pages/answer/index',query:{orderId:1}})
    }


  },
  created () {
   
  },
  onLoad: function (options) {
    this.orderStatus = options.status;
    this.userId = options.id;
  },
  onShow(){
    this.commentPanelShow = false;
    this.rejectPanelShow = false;
    this.orderEditPanelShow = false;
    this.actionSheet1Show = false;
    this.actionSheet2Show = false;
    this.actionSheet3Show = false;
    this.timePickerShow = false;
    this.friendsListShow = false;

  }
}
</script>
<style lang="less" scoped>

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
      .status{
        font-size: 14px;
        color:#1fb7b6;
      }
    }
  }
  .comment_panel{
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
    .input_block{
      margin:15px;
      margin-bottom: 0;
      display: flex;
      border-bottom: 1px solid #f1f3f5;
      .text_area{
        width: 100%;
        height: 120px;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
      }
    }
    .select_list{
      margin:0 15px;
      border-bottom: 1px solid #f1f3f5;
      .select_item{
        display: flex;
        justify-content: space-between;
        height: 44px;
        align-items: center;
        margin-left: 5px;
        padding-right: 5px;
        position: relative;
        .left{
          display: flex;
          align-items: center;
          img{
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
          span{
            font-size: 14px;
            color: #333;

          }
        }
        .right{
          display: flex;
          align-items: center;
          span{
            font-size: 13px;
            color: #999;
            
          }
          img{
            width: 12px;
            height: 12px;
            margin-left: 10px;
          }
        }
        &.fbt::before{
          content: '';
          position: absolute;
          bottom: 0;
          left: 30px;
          right: 0;
          height: 1px;
          background-color: #f1f3f5;
        }
      }
    }
  }
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
        .reson_text{
          display: flex;
          flex-wrap: wrap;
          font-size: 13px;
          line-height: 1.5;
          margin-left: 10px;
        }
      }
    }
    .input_block{
      padding:0 20px;
      display: flex;
      .text_area{
        flex: 1;
        height: 80px;
        padding:15px;
        font-size: 14px;
        border:1px solid #eee;
        border-radius: 4px;
        background-color: #fafafa;
      }
    }
  }

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
        height: 40px;
        .item_name{
          margin-right: 5px;
          font-size: 14px;
          color: #333;
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

    .friends_list{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #fff;
      transform: translateY(100%);
      transition: all 0.3s;
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


      
  }

</style>