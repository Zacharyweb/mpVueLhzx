<template>
  <div>
    <div class="chat_room">

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
      <div class="input_panel">
        <div class="left">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import util from '../../utils/index.js'
export default {
  data(){
    return{
      inputVal:'',
      sTop:0,
      chatList:[
        {type:'e',content:'你好我是专家',time:'2019-03-12 16:20:56'},
        {type:'u',content:'你好我是用户',time:'2019-03-12 16:21:56'}
      ]
    }
  },
  computed: {
    ...mapState({
      count: state => state.counter.count
    })
  },

  mounted(){

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
    }

  }
}
</script>

<style lang="less">
.chat_room{
  width: 100%;
  background-color: #f5f7f9;
  position: fixed;
  top: 0;
  bottom: 54px;
  left: 0;
  z-index: 1;
  display: flex;
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
           left: -18px;
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
           right: -18px;
           border-right-color: transparent;
           border-left-color: #fff;
         }
      }
    }

  }

}

      
.input_panel{
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  padding:0 15px;
  height: 54px;
  background-color: #fff; 
  align-items: center;
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
    input{
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      border:1px solid #eee;
      background-color: #f5f7f9;
      border-radius: 4px;
      font-size: 14px;
      padding:0 15px;


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
