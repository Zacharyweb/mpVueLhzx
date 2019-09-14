<template>
  <div class="container" :class="{'m_bottom':isX}" v-if="expertData">
    <div class="experts_item">
      <div class="top_block">
        <img class="experts_avatar" :src="expertData.avatarUrl" v-if="expertData.avatarUrl">
        <img class="experts_avatar" v-else src="../../../static/img/df_avatar.jpg">
        <div class="top_block_right">
          <div class="experts_msg1">
            <div class="experts_name">{{expertData.nickName}}
              <span class="status" v-if="expertData.workStatus == 1">营业中</span>
              <span class="status grey" v-else>休息中</span>
            </div>
            <!-- <span class="consult_msg">{{expertData.followCount}}人已关注</span> -->
          </div>
          <div class="experts_msg2">
            <!-- <span class="respond_time"><span>{{expertData.responseTime}}</span>分钟内回应，<span>{{expertData.answeringTime/60}}</span>小时内作答</span> -->
            <span class="respond_time text_ellipsis">{{expertData.companyPosition}}（{{expertData.companyName}}）</span>
            <!-- <span class="order_num">{{expertData.consultedCount}}人已咨询</span> -->
          </div>
          <div class="experts_msg3">
            <div class="experts_location">
              <img src="../../../static/img/location_icon.png">{{expertData.address}}
            </div>
            <span class="devide_line"></span>
            <div class="experts_experience">
              <img src="../../../static/img/time_icon.png">{{expertData.majorYearsDesc}}从业经验
            </div>
          </div>
        </div>
      </div>
      <div class="chat_block" @click="toChatRoom">
        <img class="chat_icon" src="../../../static/img/chat_icon.png">
        <div class="chat_text">聊天问候</div>
      </div>
    </div>
    
    <div class="other_msg">
        <div class="focus_block">
          <img class="focus_icon" src="../../../static/img/collect_icon.png" v-if="!collected" @click="addUserFollow">
          <img class="focus_icon" src="../../../static/img/collect_icon2.png" v-if="collected" @click="deleteUserFollow">
          <span class="num_text">{{expertData.followCount}}人已关注</span>
        </div>
        <div class="orders_block">
          <span class="num_text">{{expertData.consultedCount}}人已咨询</span>
        </div>
    </div>

    <div class="custom_tabs">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">关于专家</div>
      <div class="tab_item" :class="{'active':currentTab == 1}" @click="changeTab(1)">关系户</div>
      <span class="active_bar" :class="{'active25':currentTab == 0,'active75':currentTab == 1}"></span>
    </div>

    <div class="introduce_panel" v-show="currentTab == 0">
      <div class="panle_block nb">
         <div class="base_msg">
          <span class="msg_name">行业</span>
          <span class="msg_content">{{expertData.businessArea}}</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">科室</span>
          <span class="msg_content">{{expertData.goodAtBusiness}}</span>
        </div>
      </div>

      <div class="panle_block">
        <div class="block_title">工作介绍</div>
        <div class="block_content">{{expertData.lifeAndFeelDesc}}</div>
      </div>

      <div class="panle_block">
        <div class="block_title">政策解读</div>
        <div class="block_content">{{expertData.policyInterpretation}}</div>
      </div>


      <div class="panle_block" v-if="expertData.outLink.length > 0">
        <div class="block_title">作品链接</div>
        <div class="base_msg no_name" v-for="(item,index) in expertData.outLink" :key="index" @click="copyText(item.link)">
           <span class="msg_name"></span>
           <span class="msg_content">{{item.name}}</span>
        </div>
      </div>

      <div class="panle_block" v-if="expertData.photosList.length > 0">
        <div class="block_title">相关照片</div>
        <div class="block_content">
          <img class="intro_img"  v-for="(item,index) in expertData.photosList" :src="item" :key="index" @click="showImgSwiper(index)">
        </div>
      </div>
    </div>

    <!-- <div class="comment_panel" v-show="currentTab == 2">
      <div class="comment_item">
        <img class="user_avatar" src="../../../static/img/avatar.jpeg">
        <div class="comment_content">
          <div class="content_top">
             <span class="user_name">王小花</span>
             <span class="comment_time">2019-02-08 15:00:32</span>
          </div>
          <div class="comment_text">
            张老师回答得不错哦，给个赞呢
          </div>
          <div class="comment_tags">
            <span class="tag_item">值得推荐</span>
            <span class="tag_item">将会再次咨询</span>
            <span class="tag_item">专业</span>
          </div>
        </div>
      </div>

      <div class="comment_item">
        <img class="user_avatar" src="../../../static/img/avatar.jpeg">
        <div class="comment_content">
          <div class="content_top">
             <span class="user_name">王小花</span>
             <span class="comment_time">2019-02-08 15:00:32</span>
          </div>
          <div class="comment_text">
            张老师回答得不错哦，给个赞呢
          </div>
          <div class="comment_tags">
            <span class="tag_item">值得推荐</span>
            <span class="tag_item">将会再次咨询</span>
            <span class="tag_item">专业</span>
          </div>
        </div>
      </div>
    </div> -->

    <div class="comment_panel" v-show="currentTab == 1">
      <div class="friends_block">
        <div class="block_title nb">关注</div>
        <ul class="friends_list">
          <li class="friend_item" v-for="(item,index) in followUserList" :key="index">
            <img class="user_avatar" :src="item.userAvatarUrl">
            <span>{{item.userNickName}}</span>
          </li>
        </ul>

      </div>

      <div class="friends_block">
        <div class="block_title">评价</div>
        <div class="comment_item" v-if="commentData.length > 0" v-for="(item,index) in commentData" :key="index">
          <img class="user_avatar" :src="item.avatarUrl">
          <span class="comment_tag">{{item.commentTag}}</span>
          <div class="comment_content">
            <div class="content_top">
               <span class="user_name">{{item.nickName}}</span>
               <span class="comment_time">{{item.creationTime}}</span>
            </div>
            <div class="comment_text">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="no_data_tips" v-if="commentData.length == 0">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png">
        <span>还没有关系户关注或评价过哦~</span>
      </div> 

    </div>

    <!-- <div class="to_chat_btn" @click="toChatRoom" :class="{'m_top':isX}">
        <img class="bounceIn" src="../../../static/img/chat_circle_icon.png">
    </div> -->

    <div class="bottom_fixed" :class="{'isX':isX}">
      <div class="icon_btns">
        <button open-type="share" class="icon_btn btn_reset">
          <img src="../../../static/img/share_icon.png">
          <span>分享</span>
        </button>
      </div>
      
      <span class="respond_time_tips">{{expertData.responseTime}}分钟内回应接单</span>
      <span class="action_btn2" @click="toContact" v-if="expertData.workStatus == 1">马上咨询&nbsp;￥{{expertData.oneOfCost}}/次</span>
      <span class="action_btn3" v-else>休息中&nbsp;￥{{expertData.oneOfCost}}/次</span>

    </div>

    <van-action-sheet
      :show="actionSheetShow"
      :actions="actions"
      @close="onCloseActionSheet"
      @select="onSelectAction"
    />
    
    <swiper class="imgs_swiper"
      v-if="imgSwiperShow"
      :indicator-dots="true"
      :current="swiperCurrent"
      :autoplay="false"
      :duration="300"
      indicator-color="rgba(255,255,255,0.6)"
      indicator-active-color="#fff"
    >
      <block v-for="(item,index) in expertData.photosList" :key="index">
        <swiper-item class="img_item" @click="imgSwiperShow = false">
          <image :src="item" mode="widthFix" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {API, BASE_URL} from  '../../http/api.js'
import util from '../../utils/index.js'
export default {
  data(){
    return{
      currentTab:0,
      collected:false,
      actionSheetShow:false,
      actions:[
        {
          targetId:1,
          name: '在线问答',
          subname: '￥40',
        },
        {
          targetId:2,
          name: '电话约谈',
          subname: '￥40/15分钟',
        },
        {
          targetId:3,
          name: '咨询疑问'
        }
      ],
    
      imgSwiperShow: false,
      swiperCurrent:2,
      expertData:null,
      expertId:'',
      commentData:[],
      followUserList:[]
    }
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX,
      userData: state => state.counter.userData
    })
  },
  onLoad(options){
    this.expertId = options.id;
    this.getInitData(options.id);
    this.CheckHasFollowed();
  },
  mounted(){

  },
  onShareAppMessage(obj){
 
      return {
        title:'您的好友' + this.userData.nickName + '向你推荐一位咨询堂专家',
        path:'/pages/login/index?userId=' + this.userData.userId + '&expertId=' + this.expertId + '&fromType=1',
        // imageUrl:'/static/img/share_test_img.png'
      }
  },
  methods: {
    ...mapActions('counter', [
      'increment',
      'decrement',
      'getProvince'
    ]),
    linkTo(path){
      this.$router.push(path);
    },
    changeTab(num){
      if(this.currentTab == num){
        return;
      }
      this.currentTab = num;
    },
    toContact(){
      // this.actionSheetShow = true;
      this.$router.push({path:'/pages/startConsult/index',query:{expertId:this.expertId}});
    },
    onCloseActionSheet(){
       this.actionSheetShow = false;
    },
    onSelectAction(data){
      if(data.mp.detail.targetId == 1){
        
      }else if(data.mp.detail.targetId == 2){
        
      }else{

      };
      this.actionSheetShow = false;
    },
    toChatRoom(){
      this.$router.push({path:'/pages/chatRoom/index',query:{
          userId:this.userData.userId,
          expertId:this.expertId,
          cost:this.expertData.oneOfCost
        }
      })
    },
    showImgSwiper(index){

      this.swiperCurrent = index;
      this.imgSwiperShow = true;
    },
    getInitData(id){
      let url = API['GetUserDetail'] + id;
      this.$http.request({
        url:url,
      }).then(res => {
        let expertData = {};

        let result = res.data;
        expertData.avatarUrl = result.avatarUrl;
        expertData.followCount = result.followCount;
        expertData.consultedCount = result.consultedCount;
        expertData.orderCount = result.orderCount;

        expertData.nickName = result.nickName;
        if(result.address){
           expertData.address = result.address.split('-')[1] || result.address.split('市')[0] + '市';
        }else{
          expertData.address ='未知';
        }
       
        expertData.companyName = result.companyName;
        expertData.companyPosition = result.companyPosition;
        expertData.lifeAndFeelDesc = result.lifeAndFeelDesc;
        expertData.aboutUserDesc = result.aboutUserDesc;
        expertData.oneOfCost = result.oneOfCost;
        let photosList = [];
        result.userFiles.forEach((item)=>{
          photosList.push(item.fileUrl);
        })
        expertData.photosList = photosList;
 

        let outLink;
        if(result.outLink){
          outLink = result.outLink.split('|zxt|');
        }else{
          outLink =[];
        }

        if(outLink.length > 0 && outLink[0].indexOf('{') != -1){
          expertData.outLink = outLink.map((item)=>{
            return JSON.parse(item);
          });
        }else{
          expertData.outLink = [];
        }

        expertData.major = result.major;
        expertData.majorYearsDesc = result.majorYearsDesc;
        expertData.businessArea = result.businessArea;
        expertData.goodAtBusiness = result.goodAtBusiness;
        expertData.responseTime = result.responseTime;
        expertData.answeringTime = result.answeringTime;
        expertData.workStatus = result.workStatus;
        this.expertData = expertData;
        if(result.comments && result.comments.length){
          result.comments.forEach((item)=>{
            item.creationTime = util.formatTime(new Date(item.creationTime));
          });
        }
        this.followUserList = result.followUserList || [];
        this.commentData = result.comments || [];

      })
    },
    CheckHasFollowed(){
      this.$http.request({
        url:'CheckHasFollowed',
        data:{
          userId: this.userData.userId,
          expertId: this.expertId*1
        },
        config:{
          hideMsg:true // 是否隐藏res.code不为1时的错误提示
        }
      }).then(res => {
        if(res.code == 1){
          this.collected = true;
        }else{
          this.collected = false;
        }
      })
    },
    addUserFollow(){
      this.$http.request({
        url:'AddUserFollow',
        data:{
          userId: this.userData.userId,
          expertId: this.expertId*1
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          wx.showToast({
             title: '关注成功',
             icon: 'none',
             duration: 1000
          });
          this.expertData.followCount++;
          this.collected = true;
        }
      })
    },
    deleteUserFollow(){
      this.$http.request({
        url:'DeleteUserFollow',
        data:{
          userId: this.userData.userId,
          expertId: this.expertId*1
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          wx.showToast({
             title: '已取消关注',
             icon: 'none',
             duration: 1000
          });
          this.expertData.followCount--;
          this.collected = false;
        }
      })
    },
    copyText(text){
      wx.setClipboardData({
        data: text,
        success (res) {
          wx.showToast({
            title: '已复制相关链接',
            icon: 'none',
            duration: 1500
          });
         
        }
      })
    }
  },
  onShow(){
    this.currentTab = 0;
  }
}
</script>

<style lang="less">
.container{
  padding-bottom: 50px;
  &.m_bottom{
    padding-bottom: 82px;
  }
}
.experts_item{
  margin-bottom: 0;
  position: relative;
  .chat_block{
    position: absolute;
    right: 0;
    top: 6px;
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .chat_icon{
      width: 30px;
      height: 30px;
    }
    .chat_text{
      font-size: 12px;
      color: #999;
      text-align: center;
      margin-top: 5px;
    
    }
  }
}

  .other_msg{
    display: flex;
    height: 32px;
    align-items: center;
    background-color: #f3fbfb;
    .focus_block{
      flex: 1;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .focus_icon{
        width: 20px;
        height: 20px;
        margin-right: 5px;
     
      }
      .num_text{
        font-size: 14px;
        // color: #666;
        color: #1fb7b6;
      }
    }
    .orders_block{
      flex: 1;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .num_text{
         font-size: 14px;
        //  color: #666;
         color: #1fb7b6;
      }
    }
  }
.introduce_panel{
    padding:0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  .panle_block{
    padding:20px 15px;
    border-top: 1px solid #e6e8eb;
  }
  .panle_block.nb{
    border-top: 0;
  }
  .block_title{
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-bottom: 17px;
  }
  .base_msg{
    font-size: 13px;
    min-height: 20px;
    color: #777;
    display: flex;
    &+.base_msg{
      margin-top: 8px;
    }
   
    .msg_name{
       position: relative;
       padding-left: 12px;
       width: 64px;
    }
    &.no_name{
      .msg_name{
        width: 0px;
      }
      .msg_content{
        margin-left: 5px;
      }
    }
    .msg_name::before{
      content:'';
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #999;
      position: absolute;
      left: 0;
      top:6px;
    }
    .msg_content{
      flex: 1;
      margin-left: 10px;
      color: #333;
    }
  }
  .block_content{
     font-size: 13px;
     color: #777;
     .intro_img{
       width: 50px;
       height: 50px;
       margin-left: 5px;
     }
  }
}



.comment_panel{
  background-color: #fff;
  .friends_block{
    .block_title{
      border-top: 1px solid #f3f5f7;
      padding: 15px 15px;
      padding-bottom: 0;
      font-size: 14px;
      line-height: 1.5;
      color: #666;
      font-weight: bold;
      &.nb{
         border-top: none;
      }
    }
  }
  .friends_list{
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    padding-bottom: 8px;
    .friend_item{
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 7px;
      .user_avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border:3px solid #e6e8eb;
        margin-bottom: 5px;
      }
      span{
        text-align: center;
        font-size: 12px;
        color: #666;
      }

    }

  }

  .comment_item{
    padding:15px;
    display: flex;
    // margin-bottom: 5px;
    position: relative;
    border-bottom: 1px solid #f3f5f7;
    .user_avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border:3px solid #e6e8eb;
      margin-right: 15px;
    }
    .comment_tag{
      position: absolute;
      top:50px;
      left: 39px;
      height: 20px;
      display: flex;
      align-items: center;
      padding:0 10px;
      color: #1fb7b6;
      background-color: #f3fbfb;;
      border-radius: 10px;
      font-size: 12px;
      transform: translateX(-50%);
    }
    .comment_content{
      font-size: 13px;
      flex: 1;
      .content_top{
        display: flex;
        justify-content: space-between;
        .user_name{
          font-size: 14px;
          color: #333;
        }
        .comment_time{
          font-size: 13px;
          color: #999;
        }
      }
      .comment_text{
        margin-top: 10px;
        font-size: 13px;
        line-height: 1.5;
        color: #666;
      }
      .comment_tags{
        display: flex;  
        margin-top: 10px;
        .tag_item{
          margin-right: 10px;
          font-size: 14px;
          height: 20px;
          display: flex;
          align-items: center;
          padding:0 10px;
          color: #1fb7b6;
          background-color: #f3fbfb;;
          // border:1px solid #aaa;
          border-radius: 10px;
        }
      }
     
    }
  }
}
.bottom_fixed{
  justify-content: space-between;
  .icon_btns{
    margin-left: 20px;
    display: flex;
    align-items: center;
    .icon_btn{
      width: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      img{
        width: 24px;
        height: 24px;
      }
      span{
        font-size: 12px;
        margin-top: 2px;
        line-height: 1.5;
      }
    }
  }
  .respond_time_tips{
    font-size: 14px;
    color: #999;
  }
}



// 专家列表
.experts_name{
  font-size: 16px;
  color: #333;
  span{
    font-size: 13px;
    margin-left: 5px;
    color: #666;
  }
}
.experts_msg2{
  .respond_time{
    font-size: 13px;
    color: #444;
    width: 200px;

    span{
      font-weight: bold;
    }
  }
}
.to_chat_btn{
  position: fixed;
  bottom: 60px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px solid #1fb7b6;
  background-color: #f3fbfb;
  &.m_top{
    bottom: 92px;
  }
  img{
    width: 22px;
    height: 22px;
  }
}
// .imgs_swiper{
//   position: fixed;
//   top:0;
//   left: 0;
//   background-color: #000;
//   z-index: 9;
//   height: 100%;
//   width: 100%;

//   .img_item{
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     image{
//       width: 375px;
//     }

//   }

// }

 
</style>
