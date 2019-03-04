<template>
  <div class="container">
    <div class="consult_progress_wrap">
      <span class="consult_progress_line"></span>
      <ul class="consult_progress">
        <li class="progress_item top actived">
          <div class="top_wrap">
            <span class="item_name">发起咨询</span>
            <span class="item_dot2">
              <i></i>
            </span>
          </div>
        </li>
         <li class="progress_item top">
          <div class="top_wrap">
            <span class="item_name">等待接单</span>
            <span class="item_dot2">
              <i></i>
            </span>
          </div>
        </li>
        <!-- <li class="progress_item bottom">
          <div class="bottom_wrap">
            <span class="item_dot2">
              <i></i>
            </span>
            <span class="item_name">等待接单</span>
          </div>
        </li> -->
        <li class="progress_item top">
          <div class="top_wrap">
            <span class="item_name">交付作答</span>
            <span class="item_dot2">
              <i></i>
            </span>
          </div>
        </li>
        <li class="progress_item top">
          <div class="top_wrap">
            <span class="item_name">结算支付</span>
            <span class="item_dot2">
              <i></i>
            </span>
          </div>
        </li>
        <!-- <li class="progress_item bottom">
          <div class="bottom_wrap">
            <span class="item_dot2">
              <i></i>
            </span>
            <span class="item_name">结算支付</span>
          </div>
        </li> -->
        
        <li class="progress_item top">
          <div class="top_wrap">
            <span class="item_name">评价反馈</span>
            <span class="item_dot2">
              <i></i>
            </span>
          </div>
        </li>
         <li class="progress_item top">
          <div class="top_wrap">
            <span class="item_name">订单完成</span>
            <span class="item_dot2">
              <i></i>
            </span>
          </div>
        </li>
        <!-- <li class="progress_item bottom">
          <div class="bottom_wrap">
            <span class="item_dot2">
              <i></i>
            </span>
            <span class="item_name">订单完成</span>
          </div>
        </li> -->
      </ul>
    </div>

  <van-steps
    :steps="steps"
    :active="active"
    active-color="#f44"
  />

    <!-- <div class="base_msg_panel">
      <van-cell-group>
        <van-field
          :value="account"
          clearable
          label="昵称"
          placeholder="请输入昵称"
          bind:click-icon="onClickIcon"
          customStyle="background-color:#fff;"
        />
        <van-field
          :value="city"
          label="个人介绍"
          placeholder="请输入个人介绍"
          type="textarea"
          autosize
          customStyle="background-color:#fff;"
        />
      </van-cell-group>
      <div class="btn_block">
        <div class="btn large green">确认修改</div>
      </div>
    </div>
    
    <div class="change_mobile">
      <span @click="chageMobile">更换手机号</span>
    </div> -->
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
     city:'',
      steps: [
      {
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ],
    actived:0
    }
  },

  components: {
    
  },

  methods: {
    chageMobile(){
      this.$router.push('/pages/editMobile1/index');
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
.consult_progress_wrap{
  height: 90px;
  position: relative;
  background-color: #fff;
}
.consult_progress_line{
  position: absolute;
  top:45px;
  left: 0px;
  width: 375px;
  height: 1px;
  background-color: #eee;
}
.consult_progress{
  position: absolute;
  top:0px;
  left: 10px;
  width: 355px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  .progress_item {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item_name{
      font-size: 12px;
      color: #999;
    }
      .item_dot1{
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #1fb7b6;

      }
      .item_line{
        width: 1px;
        height: 10px;
        background-color: #1fb7b6;

      }
      .item_dot2{
        width: 8px;
        height: 8px;
        border-radius: 5px;
        border:1px solid #fff;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #999;
        }
      }
  }
  .progress_item.top {
    justify-content: flex-start;
    .item_name{
      margin-bottom:8px;
    }
    .top_wrap{
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 45px;
    }
    
  }
  .progress_item.bottom {
    justify-content: flex-end;
    .item_name{
      margin-top:8px;
    }
    .bottom_wrap{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 45px;
      margin-bottom: -6px;
    }
  }

  .progress_item.actived{
    .item_name{
      color: #1fb7b6;
    }
    .item_dot2{
      width: 8px;
      height: 8px;
      border-radius: 5px;
      border:1px solid #1fb7b6;
      display: flex;
      align-items: center;
      justify-content: center;
      i{
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: #1fb7b6;
      }
    }

  }
}

</style>