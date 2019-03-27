<template>
  <div>
    <div class="expert_card_block">
      <img class="bg_img" src="../../../static/img/center_bg.png">
     
      <div class="card_panel">
        <div class="top">
          <div class="top_left">
            <img class="expert_avatar" src="../../../static/img/avatar.jpeg">
            <span class="expert_name">朱两边</span>
            <div class="expert_location">
              <img src="../../../static/img/location_icon.png">
              <span>杭州</span>
            </div>
          </div>
          <div class="top_right">
            <div class="msg_item">
              <!-- <img class="item_icon" src="../../../static/img/expert_card_icon1.png"> -->
              <span class="item_name">职位：</span>
              <span class="item_content">高级财务专家</span>
            </div>
              <div class="msg_item">
              <!-- <img class="item_icon" src="../../../static/img/expert_card_icon2.png"> -->
              <span class="item_name">工作年限：</span>
              <span class="item_content">5-10年</span>
            </div>
            <div class="msg_item">
              <!-- <img class="item_icon" src="../../../static/img/expert_card_icon3.png"> -->
              <span class="item_name">擅长领域：</span>
              <span class="item_content">个人所得税个人所得税个人所得税个人所得税</span>
            </div>
            <div class="msg_item nmb">
              <!-- <img class="item_icon" src="../../../static/img/expert_card_icon4.png"> -->
              <span class="item_name">专家介绍：</span>
            </div>
            <div class="expret_intro">我是专家我是专家我是专家我是专家我是专家</div>
            
            
          </div>
        </div>
        <div class="bottom">
          <div class="action_btn2">进入咨询堂</div>
          <div class="action_btn">了解更多</div>
        </div>
        
      </div>
    </div>

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
  onLoad(options){
        console.log(options);
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
.expert_card_block {
  height: 207px;
  font-size: 14px;
  position: relative;
  .bg_img{
    width: 375px;
    height: 207px;
  }
  .card_panel{
    position: absolute;
    width: 345px;
    top: 100px;
    left: 15px;
    background-color: #fff;
    border-radius: 5px;
    .top{
      padding: 20px 15px;
      padding-bottom: 10px;
      display: flex;
      // align-items: center;
      .top_left{
         display: flex;
         flex-direction: column;
         align-items: center;
          margin-right: 15px;
        .expert_avatar{
          width: 60px;
          height: 60px;
          border-radius: 33px;
          border:3px solid #e6e8eb; 
        }
        .expert_name{
          margin-top: 15px;
          font-size: 16px;
        }
        .expert_location{
          margin-top: 10px;
          display: flex;
          align-items: center;
          img{
            width: 16px;
            height: 16px;
          }
          span{
            color: #666;
            margin-left: 5px;
          }
        }

      }
      .top_right{
        font-size: 14px;
        padding-left: 18px;

        position: relative;
        &::before{
          content: '';
          position: absolute;
          width: 1px;
          height: 80px;
          background-color: #e6e8eb;
          left: 0;
          top: 4px;
        }
        .msg_item{
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          &.nmb{
            margin-bottom: 4px;
          }
          .item_icon{
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
          .item_name{
            margin-right: 5px;
            color: #333;
          }
          .item_content{
            color: #666;
            flex: 1;
            max-width: 140px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          
        }
        .expret_intro{
           color: #666;
        }
      }

    }
    .bottom{
      padding:15px;
      display: flex;
      justify-content: flex-end;
      background-color: #f3fbfb;
      border-radius: 0 0 5px 5px;
      .action_btn{
        height: 28px;
        padding:0 10px;
        border-radius: 4px;
        color: #fff;
        background-color: #1fb7b6;
        border: 1px solid #1fb7b6;
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
      .action_btn2{
        height: 28px;
        padding:0 10px;
        border-radius: 4px;
        color: #1fb7b6;
        background-color: #f3fbfb;
        border: 1px solid #1fb7b6;
        display: flex;
        align-items: center;  
        margin-left: 10px;
      }

    }
  }
}
</style>
