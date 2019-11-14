<template>
  <div>
    <div class="chat_room" :class="{'isX':isX}"> 
      <div class="consult_tips_panel" @click="toContact">
        <span class="tips_text">初步咨询满意的话可下单咨询哦~</span>
        <span class="consule_btn">马上咨询 35元/次</span>
      </div>

      <scroll-view scroll-y  :scroll-top="sTop" class="chat_content">
        <div id='chat-ref'>
          <div class="content_item" v-for="(item,index) in chatList" :key="index">
            <div class="content_time">{{item.time}}</div>
            <div v-if="item.type == 'e'" class="content_body">
               <img class="user_avatar" src="../../../static/img/avatar.jpeg">
               <div class="content_panel">{{item.content}}</div>
            </div>
            <div v-else class="content_body right">
                <div class="content_panel">{{item.content}}</div>
                <img class="user_avatar" src="../../../static/img/avatar.jpeg">
            </div>
          </div>
        </div>
      </scroll-view>
      <div class="input_panel" :class="{'isX':isX}">
        <div class="left" @click="toIndex">
          <img src="../../../static/img/home_icon.png">
          <span>首页</span>
        </div>
        <div class="center">
          <input type="text" v-model="inputVal" placeholder="请输入您要咨询的相关内容">
        </div>
        <div class="right">
          <span @click="sendInputVal">发送</span>
        </div>
      </div>
    </div>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Dialog from '../../../static/vant/dialog/dialog';
import util from '../../utils/index.js'
export default {
  data(){
    return{
      inputVal:'',
      sTop:0,
      chatList:[
        {type:'e',content:'你好我是专家',time:'2019-03-12 16:20:56'},
        {type:'u',content:'你好我是用户',time:'2019-03-12 16:21:56'}
      ],
      userId:'',
      expertId:'',
      cost:'',

      timer:''
    }
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX,
      i18n: state => state.counter.i18n
    })
  },

  mounted(){

  },
  onLoad(options){
    this.userId = options.userId;
    this.expertId = options.expertId;
    this.cost = options.cost;
    this.getExpertIfOline();
    this.getChatData();
  },
  methods: {
    linkTo(path){
      this.$router.push(path);
    },
    sendInputVal(){
      if(!this.inputVal){
        return;
      };
      let that = this;
      let time = util.formatTime(new Date());
      this.chatList = [...this.chatList,{type:'u',content:this.inputVal,time:time}];
      this.chatRoomSlideToBottom();
      this.inputVal = '';
    },
    chatRoomSlideToBottom(){
      let that = this;
      wx.createSelectorQuery().select('#chat-ref').boundingClientRect(function (rect) {
        that.sTop = rect ? parseInt(rect.height) : 0
      }).exec()
    },
    toIndex(){
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    getExpertIfOline(){
      let online = true;
      if(online){
        Dialog.alert({
          title: '提示',
          message: '专家在线，发起问候后专家随即进入聊天室',
          confirmButtonText:'知道了',
        }).then(() => {
          // on close
        });
      }else{
        Dialog.alert({
          title: '提示',
          message: '请在聊天室留言专家会随后回复的',
          confirmButtonText:'知道了',
        }).then(() => {
          // on close
        });
      }
    },
    getChatData(){
      // this.$http.request({
      //   url:'GetChatData',
      //   data:{
      //     userId: this.userId,
      //     isExpert: this.expertId
      //   },
      //   flyConfig:{
      //     method: 'post'
      //   }
      // }).then(res => {
      //   if(res.code == 1){
      //     this.loopGetData();
      //   }
      // })
    },
    toContact(){
      this.$router.push({
          path:'/pages/startConsult/index',
          query:{expertId:this.expertId}
        }
      );
    },
    loopGetData(){
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.getChatData();
      },5000)
    }
  },
  onHide(){
    clearTimeout(this.timer);
  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
  }
}
</script>

<style lang="less">
.chat_room{
  width: 100%;
  background-color: #f5f7f9;
  position: fixed;
  top: 30px;
  bottom: 54px;
  left: 0;
  z-index: 1;
  display: flex;
  &.isX {
    bottom: 86px;
  }
}
.consult_tips_panel{
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  height: 30px;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 15px;
  .tips_text{
    color: #fff;
    font-size: 13px;
  }
  .consule_btn{
    color: #fff;
    font-size: 12px;
    padding:2px 6px;
    border:1px solid #fff;
    border-radius: 2px;
  }
}
.chat_content{
  // box-sizing: border-box;
  flex: 1;

  #chat-ref{
     padding:20px 20px 0 20px;
  }
  .content_item{
    margin-bottom: 15px;
    .content_time{
      text-align: center;
      font-size: 12px;
      margin-bottom: 10px;
      color: #666;
    }
    .content_body{
      display: flex;
      .user_avatar{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-right: 15px;
      }
      .content_panel{
         max-width: 240px;
         padding:12px;
         border-radius: 4px;
         font-size: 14px;
         background-color: #fff;
         line-height: 1.5;
         word-break: break-all;
         position: relative;
         &::after{
           content: '';
           position: absolute;
           top: 10px;
           left: -16px;
           border-width: 5px 9px;
           border-style: solid;
           border-color: transparent;
           border-right-color: #fff;

         }
      }
    }
    .content_body.right{
      justify-content: flex-end;
      .user_avatar{
        margin-right: 0px;
        margin-left: 15px;
      }
      .content_panel{
         &::after{
           left: auto;
           right: -16px;
           border-right-color: transparent;
           border-left-color: #fff;
         }
      }
    }

  }

}

      
.input_panel{
  box-sizing: content-box;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding:0 15px;
  height: 54px;
  background-color: #fff; 
  align-items: center;
  &.isX{
    padding-bottom: 32px;
  }
  .left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 22px;
      height: 22px;
    }
    span{
      margin-top: 2px;
      font-size: 12px;
    }
  }
  .center{
    flex: 1;
    margin:0 15px;
    margin-right: 10px;
    border:1px solid #eee;
    background-color: #f5f7f9;
    border-radius: 4px;
    height: 32px;
    

    input{
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      // border:1px solid #eee;
      // background-color: #f5f7f9;
      // border-radius: 4px;
      font-size: 14px;
      padding:0 10px;
      margin-top: -9px;
    }
  }
  .right{
    display: flex;
    align-items: center;
    span{
      padding: 5px;
      font-size: 14px;
    }
  }
  
}

</style>
