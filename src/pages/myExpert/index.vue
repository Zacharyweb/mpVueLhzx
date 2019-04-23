<template>
  <div class="container">

    <div class="tab_fix_wrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
          <van-tab title="咨询过的"></van-tab>
          <van-tab title="问候过的"></van-tab>
          <van-tab title="已关注的"></van-tab>
      </van-tabs>
    </div>
    <div style="height:32px;"></div>
    <!-- <div class="no_data_tips">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>还没有相关专家哦~</span>
    </div>  -->

    <div class="experts_list type2_list" v-show="currentTab == 0">
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">专家1</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
          </div>
          <div class="action_btns">
            <img src="../../../static/img/list_icon4.png" alt="" @click="addViewPanelShow = true">
            <!-- <img src="../../../static/img/list_icon4_active.png" alt=""> -->
          </div>
        </div>
      </div>
    </div>

    
    <div class="experts_list type2_list" v-show="currentTab == 1">
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">专家2</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
          </div>
       
        </div>
      </div>
    </div>

    <div class="experts_list type2_list" v-show="currentTab == 2">
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">专家3</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
          </div>
          <div class="action_btns">
            <img src="../../../static/img/list_icon3.png" alt="">
            <!-- <img src="../../../static/img/list_icon3_active.png" alt=""> -->
          </div>

        </div>
      </div>
    </div>

    <!-- 设置专家对好友的可见性 -->
    <div class="add_view_panel" @touchmove.stop="touchmoveStop" :class="{'show':addViewPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="addViewPanelShow = false">取消</span>
        <span class="title">设置对谁可见</span>
        <span class="submit_btn">提交</span>
      </div>
      <!-- <scroll-view scroll-y :scroll-top="sTop" class="select_list" v-show="!showSelectedPanel">
        <div class="friend_avatar_list"  id='chat-ref'>
          <img class="friend_avatar" src="../../../static/img/avatar.jpeg"  v-for="(item,index) in friendsList" :key="index" v-if="item.selected">
        </div>
      </scroll-view>
      <scroll-view scroll-y class="friend_list_wrap" :class="{'less_top':showSelectedPanel}"> -->
      <scroll-view scroll-y class="friend_list_wrap" style="top:48px;">
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
export default {
  data () {
    return {
      currentTab: 0,
      friendsList:[
        {extend:false,selected:false},
        {extend:true,selected:false},
        {extend:true,selected:false},
        {extend:true,selected:false},
        {extend:true,selected:false},
        {extend:false,selected:false},
        {extend:true,selected:false},
        {extend:true,selected:false},
        {extend:true,selected:false},
        {extend:true,selected:false}
        ],
      sTop:0,
 
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
  onShow(){
    this.addViewPanelShow = false;  
  },
  methods: {
    onTabChange(event){
      this.currentTab = event.target.index;
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
  }
</style>