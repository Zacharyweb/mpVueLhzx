<template>
  <div class="container">
    <div class="tab_fix_wrap">
       <van-tabs color="#1fb7b6" type="card" :active="currentTab" @change="onTabChange">
          <van-tab title="全部"></van-tab>
          <van-tab title="收入"></van-tab>
          <van-tab title="提现"></van-tab>
        </van-tabs>
        <div class="time_selecter">
            <span @click="selectDate">{{dateY}}-{{dateM}}</span>
            <img src="../../../static/img/arrow_down2.png" @click="selectDate">
        </div>
        <div class="amount_total">
          <span class="amount_type_text">总收入：</span>
          <span class="come_amount">￥10000.00</span>
          <span class="amount_type_text">总提现：</span>
          <span class="out_amount">￥500.00</span>
        </div>
    </div>
 
    <div class="bill_list">
      <div class="bill_item" @click="linkTo('/pages/billDetail/index')">
        <img class="bill_avatar" src="../../../static/img/avatar.jpeg">
        <div class="bill_msg">
          <div class="bill_target">客户姓名</div>
          <div class="bill_time">2018-12-01 12:00:00</div>
        </div>
        <span class="bill_amount in">+100.00</span>
      </div>

      <div class="bill_item" @click="linkTo('/pages/billDetail/index')">
        <img class="bill_avatar" src="../../../static/img/avatar.jpeg">
        <div class="bill_msg">
          <div class="bill_target">客户姓名</div>
          <div class="bill_time">2018-12-01 12:00:00</div>
        </div>
        <span class="bill_amount in">+100.00</span>
      </div>

      <div class="bill_item" @click="linkTo('/pages/billDetail/index')">
        <img class="bill_avatar" src="../../../static/img/avatar.jpeg">
        <div class="bill_msg">
          <div class="bill_target">客户姓名</div>
          <div class="bill_time">2018-12-01 12:00:00</div>
        </div>
        <span class="bill_amount in">+100.00</span>
      </div>
    </div>
 
    
    <div class="datetime_picker_wrap" :class="{'show': datetimePickerShow}">
      <van-datetime-picker
        type="year-month"
        :value="currentDate"
        :max-date="maxDate"
        @confirm="onPickerConfirm"
        @cancel="datetimePickerShow = false"
      />
    </div>
    <div class="picker_mask" v-show="datetimePickerShow" @click="datetimePickerShow = false"></div>
 
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentTab:0,
      currentDate: new Date().getTime(),
      maxDate: new Date().getTime(),
      datetimePickerShow:false,
      dateM:'',
      dateY:''
    }
  },

  components: {
  
  },

  methods: {
    onTabChange(event){
      this.currentTab = event.target.index;
    },
    onPickerConfirm(data){
      let date = new Date(data.mp.detail);
      this.dateY = date.getFullYear();
      this.dateM = date.getMonth()  + 1;
      this.datetimePickerShow = false;
    },
    selectDate(){
      this.datetimePickerShow = true;
    },
    linkTo(path){
      this.$router.push(path);
    }
  },
  created () {
   
  },
  onShow(){
    let date = new Date();
    this.dateY = date.getFullYear();
    this.dateM = date.getMonth() + 1;
  }
}
</script>

<style lang="less" scoped>
.tab_fix_wrap{
  position: fixed;
  width: 100%;
  height: 100px;
  padding-top: 10px;
  top:0;
  left: 0;
  background-color: #fff;
  z-index: 2;
  .time_selecter{
    display: flex;
    align-items: center;
    padding:10px 15px;
    span{
      color: #666;
      font-weight: bold;
      font-size: 18px;
      padding-right: 10px;
    }
    img{
      width: 12px;
      height: 9px;
    }
  }
  .amount_total{
    font-size: 12px;
    padding:0px 15px;
    .amount_type_text{
      color: #999;
    }
    .come_amount{
      color:#e8541e; 
      margin-right: 20px;
    }
    .out_amount{
      color:#1fb7b6;
    }


  }
}
.bill_list{
  padding-top: 115px;
  .bill_item{
      height: 80px;
      padding: 0 15px;
      font-size: 14px;
      background-color: #fff;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      .bill_avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border:3px solid #e6e8eb;
        margin-right: 10px; 
      }
      .bill_msg{
        flex: 1;
        .bill_target{
          font-size: 15px;
          color: #333;
        }
        .bill_time{
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
        
      }
      .bill_amount{
        font-size: 18px;
        font-weight: bold;
      }
      .bill_amount.in{
        color: #e8541e;
      }
  }
}

.datetime_picker_wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  transition: all 0.3s;
  z-index: 4;
  transform: translateY(100%)
}
.datetime_picker_wrap.show{
   transform: translateY(0)
}
.picker_mask{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;
}
</style>