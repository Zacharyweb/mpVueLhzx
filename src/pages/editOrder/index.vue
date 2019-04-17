<template>
  <div class="container">
    <div class="order_edit_panel show">
      <!-- <div class="panel_top">
        <span class="cancel_btn" @click="orderEditPanelShow = false">取消</span>
        <span class="title">修改订单</span>
        <span class="submit_btn">提交</span>
      </div> -->

      <div class="edit_list">

        <div class="edit_item">
          <span class="item_name">作答节数：</span>
          <van-stepper
            :value="classNum"
            integer
            min="1"
            max="99"
            step="1"
            @change="onClassNumChange"
          />
        </div>

        <div class="edit_item">
          <span class="item_name">作答时间：</span>
          <span class="item_content" @click="timePickerShow = true">2019-03-17 23:34:00</span>
          <img class="item_icon" @click="timePickerShow = true" src="../../../static/img/edit_icon.png">
        </div>

        <div class="edit_item">
          <span class="item_name">推荐至其他专家：</span>
          <span class="item_content" @click="friendsListShow = true">选择专家好友</span>
          <img class="item_icon" @click="friendsListShow = true" src="../../../static/img/friend_icon2.png">
        </div>

        <div class="btn_block">
          <div class="btn large green">提交修改</div>
        </div>

        <div class="time_picker_block" :class="{'show':timePickerShow}">
          <van-datetime-picker
           type="datetime"
           :value="currentDate"
           :min-date="minDate"
           :max-date="maxDate"
           :bind:change="onTimeChange"
          />
        </div>

        <div class="time_picker_mask" v-show="timePickerShow" @click="timePickerShow = false"></div>

        <div class="friends_list" :class="{'show':friendsListShow}">
          <div class="panel_top">
            <span class="cancel_btn" @click="friendsListShow = false">取消推荐</span>
            <span class="title">选择推荐专家</span>
            <span class="submit_btn">提交</span>
          </div>
          
          <div class="friend_item">
            <div class="left">
              <img class="friend_avatar" src="../../../static/img/avatar.jpeg">
              <div class="friend_msg">
                <div class="friend_name">朱两边</div>
                <div class="friend_position">高级财务专家</div>
              </div>
            </div>
            <span class="select_icon actived"></span>
          </div>

          <div class="friend_item">
            <div class="left">
              <img class="friend_avatar" src="../../../static/img/avatar.jpeg">
              <div class="friend_msg">
                <div class="friend_name">朱两边</div>
                <div class="friend_position">高级财务专家</div>
              </div>
            </div>
            <span class="select_icon"></span>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>
<script>

export default {
  data () {
    return {
      timePickerShow:false,
      friendsListShow:false,

      classNum:1,
      
      minDate: new Date().getTime(),
      maxDate: new Date(2030, 10, 1).getTime(),
      currentDate: new Date().getTime()
    }
  },
  components: {
    
  },
  methods: {
    onClassNumChange(){

    },
    onTimeChange(){

    },
  },
  created () {
   
  },
  onLoad: function (options) {
   
  },
  onShow(){

  },
}
</script>
<style lang="less" scoped>
  .order_edit_panel{
    position: fixed;
    transform: translateX(100%);
    transition: all 0.3s;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    &.show{
      transform: translateX(0);
    }
    .panel_top{
      display: flex;
      align-items: center;
      height: 40px;
      padding:0 10px;
      .cancel_btn{
        width: 60px;
        font-size: 13px;
        color: #333;
      }
      .title{
        flex: 1;
        font-size: 15px;
        text-align: center;
        color: #333;
      }
      .submit_btn{
        width: 60px;
        height: 24px;
        border-radius: 3px;
        font-size: 13px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #1fb7b6;
      }
    }
    .edit_list{
      padding:15px;
      .edit_item{
        display: flex;
        height: 40px;
        .item_name{
          margin-right: 5px;
          font-size: 14px;
          color: #333;
        }
        .item_content{
          font-size: 14px;
          color: #666;
          margin-right: 10px;
        }
        .item_icon{
          width: 18px;
          height: 18px;

        }

      }

    }
    .time_picker_block{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      z-index: 2;
      transform: translateY(100%);
      transition: all 0.3s;
      &.show{
        transform: translateY(0);
      }
    }
    .time_picker_mask{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }

    .friends_list{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #fff;
      transform: translateY(100%);
      transition: all 0.3s;
      &.show{
         transform: translateY(0);
      }
 
      .friend_item{
        margin:0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        border-bottom: 1px solid #f3f3f3;
        padding-right: 10px;
        .left{
          display: flex;
          align-items: center;
          .friend_avatar{
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border:2px solid #eee;
            margin-right: 10px;
          }
          .friend_msg{
            .friend_name{
              font-size: 14px;
              color: #333;
              margin-bottom: 5px;

            }
            .friend_position{
              font-size: 13px;
              color: #666;
            }

          }

        }
        .select_icon{
          width: 16px;
          height: 16px;
          border: 1px solid #e3e3e3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          &.actived::after{
            content: '';
            width: 10px;
            height: 10px;
            background-color: #1fb7b6;
            border-radius: 50%;
          }
        }
      }
    }   
  }
  .btn_block{
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
</style>