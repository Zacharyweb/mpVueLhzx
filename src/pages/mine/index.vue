<template>
  <div>
    <div class="mine_top_block">
      <img class="bg_img" src="../../../static/img/center_bg.png">
      <div class="mine_msg">
         <img class="mine_avatar" src="../../../static/img/avatar.jpeg">
         <div class="mine_txt_msg">
           <div class="mine_txt_line">
              <span class="mine_nick">朱两边</span>
              <span class="mine_position">高级财务专家</span>
           </div>
           <div class="mine_txt_line mt-10">
             <span class="mine_status">等待客户中</span>
             <img class="arrow_icon" src="../../../static/img/arrow_down.png">
           </div>
         </div>
         <img class="right_arrow" @click="linkTo('/pages/baseMsg/index')" src="../../../static/img/arrow_right2.png">
      </div>
      <div class="mine_account">
        <div class="mine_amount">
          <div class="amount">
            <span>￥</span>2300
          </div>
          <div class="item_name">账户余额</div>
        </div>
        <div class="action_btns">
          <div class="action_btn" @click="linkTo('/pages/cash/index')">提现</div>
          <div class="action_btn" @click="linkTo('/pages/billList/index')">账单明细</div>
        </div>
      </div>
    </div>

    <ul class="router_list">

      <li class="router_item" @click="linkTo('/pages/myClient/index')">
        <div class="item_left">
          <img src="../../../static/img/center_icon1.png">
          我的关系
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/myOrders/index')">
        <div class="item_left">
          <img src="../../../static/img/center_icon2.png">
          全部订单
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

      <!-- <li class="router_item" @click="linkTo('/pages/bankCard/index')">
        <div class="item_left">
          <img src="../../../static/img/center_icon3.png">
          银行卡
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li> -->
      <li class="router_item" @click="linkTo('/pages/becomeExpert/index')">
        <div class="item_left">
          <img src="../../../static/img/center_icon3.png">
          成为专家
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/myFriends/index')">
        <div class="item_left">
          <img src="../../../static/img/center_icon4.png">
          通用
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      count: state => state.counter.count
    })
  },
  mounted(){

  },
  methods: {
    ...mapActions('counter', [
      'increment',
      'decrement',
      'getProvince'
    ]),
    linkTo(path){
      this.$router.push(path);
    }
  }
}
</script>

<style lang="less">
.mine_top_block {
  height: 207px;
  font-size: 14px;
  color: #fff;
  position: relative;
  .bg_img{
    width: 375px;
    height: 207px;
  }
  .mine_msg{
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    padding:15px 20px;
    display: flex;
    align-items: center;
    height: 137px;
    .mine_avatar{
      width: 60px;
      height: 60px;
      border-radius: 33px;
      border:3px solid #e6e8eb; 
      margin-right: 15px;
    }
    .mine_txt_msg{
      flex: 1;
      .mine_txt_line{
        display: flex;
        align-items: center;
        .mine_nick{
          font-size: 16px;
          font-weight: bold;
          margin-right: 20px;
        }
        .mine_position{

        }
        .mine_status{
          margin-right: 5px;
        }
        .arrow_icon{
          width: 15px;
          height: 15px;
        }

      }
    }
    .right_arrow{
      width: 16px;
      height: 16px;
    }
  }
  .mine_account{
      position: absolute;
      top: 137px;
      left: 20px;
      right: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      // border-top: 1px solid #ffe288;
      .mine_amount{
        padding-left: 20px;
        .amount{
           font-size: 20px;
           font-weight: bold;
          span{
            font-size: 12px;
            font-weight: normal;
          }
        }
        .item_name{
          font-size: 12px;
          text-align: center;
          margin-top: 5px;
        }
      }
      .action_btns{
        display: flex;
      }
      .action_btn{
        height: 25px;
        display: flex;
        align-items: center;
        border: 1px solid #ffe288;
        color: #ffe288;
        padding: 0 8px;
        border-radius: 14px;
        margin-right: 15px;
      }
  }
}
.router_list{
  background-color: #fff;
  padding:0 15px;
  .router_item + .router_item{
     border-top: 1px solid #e3e5e7;
  }
  .router_item{
    padding: 0 5px;
    font-size: 14px;
    color: #333;
    height: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item_left{
      display: flex;
      align-items: center;
      img{
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
    .item_right{
      img{
        width: 9px;
        height: 12px;
      }
    }
  }
}
</style>
