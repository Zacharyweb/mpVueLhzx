<template>
  <div class="container">
    <div class="consult_progress_block">
      <h4 class="block_title" style="padding-left:15px;">咨询流程</h4>
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
    </div>
    <div class="consult_notice">
        <h4 class="block_title">使用须知</h4>
        <p>1、咨询采取先问后答形式。用户提出问题后，专家接单的，会在预定时间前给用户作答。</p>
        <p>2、咨询按节收费，一节30分钟。不满一节的，按一节收费。</p>
        <p>3、发起咨询前，用户选择所需咨询节数。首次咨询的，建议选择一节。</p>
        <p>4、专家看了问题后，需要增加节数，或者增加作答时长的，会先行征得用户同意变更订单后，才提供咨询。</p>
        <p>5、咨询结束后，用户直接微信支付专家，平台不收取任何费用。</p>
        <p>6、对咨询有任何不满的，可在把咨询费暂交平台后，向专家或者平台提出申诉，48小时内完成申诉流程</p>
        <p>7、在专家作答后的24小时内，请务必结算支付，逾时的进黑名单，同时失去申诉权。</p>
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
     city:'',
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
.consult_progress_block{
  background-color: #fff;
  padding:15px 0;
}
.consult_progress_wrap{
  height: 60px;
  position: relative;
  padding-top: 10px;
}
.consult_progress_line{
  position: absolute;
  top:45px;
  left: 15px;
  width: 345px;
  height: 2px;
  background-color: #eee;
}
.consult_progress_line::before{
  content: '';
  position: absolute;
  top:6px;
  // left: 0px;
  right: 0px;
  width: 12px;
  height: 2px;
  background-color: #eee;
}
.consult_progress_line::after{
  content: '';
  position: absolute;
  top:-6px;
  left: 0px;
  // right: 0px;
  width: 12px;
  height: 2px;
  background-color: #eee;
}
.consult_progress_line::after{
  
}
.consult_progress{
  position: absolute;
  top:0px;
  left: 15px;
  width: 345px;
  height: 46px;
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
      margin-bottom:18px;
    }
    .top_wrap{
      margin-top: 6px;
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
      border:1px solid #1fb7b6;
      i{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #1fb7b6;
      }
    }
  }
}
.consult_notice{
  background-color: #fff;
  padding:15px;
  padding-bottom: 20px;
  margin-top: 5px;
}
.consult_notice p{
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}
.consult_notice p+p{
 margin-top: 6px;
}

.block_title{
  padding-bottom:10px;
  font-size: 15px;
}
</style>