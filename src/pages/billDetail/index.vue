<template>
  <div class="container">
    <div class="bill_detail_top">
      <div class="bill_detail_msg1">
        <img class="bill_avatar" src="../../../static/img/avatar.jpeg">
        <div class="bill_target">客户朱两边</div>
        <div class="bill_amount">+100.00</div>
      </div>
    </div>

    <div class="bill_detail_bottom">
      <div class="bill_msg_line">
        <span class="text_l">当前状态：</span>
        <span class="text_r">到账成功</span>
      </div>
      <div class="bill_msg_line">
        <span class="text_l">收入金额：</span>
        <span class="text_r">￥100.00</span>
      </div>
      <div class="bill_msg_line">
        <span class="text_l">转账时间：</span>
        <span class="text_r">2018-12-24 00:00:00</span>
      </div>
      <div class="bill_msg_line">
        <span class="text_l">交易号：</span>
        <span class="text_r">201812010000000000001</span>
      </div>
      <div class="bill_msg_line">
        <span class="text_l">{{i18n.orderNo}}：</span>
        <span class="text_r">trade1111111111111111111</span>
      </div>
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
  .bill_detail_top{
    background-color: #fff;
    .bill_detail_msg1{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px 0;
      width: 345px;
      margin:0 auto;
      border-bottom: 1px solid #f3f5f7;
    }
    .bill_avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid #e6e8eb; 
    }
    .bill_target{
      font-size: 14px;
      margin-top: 8px;
    }
    .bill_amount{
      font-size: 24px;
      margin-top: 5px;
      font-weight: bold;
    }
  }
 .bill_detail_bottom{
    background-color: #fff;
    padding:10px 25px;
   
   .bill_msg_line{
      height: 30px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #666;
     .text_l{
       width: 90px;
     }
     .text_r{
       font-size: 13px;
       color: #999;
       flex: 1;
     }
   }
 }

</style>