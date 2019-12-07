<template>
  <div class="container">
    <!-- 用户评论组件 -->
    <div class="comment_panel show">
      <div class="page_title">评价：</div>
      <div class="actions_block">
        <span class="action_tips">你对本次服务是否满意？</span> 
        <div class="action_btn_bar">
            <span class="action_btn" :class="{'active':commentType == 1}" @click="changeCommentType(1)">满意</span>
            <span class="action_btn" :class="{'active':commentType == 2}" @click="changeCommentType(2)">一般</span>
            <span class="action_btn" :class="{'active':commentType == 3}" @click="changeCommentType(3)">不满意</span>
        </div>
      </div>

      <div class="input_block">
        <textarea  class="text_area" placeholder="说说你对专家的印象，点击下方“我的专家”公开给你的关系户见" v-model="commentContent" v-if="!visiblePanelShow && !addViewPanelShow && !modalShow"></textarea>
      </div>

      <div class="visible">
          <div class="tips_title">注：</div>
          <div>
              只有您允许的关系户才能看到您的评价，可到<span @click="toMyExpert">我的专家</span>里进行设置。
          </div>
      </div>

      <!-- <div class="select_list">
        <div class="select_item fbt">
         <div class="left">
            <img src="../../../static/img/comment_icon2.png">
           <span>谁可以看</span>
         </div>
         <div class="right" @click="showFriendsVisiblePanel">
           <span v-show="friendsVisible == 0">仅自己可见</span>
           <span v-show="friendsVisible == 1">所有关系户可见</span>
           <span v-show="friendsVisible == 2">选中的关系户可见</span>
           <span v-show="friendsVisible == 3">选中关系户不可见</span>
           <img src="../../../static/img/arrow_right3.png">
         </div>
        </div>

        <div class="select_item">
         <div class="left">
            <img src="../../../static/img/comment_icon3.png">
            <span>专家可见</span>
         </div>
         <div class="right" @click="showActionSheet3">
           <span>{{expertVisible == 1?'可见':'不可见'}}</span>
           <img src="../../../static/img/arrow_right3.png">
         </div>
        </div>
      </div> -->

      <div class="submit_block">
         <div class="btn large green" @click="submitComment">提交</div>
      </div>
    </div>

 
    <van-action-sheet
      :show="actionSheet3Show"
      :actions="actions3"
      @close="closeActionSheet3"
      @select="selectAction3"
    />


    <div class="visible_panel" :class="{'show':visiblePanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="visiblePanelShow = false">{{i18n.cancel}}</span>
        <span class="title">设置可见性</span>
        <span class="submit_btn" @click="visiblePanelShow = false">提交</span>
      </div>
   
      <div class="select_list">

        <div class="select_item"  @click="changeVisibleType(0)">
          <div class="select_icon">
            <span class="selcet_fill" v-show="friendsVisible == 0"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">私密</p>
            <p class="select_text2">仅自己可见</p>
          </div>
        </div>

        <div class="select_item" @click="changeVisibleType(1)">
          <div class="select_icon">
            <span class="selcet_fill" v-show="friendsVisible == 1"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">公开</p>
            <p class="select_text2">所有关系户可见</p>
          </div>
        </div>

      
        <div class="select_item" @click="changeVisibleType(2)">
          <div class="select_icon">
            <span class="selcet_fill" v-show="friendsVisible == 2"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">部分可见</p>
            <p class="select_text2">选中的关系户可见</p>
            <p class="select_text3" v-show="visibleFriendsList == 0">暂未选中任何关系户,点击右侧去选择</p>
            <p class="select_text4" v-show="visibleFriendsList.length > 0">
              <span  v-show="visibleFriendsList.length > 0">{{visibleFriendsListText}}</span>
            </p>
          </div>
          <div class="to_select_btn" @click="initSelectedFriends(1)">
            <span>去选择</span>
            <img src="../../../static/img/arrow_right3.png">
          </div>
        </div>

        <div class="select_item" @click="changeVisibleType(3)">
          <div class="select_icon"> 
            <span class="selcet_fill" v-show="friendsVisible == 3"></span>
          </div>
          <div class="select_text">
            <p class="select_text1">不给谁看</p>
            <p class="select_text2">选中关系户不可见</p>
            <p class="select_text3" v-show="notVisibleFriendsList.length == 0">暂未选中任何关系户,点击右侧去选择</p>
            <p class="select_text4" v-show="notVisibleFriendsList.length > 0">
              <span  v-show="notVisibleFriendsList.length > 0">{{notVisibleFriendsListText}}</span>
            </p>
          </div>
          <div class="to_select_btn" @click="initSelectedFriends(2)">
            <span>去选择</span>
            <img src="../../../static/img/arrow_right3.png">
          </div>
        </div>
      </div>

    </div>


 

    <!-- 设置评论的可见性 -->
    <div class="add_view_panel" @touchmove.stop="touchmoveStop" :class="{'show':addViewPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="addViewPanelShow = false">{{i18n.cancel}}</span>
        <span class="title">{{addViewPanelTitle}}</span>
        <span class="submit_btn" @click="submitSelectFriends">提交</span>
      </div>
      <!-- <scroll-view scroll-y :scroll-top="sTop" class="select_list" v-show="!showSelectedPanel">
        <div class="friend_avatar_list"  id='chat-ref'>
          <img class="friend_avatar" src="../../../static/img/avatar.jpeg"  v-for="(item,index) in friendsList" :key="index" v-if="item.flag">
        </div>
      </scroll-view> -->
      <!-- <scroll-view scroll-y class="friend_list_wrap" :class="{'less_top':showSelectedPanel}"> -->

      <scroll-view scroll-y class="friend_list_wrap" style="top:48px;">
        <ul class="friend_list">
          <li class="friend_item" v-for="(item,index) in friendsList" :key="index" @click="selectFriend(index)">
            <div class="select_icon">
              <span class="selcet_fill" v-show="item.flag"></span>
            </div>
            <img class="friend_avatar" :src="item.avatarUrl">
            <div class="friend_name">{{item.nickName}}</div>
          </li>
          <li class="friend_item">
            <div class="friend_name" style="color:#666;padding-left:4px;" @click="onShareAppMessage">
              <img class="share_icon" style="width:16px;height:16px;margin-right:5px;" src="../../../static/img/share_icon.png">分享专家至微信通讯录好友
            </div>
          </li>
        </ul>
       </scroll-view>
    </div>
    <van-dialog id="van-dialog"/>
  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
import util from '../../utils/index.js'
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
  
      actionSheet3Show:false,
      actions3:[
        {
          targetId:1,
          name: '可见',
        },
        {
          targetId:0,
          name: '不可见'
        }
      ],

      visiblePanelShow:false,

      friendsList:[],
      selectFriendsFor:1,

      sTop:0,

      addViewPanelTitle:'',
      addViewPanelShow:false,

      orderId:0,
      expertId:0,
      commentContent:'',

      expertVisible:1,
      friendsVisible:0,

      visibleFriendsList:[],
      notVisibleFriendsList:[],
      commentType:0,
      modalShow:false
    }
  },
  computed:{
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    showSelectedPanel(){
      return this.friendsList.every((item)=>{
        return item.flag == false;
      })
    },

    visibleFriendsListText(){
      let str = '';
      let list = [];
      this.visibleFriendsList.forEach((item)=>{
        list.push(item.userName);
      })
      str = list.join('、');
      if(str.length > 40){
        str = str.slice(0,40) + '...等'+ list.length +'人';
      }else{
        str = str + '(共'+ list.length +'人)';
      }
      return str;
    },
    notVisibleFriendsListText(){
      let str = '';
      let list = [];
      this.notVisibleFriendsList.forEach((item)=>{
        list.push(item.userName);
      })
      str = list.join('、');
      if(str.length > 40){
        str = str.slice(0,40) + '...等'+ list.length +'人';
      }else{
        str = str + '(共'+ list.length +'人)';
      }
      return str;
    },
  },
  onShareAppMessage(obj){
      return {
        title: '您的好友' + this.userData.nickName + '邀请您加入问税易',
        path:'/pages/login/index?userId=' + this.userData.userId + '&expertId=' + this.expertId + '&fromType=2',
        // imageUrl:'/static/img/share_test_img.png'
      }
  },

  components: {
    
  },

  methods: {
    selectFriend(index){
      this.friendsList[index].flag = !this.friendsList[index].flag;
      // this.selectFriendsPanelScrollBottom();
    },
    
    selectFriendsPanelScrollBottom(){
      let that = this;
      wx.createSelectorQuery().select('#chat-ref').boundingClientRect(function (rect) {
        that.sTop = rect ? parseInt(rect.height) : 0
      }).exec()
    },

    showFriendsVisiblePanel(){
      this.visiblePanelShow = true
    },
   
    showActionSheet3(){
      this.actionSheet3Show = true;
    },
    closeActionSheet3(){
      this.actionSheet3Show = false;
    },
  
    selectAction3(data){
      this.expertVisible = data.mp.detail.targetId;
      this.actionSheet3Show = false;
    },

    changeVisibleType(type){
      if(this.friendsVisible == type){
        return;
      }
      this.friendsVisible = type;
    },
    
    getUserFriendsList(){
      this.$http.request({
        url:'GetUserFriendList',
        data:{
          userId: this.userData.userId,
          isExpert:1
        },
        flyConfig:{
          method: 'post'
        },
        config:{
          hideMsg:true
        }
      }).then(res => {
        if(res.code == 1){
          res.data.forEach(item => {
            item.flag = false;
          }); 
          this.friendsList = res.data;
        }
      })
    },

    initSelectedFriends(flag){
      let list;
      this.selectFriendsFor = flag;
      if(flag == 1){
        this.addViewPanelTitle = '设置对谁可见';
        list = this.visibleFriendsList;
      }else{
        this.addViewPanelTitle = '设置对谁不可见';
        list = this.notVisibleFriendsList;
      };

      this.friendsList.forEach((item)=>{
        list.forEach((f)=>{
          if(f.userId == item.userId){
            item.flag = true;
          }
        })
      });

      this.addViewPanelShow = true;
    },

    submitSelectFriends(){
      let list = [];

      this.friendsList.forEach((item)=>{
        if(item.flag){
          list.push({userId:item.id,userName:item.nickName})
        } 
      });

      if(this.selectFriendsFor == 1){
        this.visibleFriendsList = list;
      }else{
        this.notVisibleFriendsList = list;
      }
  
      this.addViewPanelShow = false;
    },

    submitComment(){
      if(!this.commentType){
        this.showToast('请选择是否满意');
        return;
      };
      if(this.commentType == 3 && !this.commentContent){
        this.modalShow = true;
        Dialog.alert({
          title: '提示',
          message: '请填写不满的理由，以便专家了解改进',
          confirmButtonText:'我知道了'
        }).then(() => {
          this.modalShow = false;
        });
      }

      // if(!this.commentContent){
      //   this.showToast('请输入评价内容');
      //   return;
      // };

      if(this.commentType == 3){
          this.modalShow = true;
          Dialog.confirm({
            title: '提示',
            message: '为便于专家与您联系协商，您的手机号将会同时发送给专家。',
            confirmButtonText:'同意发送',
            cancelButtonText:this.i18n.cancel
          }).then(() => {
            this.modalShow = false;
            this.commitComment();
          }).catch(() => {
            this.modalShow = false;
          });
      }else{
        this.commitComment();
      }
      // let list = [];
      // if(this.friendsVisible == 2){
      //   if(this.visibleFriendsList.length == 0){
      //     this.showToast('请选择可见好友');
      //     return;
      //   }else{
    
      //     this.visibleFriendsList.forEach((item)=>{
      //       list.push({userId:item.userId})
      //     })
      //   }
      // }
      // if(this.friendsVisible == 3){
      //   if(this.notVisibleFriendsList.length == 0){
      //     this.showToast('请选择不可见好友');
      //     return;
      //   }else{
      //     this.notVisibleFriendsList.forEach((item)=>{
      //       list.push({userId:item.userId})
      //     })
      //   }
      // }
    },
    commitComment(){
      let flag = '';
      if(this.commentType == 3){
        flag = '不满意';
      }else if(this.commentType == 2){
        flag = '一般';
      }else{
        flag = '满意';
      }
      this.$http.request({
        url:'UserDoSure',
        data:{
          orderId: this.orderId*1,
          satisfactionDegree: flag,
          satisfactionDegreeDesc:this.commentContent,
          satisfactionDegreeTime: util.formatTime(new Date())
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          if(this.commentType == 3){
            this.modalShow = true;
            Dialog.alert({
              title: '提示',
              message: '申诉已提交，专家到时可能会联系您进行协商，请留意。',
              confirmButtonText:'我知道了'
            }).then(() => {
               this.modalShow = false;
               this.$router.go(-1);   
            });
          }else{
            this.$router.go(-1);
          }
        }
      });
    },
    
    changeCommentType(type){
      if(this.commentType == type){
        return;
      }
      this.commentType = type;
    },

    toMyExpert(){
      this.$router.push({path:'/pages/myExpert/index'}) 
    }
  },
  created () {
   
  },
  onLoad(options){
    this.modalShow = false;
    this.visiblePanelShow = false;
    this.orderId= options.orderId;
    this.expertId = options.expertId;
    this.commentContent = '';
    this.commentType = 0;
    // this.getUserFriendsList();
  },
  onShow(){

  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
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

.page_title{
    padding: 15px 15px;
    font-size: 14px;
    color: #000;
    font-weight: bold;
}
.actions_block{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  padding-top: 0;
  font-size: 12px;
  .action_tips{
    font-size: 14px;
    color: #666;
  }
  .action_btn_bar{
    display: flex;
    align-items: center;
  }
  .action_btn{
    height: 28px;
    padding:0 10px;
    border-radius: 4px;
    color: #1fb7b6;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-left: 10px;
    border: 1px solid #1fb7b6;
  }
  .action_btn.active{
    color: #fff;
    background-color: #1fb7b6;
  }
}
.visible{
  padding:10px 15px;
  display: flex;
  font-size: 13px;
  color: #999;
  .tips_title{
    color: #333;
  }
  span{
      color: #1fb7b6;
  }
}


</style>