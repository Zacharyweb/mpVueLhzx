<template>
  <div class="container">

    <!-- <div class="comment_item">
      <div class="comment_q">是否会推荐给好友？</div>
      <div class="comment_a">
        <span class="custom_checkbox active">是</span>
        <span class="custom_checkbox">否</span>
      </div>
    </div>

    <div class="comment_item">
      <div class="comment_q">下次是否还会咨询该专家？</div>
      <div class="comment_a">
        <span class="custom_checkbox active">是</span>
        <span class="custom_checkbox">否</span>
      </div>
    </div>

    <div class="comment_tags">
      <span class="tag_item active">专业</span>
      <span class="tag_item">详细</span>
      <span class="tag_item">有耐心</span>
    </div>

    <div class="comment_input">
      <textarea placeholder="请输入评价内容"></textarea>
    </div>

    <div class="visible_block"> 
        <span class="custom_checkbox active" style="margin-right:20px;">所有好友可见</span>
        <span class="custom_checkbox" style="margin-right:0;">部分好友可见</span>
    </div> -->

    <!-- 用户评论组件 -->
    <div class="comment_panel show">
      <div class="input_block">
        <textarea class="text_area" placeholder="请输入评价内容" v-if="!visiblePanelShow"></textarea>
      </div>
      
      <div class="select_list">
        <!-- <div class="select_item fbt">
          <div class="left">
            <img src="../../../static/img/comment_icon1.png">
            <span>满意程度</span>
          </div>
          <div class="right" @click="showActionSheet1">
            <span>满意</span>
            <img src="../../../static/img/arrow_right3.png">
          </div>
        </div> -->

        <div class="select_item fbt">
         <div class="left">
            <img src="../../../static/img/comment_icon2.png">
           <span>谁可以看</span>
         </div>
         <div class="right" @click="visiblePanelShow = true">
           <span>仅自己</span>
           <img src="../../../static/img/arrow_right3.png">
         </div>
        </div>

        <div class="select_item">
         <div class="left">
            <img src="../../../static/img/comment_icon3.png">
            <span>专家可见</span>
         </div>
         <div class="right" @click="showActionSheet3">
           <span>不可见</span>
           <img src="../../../static/img/arrow_right3.png">
         </div>
        </div>
      </div>

      <div class="submit_block">
         <div class="btn large green">提交</div>
      </div>
    </div>

    <van-action-sheet
      :show="actionSheet1Show"
      :actions="actions1"
      @close="closeActionSheet1"
      @select="selectAction1"
    />
    <van-action-sheet
      :show="actionSheet2Show"
      :actions="actions2"
      @close="closeActionSheet2"
      @select="selectAction2"
    />
    <van-action-sheet
      :show="actionSheet3Show"
      :actions="actions3"
      @close="closeActionSheet3"
      @select="selectAction3"
    />


    <div class="visible_panel" :class="{'show':visiblePanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="visiblePanelShow = false">取消</span>
        <span class="title">设置可见性</span>
        <span class="submit_btn">提交</span>
      </div>
   
      <div class="select_list">
        <div class="select_item" @click="changeVisibleType(1)">
          <div class="select_icon">
            <span class="selcet_fill" v-show="visibleType == 1"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">公开</p>
            <p class="select_text2">所有户可见</p>
          </div>
        </div>

        <div class="select_item"  @click="changeVisibleType(2)">
          <div class="select_icon">
            <span class="selcet_fill" v-show="visibleType == 2"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">私密</p>
            <p class="select_text2">仅自己可见</p>
          </div>
        </div>

        <div class="select_item" @click="changeVisibleType(3)">
          <div class="select_icon">
            <span class="selcet_fill" v-show="visibleType == 3"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">部分可见</p>
            <p class="select_text2">选中的关系户可见</p>
            <!-- <p class="select_text3">暂未选中任何关系户,点击右侧去选择</p> -->
            <p class="select_text4">
              <span>王老师、张老师、李老师、王老师、张老师、李老师、王老师、张老师、李老师、王老师、张老师、李老师</span>等11人
            </p>
          </div>
          <div class="to_select_btn"  @click="showAddViewPanel(1)">
            <span>去选择</span>
            <img src="../../../static/img/arrow_right3.png">
          </div>
        </div>

        <div class="select_item" @click="changeVisibleType(4)">
          <div class="select_icon"> 
            <span class="selcet_fill" v-show="visibleType == 4"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">不给谁看</p>
            <p class="select_text2">选中关系户不可见</p>
            <p class="select_text3">暂未选中任何关系户,点击右侧去选择</p>
            <!-- <p class="select_text4">
              <span>王老师、张老师、李老师、王老师、张老师、李老师、王老师、张老师、李老师、王老师、张老师、李老师</span>等11人
            </p> -->
          </div>
          <div class="to_select_btn" @click="showAddViewPanel(2)">
            <span>去选择</span>
            <img src="../../../static/img/arrow_right3.png">
          </div>
        </div>
      </div>

    </div>


 

    <!-- 设置评论的可见性 -->
    <div class="add_view_panel" @touchmove.stop="touchmoveStop" :class="{'show':addViewPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="addViewPanelShow = false">取消</span>
        <span class="title">{{addViewPanelTitle}}</span>
        <span class="submit_btn">提交</span>
      </div>
      <!-- <scroll-view scroll-y :scroll-top="sTop" class="select_list" v-show="!showSelectedPanel">
        <div class="friend_avatar_list"  id='chat-ref'>
          <img class="friend_avatar" src="../../../static/img/avatar.jpeg"  v-for="(item,index) in friendsList" :key="index" v-if="item.selected">
        </div>
      </scroll-view> -->
      <!-- <scroll-view scroll-y class="friend_list_wrap" :class="{'less_top':showSelectedPanel}"> -->
      <scroll-view scroll-y class="friend_list_wrap" style="top:48px;">
        <ul class="friend_list">
          <li class="friend_item" v-for="(item,index) in friendsList" :key="index" @click="selectFriend(index)">
            <div class="select_icon">
              <span class="selcet_fill" v-show="item.selected"></span>
            </div>
            <img class="friend_avatar" src="../../../static/img/avatar.jpeg">
            <div class="friend_name">朱两边</div>
          </li>
          <li class="friend_item">
            <div class="friend_name" style="color:#666;padding-left:4px;">
              <img class="share_icon" style="width:16px;height:16px;margin-right:5px;" src="../../../static/img/share_icon.png">分享专家至微信通讯录好友
            </div>
          </li>
        </ul>
       </scroll-view>
    </div>

  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
      actionSheet1Show:false,
      actions1:[
        {
          targetId:1,
          name: '满意',
        },
        {
          targetId:2,
          name: '一般'
        },
        {
          targetId:3,
          name: '不满意'
        }
      ],

      actionSheet3Show:false,
      actions3:[
        {
          targetId:1,
          name: '可见',
        },
        {
          targetId:2,
          name: '不可见'
        }
      ],

      visiblePanelShow:false,

      friendsList:[
        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},
        {extend:false,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false},{extend:true,selected:false}
      ],
      sTop:0,
      addViewPanelTitle:'',
      addViewPanelShow:false,

      visibleType:0
    }
  },
  computed:{
    showSelectedPanel(){
      return this.friendsList.every((item)=>{
        return item.selected == false;
      })
    }
  },
  onShareAppMessage(obj){
      return {
        title:'您的好友邀请您加入咨询堂',
        path:'/pages/index/index?mineId=2019&uId=2018',
        imageUrl:'/static/img/share_test_img.png'
      }
  },

  components: {
    
  },

  methods: {
    selectFriend(index){
      this.friendsList[index].selected = !this.friendsList[index].selected;
      // this.selectFriendsPanelScrollBottom();
    },
    
    selectFriendsPanelScrollBottom(){
      let that = this;
      wx.createSelectorQuery().select('#chat-ref').boundingClientRect(function (rect) {
        that.sTop = rect ? parseInt(rect.height) : 0
      }).exec()
    },

    showActionSheet1(){
      this.actionSheet1Show = true;
    },
   
    showActionSheet3(){
      this.actionSheet3Show = true;
    },
    closeActionSheet1(){
      this.actionSheet1Show = false;
    },
  
    closeActionSheet3(){
      this.actionSheet3Show = false;
    },
    selectAction1(data){
      if(data.mp.detail.targetId == 1){

      }else{
       
      };
      this.actionSheet1Show = false;
    },

    selectAction3(data){
      if(data.mp.detail.targetId == 1){

      }else{
       
      };
      this.actionSheet3Show = false;
    },

    changeVisibleType(type){
      if(this.visibleType == type){
        return;
      }
      this.visibleType = type;
    },
    
    showAddViewPanel(flag){
      if(flag == 1){
        this.addViewPanelTitle = '设置对谁可见';
      }else{
        this.addViewPanelTitle = '设置对谁不可见';
      }
      this.addViewPanelShow = true;
    }
  },
  created () {
   
  },
  onShow(){
    this.visiblePanelShow = false;
  }
}
</script>

<style lang="less" scoped>
  .container{
    background-color: #fff;
    padding-top: 20px;
  }
  // .comment_item{
  //   padding:0 15px;
  //   margin-bottom: 10px;
  //   font-size: 13px;
  //   color: #666;
  //   .comment_q{

  //     margin-bottom: 5px;
  //   }
  //   .comment_a{
  //     display: flex;
  //   }
  // }
  // .comment_tags{
  //   display: flex;
  //   padding: 0 15px;
  //   flex-wrap: wrap;
  //   margin-top: 10px;
  //   .tag_item{
  //     height: 20px;
  //     margin-right: 20px;
  //     display: flex;
  //     align-items: center;
  //     border:1px solid #1fb7b6;
  //     background-color: #f3fbfb;
  //     border-radius: 11px;
  //     padding:0 10px;
  //     color: #1fb7b6;
  //     font-size: 12px;
  //   }
  //   .tag_item.active{
  //     background-color :#1fb7b6;
  //     color: #fff;
  //   }
  // }
  // .comment_input{
  //   display: flex;
  //   justify-content: center;
  //   margin-top: 10px;
  //   textarea{
  //     width: 315px;
  //     border:1px solid #e6e6e6;
  //     height: 150px;
  //     border-radius: 8px;
  //     font-size: 13px;
  //     padding:15px;
  //   }
  // }
  // .visible_block{
  //   display: flex;
  //   justify-content: flex-end;
  //   margin-top: 15px;
  //   padding:0 15px;
  // }
  .submit_block{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .comment_panel{
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
    .input_block{
      margin:15px;
      margin-bottom: 0;
      display: flex;
      // border-bottom: 1px solid #f1f3f5;
      .text_area{
        width: 100%;
        height: 120px;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        padding: 15px;
        background-color: #fbfbfb;
        border-radius: 2px;
      }
    }
    .select_list{
      margin:0 15px;
      border-bottom: 1px solid #f1f3f5;
      .select_item{
        display: flex;
        justify-content: space-between;
        height: 44px;
        align-items: center;
        margin-left: 5px;
        padding-right: 5px;
        position: relative;
        .left{
          display: flex;
          align-items: center;
          img{
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }
          span{
            font-size: 14px;
            color: #333;

          }
        }
        .right{
          display: flex;
          align-items: center;
          span{
            font-size: 13px;
            color: #999;
            
          }
          img{
            width: 12px;
            height: 12px;
            margin-left: 10px;
          }
        }
        &.fbt::before{
          content: '';
          position: absolute;
          bottom: 0;
          left: 30px;
          right: 0;
          height: 1px;
          background-color: #f1f3f5;
        }
      }
    }
  }


.visible_panel{
    position: fixed;
    transform: translateX(100%);
    transition: all 0.3s;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 9;
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

    .select_list{
      margin:0 15px;
      .select_item{
        display: flex;
        padding: 10px 0;
        position: relative;
        border-bottom: 1px solid #f1f3f5;
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
        .select_text{
          flex: 1;
          .select_text1{
            font-size: 14px;
            color: #333;
          }
          .select_text2{
            font-size: 12px;
            color: #999;
          }
          .select_text3{
            font-size: 12px;
            color: #aaa;
            margin-top: 5px;
          }
          .select_text4{
            font-size: 12px;
            color: #999;
            margin-top: 5px;
            display: flex;
            span{
              width: 200px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
        .to_select_btn{
          position: absolute;
          top:0;
          right: 0;
          height: 50px;
          display: flex;
          padding:0 10px;
          padding-bottom: 20px;
          align-items: center;
          font-size: 14px;
          color: #666;
          img{
            width: 12px;
            height: 12px;
            margin-left: 5px;
          }
        }
      }
    }
  }

</style>