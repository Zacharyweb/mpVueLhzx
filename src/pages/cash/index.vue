<template>
  <div class="container">

    <div class="cash_panel">

      <div class="bank_msg_block">
        <div class="block_title">到账银行卡</div>
        <div class="bank_msg" @click="toBankCard">
          <div class="bank_name">招商银行（7498）</div>
          <div class="cash_time">2小时内到账</div>
        </div>
        <img class="arrow_icon" @click="toBankCard" src="../../../static/img/arrow_right.png">
      </div>

      <div class="cash_block">
        <div class="block_title">提现金额</div>
        <div class="amount_input">
          <span>￥</span>
          <input v-model="cashAmount" class="input" type="number" >
        </div>
      </div>

      <div class="bottom_block">
        <div class="max_amount">账户余额￥77.90，<span>确认提现</span></div>
        <div class="cash_btn_block">
          <span class="cash_btn">全部提现</span>
        </div>
      </div>

    </div>
   
  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
     cashAmount:0
    }
  },

  components: {
    
  },

  methods: {
    toBankCard(){
      this.$router.push('/pages/bankCard/index');
    }
    
  },
  created () {
   
  },
  onShow(){
 
  }
}
</script>

<style lang="less" scoped>
.container{

}
.cash_panel{
  width: 345px;
  background-color: #fff;
  margin: 15px;
  border-radius: 4px;
  color: #333;
  .block_title{
    font-size: 13px;
    color: #000;
  }

  .bank_msg_block{
    display: flex;
    padding:15px 25px;
    background-color: #fbfbfb;
    border-radius: 4px 4px 0 0;
    .bank_msg{
      font-size: 12px;
      margin-left: 25px;
      flex: 1;
      .bank_name{

      }
      .cash_time{
        margin-top: 5px;
        color: #999;
      }
    }
    .arrow_icon{
      width: 9px;
      height: 12px;
    }
  }
  .cash_block{
    padding:25px;
    padding-bottom: 20px;
    .amount_input{
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom:  1px solid #d8d8d8;
      span{
        font-size: 25px;
        font-weight: bold;
        margin-right: 20px;
      }
      .input{
        font-size: 22px;
      }
    }
  }
  .bottom_block{
    padding:0 25px;
    padding-bottom: 30px;
    .max_amount{
      color: #999;
      font-size: 12px;
      span{
        margin-left: 4px;
        color: #1fb7b6;
      }
    }
    .cash_btn_block{
      margin-top: 20px;
      display: flex;
      .cash_btn{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: #1fb7b6;
        border-radius: 4px;
        font-size: 16px;
         
      }
    }

  }

}
</style>