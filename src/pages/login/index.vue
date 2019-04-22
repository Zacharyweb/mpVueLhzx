<template>
  <div class="container">
    <div class="user_avatar_panel">
        <img class="user_avatar" src="../../../static/img/avatar.jpeg">
        <span class="change_avatar_btn" @click="toUseNotice">使用说明</span>
    </div>
    <div class="base_msg_panel">

      <ul class="form_list">
        <li class="form_item">
          <div class="item_content">
            <input type="number" maxlength='11' style="width:190px;" placeholder="请输入手机号">
            <span class="devide_line"></span>
            <!-- <span class="tips_text1" @click="count" v-if="status == 1">发送验证码</span> -->
            <button class="tips_text1" v-if="status == 1" @getuserinfo="onGotUserInfo" open-type="getUserInfo">发送验证码</button>

            <span class="tips_text2" v-if="status == 2">已发送{{timeText}}s</span>
          </div>
        </li>
        <li class="form_item">
          <div class="item_content">
            <input type="number" maxlength='6' placeholder="请输入验证码">
          </div>
        </li>
       
      </ul>
  
      <div class="btn_block">
        <div class="btn large green" @click="toLogin">登录</div>
      </div>
    </div>
    


  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      time:60,
      timeText:'60',
      timer:null,
      status:1

    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },

  components: {

  },

  methods: {
    ...mapActions('counter', [
      'updateUserMsg'
    ]),
    count(){
      var that = this;
      this.status = 2;
      this.timer = setInterval(()=>{
          this.time--;
          if(this.time < 10){
            this.timeText = '0' + this.time;
          }else{
            this.timeText = '' + this.time;
          }
          if(this.time <= 0){
            clearInterval(that.timer);
            that.status = 1;
            that.time = 60;
            this.timeText = '60';
          }
      },1000)
    },
    toLogin(res){
      console.log(res);
      // wx.switchTab({
      //   url: '/pages/index/index'
      // });
      //  wx.login({
      //   success(res) {
      //     if (res.code) {
      //       发起网络请求
      //       wx.request({
      //         url: 'https://test.com/onLogin',
      //         data: {
      //           code: res.code
      //         }
      //       })
      //       console.log(res);
      //     } else {
      //       console.log('登录失败！' + res.errMsg)
      //     }
      //   }
      // })
      // 
    },

    getSetting(){
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      })
    },
   
    onGotUserInfo(e){
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        let data = this.userData || {};
        this.updateUserMsg({...data,...e.mp.detail.userInfo});
        this.count();
      } else {
        //用户按了拒绝授权按钮
         this.$router.go(-1);
      }
    }

  },

  created () {
    
  },
  mounted(){
    this.getSetting()
  },
  onShow(){
 
  }
}
</script>

<style lang="less" scoped>
.container{

}
.auth_btn{
  width: 200px;
  height: 50px;
  background-color: red;
}

.user_avatar_panel{
  height: 90px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .user_avatar{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #ebebeb;

  }
  .change_avatar_btn{
    position: absolute;
    font-size: 14px;
    color: #666;
    top:10px;
    right: 20px;
  }
}
.base_msg_panel{
  background-color: #fff;
  padding: 0 35px;
}
.btn_block{
  display: flex;
  justify-content: center;
  padding: 20px 0;
}



.form_list{
  background-color: #fff;
  .form_item{
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
    display: flex;
    border-bottom: 1px solid #ebedf0;
    line-height: 24px;
    .item_content{
      flex: 1;
      position: relative;
      input{
        width: 100%;
      }
      .devide_line{
        position: absolute;
        width: 1px;
        height: 26px;
        background-color: #ebedf0;
        top: 0px;
        right: 80px;
        
      }
      .tips_text1{
        position: absolute;
        width: 80px;
        height: 30px;
        top: -2px;
        right: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #1fb7b6;
        z-index: 9;
        padding: 0;
       
      }
      .tips_text2{
        position: absolute;
        width: 80px;
        height: 30px;
        top: -2px;
        right: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #999;
      }
    }
  }

}
  
</style>