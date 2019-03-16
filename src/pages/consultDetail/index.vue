<template>
  <div class="container">
    <div class="order_base_msg">
      <div class="order_no">订单号：20190316010203</div>
      <div class="order_status" @click="changeStatus">
        <span class="status">待接单</span>
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
              <div  class="order_response">接单截至时间：2019-03-16 12:00:00</div>
              <!-- <div  class="order_deadline">作答截至时间：2019-03-16 12:00:00</div> -->
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

        <!-- <div class="bottom_block">
          <div class="question">
              <span class="question_title">订单关闭：</span>专家取消订单，原因：不好意思最近太忙没时间回复
          </div>
          <div class="order_time">订单关闭时间：2018-12-14 00:00:00</div>
        </div> -->

        <!-- <div class="bottom_block">
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
        </div> -->


        <!-- 待接单时客户的操作 -->
        <!-- <div class="other_msg_block">
          <span class="other_msg">在专家接单前，您可取消订单哦</span>
          <span class="action_btn2">取消订单</span>
        </div> -->

        <!-- 专家回答后用户可进行的操作 -->
        <!-- <div class="other_msg_block">
          <span class="other_msg">如果您对作答满意，请支付费用~</span>
          <div class="action_btn_bar">
              <span class="action_btn2">追问</span>
              <span class="action_btn">马上支付</span>
          </div>
        </div> -->

        <!-- 待接单时专家的操作 -->
        <!-- 
        <div class="ex_action_block">
            <div class="action_btn_bar">
              <span class="action_btn2">取消订单</span>
              <span class="action_btn">马上接单</span>
           </div>
        </div> -->

        <!-- 已接单时专家的操作 -->
        <div class="ex_action_block">
            <div class="action_btn_bar">
              <span class="action_btn">马上作答</span>
           </div>
        </div>

        <!-- 专家不接单时专家的操作 -->
        <!-- <div class="ex_action_block">
          <div class="reson_reject_block">
           
          </div>
          <div class="action_btn_bar">
            <span class="action_btn2">取消操作</span>
            <span class="action_btn">提交原因</span>
          </div>
        </div> -->

      </div>
    </div>

    <van-action-sheet
      :show="actionSheetShow"
      :actions="actions"
      @close="onCloseActionSheet"
      @select="onSelectAction"
    />
  </div>
</template>
<script>

export default {
  data () {
    return {
      currentTab:0,
      actionSheetShow:false,
      actions:[
        {
          targetId:1,
          name: '等待客户中',
          disabled: true
        },
        {
          targetId:2,
          name: '接待客户中'
        },
        {
          targetId:3,
          name: '离线中'
        },
        {
          targetId:4,
          name: '休假中'
        }
      ]

    }
  },

  components: {
    
  },

  methods: {
    changeStatus(){
      this.actionSheetShow = true;
    },
    onCloseActionSheet(){
      this.actionSheetShow = false;
    },
    onSelectAction(data){
      if(data.mp.detail.targetId == 1){
         
      }else{
       
      };
      this.actionSheetShow = false;
    },
  },
  created () {
  
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
</style>