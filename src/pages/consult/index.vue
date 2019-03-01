<template>
  <div class="container">
    <div class="expert_bar">
      <div class="expert_msg">
        <span class="name">朱两边</span>
        <span class="position">高级财务专家</span>
      </div>
      <div class="expert_status" @click="changeStatus">
        <span class="status">等待客户中</span>
        <img src="../../../static/img/arrow_down2.png" alt="">
      </div>
    </div>
    <div class="custom_tabs">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">待接单(2)</div>
      <div class="tab_item" :class="{'active':currentTab == 1}" @click="changeTab(1)">待回复(2)</div>
      <span class="active_bar" :class="{'move':currentTab == 1}"></span>
    </div>

    <div class="orders_list">
      <div class="order_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">高级财务专家</span>
            </div>
            <div class="order_msg2">
              <span class="order_status">待接单</span>
              <span class="consult_price">￥66/节</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
        <div class="other_msg_block">
          <span class="other_msg">3次问答，合计120元，待支付80元</span>
          <span class="action_btn">前往支付</span>
        </div>
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

  .expert_bar{
    padding:15px;
    background-color:#fff;
    display: flex;
    justify-content: space-between;
    .expert_msg{
      display: flex;
      align-items: flex-end;
      .name{
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }
      .position{
         margin-left: 10px;
         font-size: 13px;
         color: #999;
      }
    }
    .expert_status{
       display: flex;
       align-items: center;
      .status{
        font-size: 13px;
        color: #777;
      }
      img{
        margin-left: 5px;
        width: 12px;
        height: 9px;
      }

    }


  }
</style>