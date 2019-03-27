<template>
  <div class="container" :class="{'hpb':currentTab == 2,'isX':currentTab == 2 && isX}">

    <div class="tab_fix_wrap">
       <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
          <van-tab title="客户"></van-tab>
          <van-tab title="专家"></van-tab>
          <van-tab title="好友"></van-tab>
        </van-tabs>
    </div>

    <div style="height:32px;"></div>

    <div class="experts_list type1_list" v-show="currentTab == 0">
      <div class="icon_explain">
         <img src="../../../static/img/list_icon1_active.png" alt="">
         <span>已发起问候</span>
         <img src="../../../static/img/list_icon2_active.png" alt="">
         <span>已咨询过您</span>
         <img src="../../../static/img/list_icon3_active.png" alt="">
         <span>已关注您</span>
      </div>
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
          </div>
          <div class="action_btns">
            <img src="../../../static/img/list_icon1.png" alt="">
            <!-- <img src="../../../static/img/list_icon1_active.png" alt=""> -->
            <img src="../../../static/img/list_icon2.png" alt="">
            <!-- <img src="../../../static/img/list_icon2_active.png" alt=""> -->
            <img src="../../../static/img/list_icon3.png" alt="">
            <!-- <img src="../../../static/img/list_icon3_active.png" alt=""> -->
          </div>
        </div>
      </div>

    </div>

    <div class="experts_list type2_list" v-show="currentTab == 1">
      <div class="icon_explain">
         <img src="../../../static/img/list_icon1_active.png" alt="">
         <span>已问候过</span>
         <img src="../../../static/img/list_icon2_active.png" alt="">
         <span>已咨询过</span>
         <img src="../../../static/img/list_icon3_active.png" alt="">
         <span>已关注</span>
         <img src="../../../static/img/list_icon4_active.png" alt="">
         <span>已设置可见性</span>
      </div>

      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
          </div>
          <div class="action_btns">
            <img src="../../../static/img/list_icon1.png" alt="">
            <!-- <img src="../../../static/img/list_icon1_active.png" alt=""> -->
            <img src="../../../static/img/list_icon2.png" alt="">
            <!-- <img src="../../../static/img/list_icon2_active.png" alt=""> -->
            <img src="../../../static/img/list_icon3.png" alt="">
            <!-- <img src="../../../static/img/list_icon3_active.png" alt=""> -->
             <img src="../../../static/img/list_icon4.png" alt="" @click="addViewPanelShow = true">
            <!-- <img src="../../../static/img/list_icon4_active.png" alt=""> -->
          </div>
        </div>
      </div>
      
    </div>

    <div class="experts_list type3_list" v-show="currentTab == 2">
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



    <div class="bottom_fixed" :class="{'isX':isX}" v-show="currentTab == 2">
       <button open-type="share" class="action_btn1" @click="addFriend">添加好友</button>
    </div>

    <van-dialog id="van-dialog"/>
  
    <!-- 设置专家对好友的可见性 -->
    <div class="add_view_panel" @touchmove.stop="touchmoveStop" :class="{'show':addViewPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="addViewPanelShow = false">取消</span>
        <span class="title">设置对谁可见</span>
        <span class="submit_btn">提交</span>
      </div>
      <scroll-view scroll-y :scroll-top="sTop" class="select_list" v-show="!showSelectedPanel">
        <div class="friend_avatar_list"  id='chat-ref'>
          <img class="friend_avatar" src="../../../static/img/avatar.jpeg"  v-for="(item,index) in friendsList" :key="index" v-if="item.selected">
        </div>
      </scroll-view>
      <scroll-view scroll-y class="friend_list_wrap" :class="{'less_top':showSelectedPanel}">
        <ul class="friend_list">
          <li class="friend_item" v-for="(item,index) in friendsList" :key="index" @click="selectFriend(index)">
            <div class="select_icon">
              <span class="selcet_fill" v-show="item.selected"></span>
            </div>
            <img class="friend_avatar" src="../../../static/img/avatar.jpeg">
            <div class="friend_name">朱两边</div>
          </li>
        </ul>
       </scroll-view>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
      currentTab: 0,
      friendsList:[
        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},
        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},

        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},
        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},
        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},

        ],
      sTop:0,
      selectedFriendList:[],
      addViewPanelShow:false
    }
  },
  computed:{
    ...mapState({
      isX: state => state.counter.isX
    }),
    showSelectedPanel(){
      return this.friendsList.every((item)=>{
        return item.selected == false;
      })
    }

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
    onTabChange(event){
      this.currentTab = event.target.index;
    },
    addFriend(){
      
    },
 
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
    },

    touchmoveStop(e){
      e.stopPropagation();
    },

    selectFriend(index){
      this.friendsList[index].selected = !this.friendsList[index].selected;
      this.selectFriendsPanelScrollBottom();
    },

    selectFriendsPanelScrollBottom(){
      let that = this;
      wx.createSelectorQuery().select('#chat-ref').boundingClientRect(function (rect) {
        that.sTop = rect ? parseInt(rect.height) : 0
      }).exec()
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
    margin-bottom: 10px;
    position: relative;
    .top_block{
      //  height: 78px;
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
    .action_btns{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: 15px;
      height: 28px;
      display: flex;
      align-items: center;
      color: #fff;
      img{
        width: 26px;
        height: 26px;
        margin-left: 8px;
      }
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
  .add_view_panel{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;
    transform: translateX(100%);
    transition: all 0.3s;
    &.show{
      transform: translateX(0);
    }
    .panel_top{
      display: flex;
      align-items: center;
      height: 40px;
      padding:0 10px;
      border-bottom: 1px solid #e6e8eb;
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
    .select_list{
      background-color: #fff;
      height: 64px;
      border-bottom: 1px solid #e6e8eb;
      .friend_avatar_list{
        display: flex;
        padding:0 9px;
        flex-wrap: wrap;
        img{
          width: 36px;
          height: 36px;
          border-radius: 4px;
          margin: 6px;
        }
      }
    }
    .friend_list_wrap{
      position: absolute;
      top:110px;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .friend_list_wrap.less_top{
      top:48px;
    }
    .friend_list{
      .friend_item{
        height: 48px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        .select_icon{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border:1px solid #e6e8eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          .selcet_fill{
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #1fb7b6;
          }
        }
      }
      .friend_avatar{
        width: 36px;
        height: 36px;
        border-radius: 4px;
        margin-right: 8px;
      }
      .friend_name{
        flex: 1;
        height: 47px;
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e8eb;
      }
    }
  }
</style>