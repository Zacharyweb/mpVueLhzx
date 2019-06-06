<template>
  <div class="container hpb" :class="{'isX': isX}">
    <div class="tab_fix_wrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
          <van-tab title="已添加的"></van-tab>
          <van-tab title="未添加的"></van-tab>
      </van-tabs>
    </div>
    <div style="height:32px;"></div>
    <div class="no_data_tips" v-show="(currentTab == 0 && friendsList.length == 0) || (currentTab == 1 && newFriendsList.length == 0) ">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>还没有相关的关系户哦~</span>
    </div> 
    <div class="experts_list type3_list" v-show="currentTab == 0">
      <div class="experts_item" style="padding-bottom:0px;" v-for="(item,index) in friendsList" :key="index">
        <div class="top_block" style="padding-bottom:14px;">
          <img class="experts_avatar" :src="item.avatarUrl">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">{{item.nickName}}</span>
            </div>
            <div class="experts_msg2">
              <div class="share_expert_btn" @click="extendExperts(index)">
                <span>TA分享的专家</span>
                <img src="../../../static/img/extend_icon.png" :class="{'extend': item.extend}">
              </div>
            </div>
          </div>
          <span class="action_btn1" @click="deleteFriend(item,index)">删除好友</span>
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

    <div class="experts_list type3_list" v-show="currentTab == 1">
      
      <div class="experts_item" style="padding-bottom:0px;" v-for="(item,index) in newFriendsList" :key="index">
        <div class="top_block" style="padding-bottom:14px;">
          <img class="experts_avatar" :src="item.avatarUrl">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">{{item.nickName}}</span>
            </div>
            <div class="experts_msg2">
              <div class="share_expert_btn">
                <span>申请添加您为关系户</span>
              </div>
            </div>
          </div>
          <span class="action_btn" @click="sureAddFriend(item,index)">同意添加</span>
        </div>

      </div>
    </div>

    <div class="bottom_fixed" :class="{'isX':isX}">
       <button open-type="share" class="action_btn1">添加关系户</button>
    </div>
    <van-dialog id="van-dialog"/>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
import {API, BASE_URL} from  '../../http/api.js';
export default {
  data () {
    return {
      currentTab: 0,
      friendsList:[],
      newFriendsList:[{nickName:'朱三'}]
    }
  },
  computed:{
    ...mapState({
      isX: state => state.counter.isX,
      userData: state => state.counter.userData
    })
  },
  components: {
    
  },
  onShareAppMessage(obj){
      return {
        title:'您的好友邀请您加入咨询堂',
        path:'/pages/index/index?userId=' + this.userData.userId,
        path:'/pages/login/index?userId=' + this.userData.userId + '&fromType=3',
        imageUrl:'/static/img/share_test_img.png'
      }
  },

  methods: {
    onTabChange(event){
      if(this.currentTab == event.target.index){
        return;
      }
      if(event.target.index == 1){
        this.getUserNewFriendsList();
      }else{
        this.getUserFriendsList();
      };
      this.currentTab = event.target.index;
    },
    showToast(txt){
      wx.showToast({
        title: txt,
        icon: 'none',
        duration: 1500
      })
    },

    deleteFriend(item,index){
      var that = this;
      Dialog.confirm({
        title: '确认解除关系？',
        message: '解除关系后，您将从对方的关系户中删除'
      }).then(() => {
        this.$http.request({
          url:'DeleteUserFriend',
          data:{
            userId: this.userData.userId,
            friendId: item.id,
          },
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.friendsList.splice(index,1);
          }
        })
       
      }).catch(() => {
        
      });
    },

    extendExperts(index){
      this.friendsList[index].extend = !this.friendsList[index].extend;
    },

    getUserFriendsList(){
      this.$http.request({
        url:'GetUserFriendList',
        data:{
          userId: this.userData.userId,
          isExpert:0
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          res.data.forEach(item => {
            item.extend = false;
          }); 
          this.friendsList = res.data;
        }
      })
    },

    getUserNewFriendsList(){
      this.$http.request({
        url:'getSureUserFriendList',
        data:{
          userid:this.userData.userId
        }
      }).then(res => {
        if(res.code == 1){
          this.newFriendsList = res.data;
        }
      })
    },

    sureAddFriend(item,index){
      this.$http.request({
        url:'SureUserFriend',
        data:{
          userId: 6,
          friendId: this.userData.userId
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          this.showToast('添加成功');
          this.newFriendsList.splice(1,index);
        }
      })
    }
  },

  created () {
   
  },
  onLoad(options){
    if(options.tab){
      this.currentTab = options.tab;
    }
    if(options.tab == 1){
      this.getUserNewFriendsList();
    }else{
      this.getUserFriendsList();
    }
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
.tab_fix_wrap{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 2;
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
    .action_btn1{
      position: absolute;
      top:27px;
      right: 15px;
      height: 24px;
      display: flex;
      align-items: center;
      color: #1fb7b6;
      background-color: #fff;
      border:1px solid #1fb7b6;
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