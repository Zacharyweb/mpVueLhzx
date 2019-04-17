<template>
  <div class="container hpb" :class="{'isX': isX}">
    <div class="experts_list type3_list">
      <div class="experts_item" style="padding-bottom:0px;" v-for="(item,index) in friendsList" :key="index">
        <div class="top_block" style="padding-bottom:14px;">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="experts_msg2">
              <div class="share_expert_btn" @click="extendExperts(index)">
                <span>TA分享的专家</span>
                <img src="../../../static/img/extend_icon.png" :class="{'extend': item.extend}">
              </div>
            </div>
          </div>
          <span class="action_btn" @click="deleteFriend">删除好友</span>
        </div>

        <div class="share_experts"  v-show="item.extend">
          <div class="expert_msg">
            <div class="left">
              <img src="../../../static/img/avatar.jpeg">
              <div>朱两边<span>(财务)</span></div>
            </div>
            <span class="right">查看详情</span>
          </div>
          <div class="expert_msg">
            <div class="left">
              <img src="../../../static/img/avatar.jpeg">
              <div>朱两边<span>(财务)</span></div>
            </div>
            <span class="right">查看详情</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom_fixed" :class="{'isX':isX}">
       <button open-type="share" class="action_btn1">添加好友</button>
    </div>
    <van-dialog id="van-dialog"/>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {

      friendsList:[
        {extend:false},{extend:false},{extend:false},
        {extend:false},{extend:false},{extend:false},
        {extend:false},{extend:false},{extend:false},
      ],

    }
  },
  computed:{
    ...mapState({
      isX: state => state.counter.isX
    })
  },
  components: {
    
  },
  onShareAppMessage(obj){
      return {
        title:'您的好友邀请您加入咨询堂',
        path:'/pages/index/index?mineId=2019&uId=2018',
        imageUrl:'/static/img/share_test_img.png'
      }
  },

  methods: {
    deleteFriend(p){
      var that = this;
      Dialog.confirm({
        title: '确认解除关系？',
        message: '解除关系后，您将从对方的关系户中删除'
      }).then(() => {
       
      }).catch(() => {
        
      });
    },
    extendExperts(index){
      this.friendsList[index].extend = !this.friendsList[index].extend;
    }
  },
  created () {
   
  }
}
</script>

<style lang="less" scoped>
.container.hpb{
  padding-bottom: 50px;
}
.container.hpb.isX{
  padding-bottom: 82px;
}

.experts_item{
    padding: 14px 15px;
    font-size: 14px;
    background-color: #fff;
    margin-top: 10px;
    position: relative;
    .top_block{
       height: auto;
       display: flex;
       align-items: center;
      .experts_avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid #e6e8eb; 
        margin-right: 10px;
      }
      .top_block_right{
        flex: 1;
        .experts_msg1{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .experts_name{
            font-size: 16px;
            color: #333;
          }
        }
        .experts_msg2{
          margin-top: 10px;
          font-size: 14px;
          color: #333;
          display: flex;
          justify-content: space-between;
          .share_expert_btn{
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #666;
            img{
              width: 10px;
              height: 10px;
              margin-left: 5px;
              transform: rotate(0deg);
              transition: all 0.3s;
            }
            img.extend{
                transform: rotate(180deg);
            }
          }
        }
      }
    }
    .share_experts{
      .expert_msg{
        height:40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e6e8eb;
        margin-left: 30px;
        padding-right: 10px;
        .left{
          display: flex;
          align-items: center;
          img{
            width: 26px;
            height: 26px;
            border-radius: 50%;
            margin-right: 8px;
          }
          div{
            font-size: 13px;
            color: #333;
            span{
              font-size: 12px;
              color: #666;
            }
          }
        }
        .right{
          font-size: 12px;
          color: #1fb7b6;
        }
      }
    }
    .action_btn{
      position: absolute;
      top:27px;
      right: 15px;
      height: 24px;
      display: flex;
      align-items: center;
      color: #fff;
      background-color: #1fb7b6;
      border-radius: 12px;
      padding:0 10px;
      font-size: 12px;
    }
  }
  .experts_list{
    .icon_explain{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 30px;
      padding:0 5px;
      img{
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
      span{
        font-size:12px;
        color: #999; 
        margin-right: 10px;
      }
    }
  }
</style>