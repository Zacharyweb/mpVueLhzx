<template>
  <div class="container">
    <!-- <div class="bind_bank_card">
      <van-cell-group>
        <van-field
          :value="account"
          required
          clearable
          label="开户人名称"
          placeholder="请输入开户人名称"
          bind:click-icon="onClickIcon"
          customStyle="background-color:#fff;"
        />
      
        <van-field
          :value="bankCode"
          type="number"
          label="卡号"
          placeholder="请输入卡号"
          required
          clearable
          customStyle="background-color:#fff;"
        />
        <van-field
          :value="city"
          label="开户人城市"
          placeholder="请输入开户人城市"
          required
          clearable
          customStyle="background-color:#fff;"
        />
      </van-cell-group>
      <div class="btn_block">
        <div class="btn large green">绑定银行卡</div>
      </div>
    </div> -->

    <div>
      <div class="bank_card_item">
        <img class="bank_icon" src="../../../static/img/bank_icon.png" alt="">
        <div class="bank_msg">
          <div class="bank_name">招商银行</div>
          <div class="bank_type">借记卡</div>
          <div class="bank_code">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>7498</span>
          </div>
        </div>
      </div>
      <div class="change_card_block">
        <span @click="chageCard">更换银行卡</span>
      </div>
      <van-dialog id="van-dialog"/>
    </div>


  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
     cashAmount:0,
     account:'',
     bankCode:'',
     city:''
    }
  },

  components: {
    
  },

  methods: {
    chageCard(){
      Dialog.alert({
        title: '提示',
        message: '如需更换银行卡请联系客服处理',
        confirmButtonText:'我知道了'
      }).then(() => {
        // on close
      });
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
.bind_bank_card{
  background-color: #fff;
  padding: 0 15px;
}
.btn_block{
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.bank_card_item{
  margin:15px auto;
  width: 305px;
  height:90px;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  color: #333;
  .bank_icon{
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .bank_msg{
    flex: 1;
    .bank_name{
      font-size: 14px;
    }
    .bank_type{
      margin-top: 5px;
      font-size: 12px;

    }
    .bank_code{
      margin-top: 20px;
      display: flex;
      align-items: center;
      span{
        font-size: 18px;
        margin-right: 25px;
      }
    }
  }
}
.change_card_block{
  margin-top: 20px;
  padding:0 20px;
  text-align: right;
  color: #666;
  font-size: 12px;
}
  
</style>