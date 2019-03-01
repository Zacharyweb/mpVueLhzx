<template>
  <div class="container">
    <div class="order_item">
      <div class="top_block">
        <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
        <div class="top_block_right">
          <div class="order_msg4">
            <span class="experts_name">朱两边</span>
            <span class="expert_position">高级财务专家</span>
          </div>
          <div class="order_msg2">
            <span class="order_status">咨询结束</span>
          </div>
        </div>
      </div>
      <div class="consult_detail">
        <div class="consult_msg_line">
          <span class="text_l">问答咨询</span>
          <span class="text_c">1次</span>
          <span class="text_r">40元</span>
        </div>
        <div class="consult_msg_line" style="margin-bottom:10px;">
          <span class="text_l">电话咨询</span>
          <span class="text_c">15次</span>
          <span class="text_r">40元</span>
        </div>
        <div class="consult_msg_line">
          <span class="text_l">总价</span>
          <span class="text_r">40元</span>
        </div>
        <div class="consult_msg_line">
          <span class="text_l">优惠金额</span>
          <span class="text_r">40元</span>
        </div>
        <div class="consult_msg_line">
          <span class="text_l">应付金额</span>
          <span class="text_r">40元</span>
        </div>
         <div class="consult_msg_line">
          <span class="text_l">实付金额</span>
          <span class="text_r">40元</span>
        </div>
        <div class="consult_msg_line">
          <span class="text_l">待付金额</span>
          <span class="text_r">40元</span>
        </div>
        <div class="consult_detail_router">
          <span class="text_l">咨询详情</span>
          <img class="icon_r" src="../../../static/img/arrow_right.png">
        </div>
      </div>
    </div>

    <div class="order_detail">
      <div class="order_detail_title">订单信息</div>
      <div class="order_msg_line">
        <span class="text_l">订单编号：</span>
        <span class="text_r">no1234567890</span>
        <span class="copy_btn">复制</span>
      </div>
      <div class="order_msg_line">
        <span class="text_l">创建时间：</span>
        <span class="text_r">2018-12-24 00:00:00</span>
      </div>
      <div class="order_msg_line">
        <span class="text_l">咨询结束时间：</span>
        <span class="text_r">2018-12-24 00:00:00</span>
      </div>
      <div class="order_msg_line">
        <span class="text_l">发起付款时间：</span>
        <span class="text_r">2018-12-24 00:00:00</span>
      </div>
    </div>

     <div class="bottom_fixed">
       <span class="action_btn1">前往支付</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
  
    }
  },
  components: {

  },

  methods: {
    toConsultDetail(){
      this.$router.push({
        path:'/pages/myFriends/index',
        query:{
          id:'1sb'
        }
      })
    }
  
  },
  created () {
  
  }
}
</script>
<style lang="less" scoped>
.order_msg4{
  display: flex;
  align-items: flex-end;
  .experts_name{
    font-size: 16px;
  }
  .expert_position{
    margin-left: 10px;
    font-size: 14px;
    color: #666;
  }
}
 .consult_detail{
   border-top: 1px solid #f3f5f7;
   padding: 5px 10px;
   .consult_msg_line{
     height: 30px;
     font-size: 14px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     color: #666;
     .text_l{

     }
     .text_c{
      
     }
     .text_r{

     }
   }
   .consult_detail_router{
      border-top: 1px solid #f3f5f7;
      margin-top: 10px;
      padding: 5px 0;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
     .text_l{

     }
     .icon_r{
        width: 9px;
        height: 12px;
     }
   }
 }

 .order_detail{
    margin-top: 10px;
    background-color: #fff;
    padding:10px 25px;
   .order_detail_title{
     font-size: 16px;
     line-height: 36px;
   }
   .order_msg_line{
      height: 30px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #666;
     .text_l{
       width: 110px;
       
     }
     .text_r{
       font-size: 13px;
       color: #999;
       flex: 1;

     }
     .copy_btn{
        color: #1fb7b6;
        border: 1px solid #1fb7b6;
        height: 18px;
        line-height:18px;
        font-size: 12px; 
        display: flex;
        align-items: center;
        padding:0 10px;
        border-radius: 13px;
     }
   }
 }


.container{
  padding-bottom: 50px;
}

</style>