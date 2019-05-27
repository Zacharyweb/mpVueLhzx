<template>
  <div class="container">
    <div class="user_avatar_panel">
        <!-- <img class="user_avatar" src="../../../static/img/avatar.jpeg"> -->
        <img class="user_avatar" v-if="userData" :src="userData.avatarUrl">
        <img class="user_avatar" v-else src="../../../static/img/df_avatar.jpg">
        <span class="change_avatar_btn" @click="toUseNotice">使用说明</span>
    </div>
    <div class="base_msg_panel">

      <ul class="form_list">
        <li class="form_item">
          <div class="item_content">
            <input type="number" maxlength='11' v-model="mobile" style="width:190px;" placeholder="请输入手机号">
            <span class="devide_line"></span>
            <!-- <span class="tips_text1" @click="sendVcode" v-if="status == 1">发送验证码</span> -->
            <button class="tips_text1" v-if="status == 1" @getuserinfo="onGotUserInfo" open-type="getUserInfo">发送验证码</button>
            <span class="tips_text2" v-if="status == 2">已发送{{timeText}}s</span>
          </div>
        </li>
        <li class="form_item">
          <div class="item_content">
            <input type="number" maxlength='6' v-model="vcode" placeholder="请输入验证码">
          </div>
        </li>
       
      </ul>
  
      <div class="btn_block">
        <div class="btn large green" @click="toLogin">登录</div>
        <!-- <button class="btn large green" @getuserinfo="onGotUserInfo" open-type="getUserInfo">登录</button> -->
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
      status:1,

      mobile:'',
      userId:'',
      vcode:'',

      originalData:{}

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
    // 获取微信用户授权
    onGotUserInfo(e){
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        let data = this.userData || {};
        this.updateUserMsg({...data,...e.mp.detail.userInfo});
        if(!this.mobile){
          wx.showToast({
            title: '请先输入手机号',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        let reg = /^(1[345789]\d{9})$/;
        if(reg.test(this.mobile)){
          this.toLoginByWX();
          return;
        }
    
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none',
          duration: 2000
        })
    
      } else {
        //用户按了拒绝授权按钮
         this.$router.go(-1);
      }
    },

    // 用户微信登录
    toLoginByWX(){
      let that = this;
       wx.login({
        success(res) {
          if (res.code) {
            that.$http.request({
              url:'AuthorizedLoginByWx',
              data: {
                Code: res.code,
                NickName: that.userData.nickName,
                AvatarUrl:that.userData.avatarUrl
              },
              flyConfig:{
                headers:{
                  'content-type': 'application/x-www-form-urlencoded',
                },
                method: 'post'
              }
            }).then(res => {
              console.log(res.data);
              that.originalData = res.data;
              that.sendVcode(res.data);
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    
    // 发送验证码
    sendVcode(data){
 
      let that = this;
      that.$http.request({
        url:'SendCode',
        data: {
          phoneNumber:that.mobile,
          userId:data.userId,
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        that.count();
        console.log(res);
      })
    },
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

    // 提交验证码绑定手机登录
    toLogin(){
      if(!this.vcode){
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000
        })
        return;
      };
      let that = this;
      that.$http.request({
        url:'CheckCode',
        data: {
          phoneNumber: that.mobile,
          userid: that.userData.userId,
          code:that.vcode
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        let data = that.userData || {};
        that.originalData.isExpert = 1;
        that.updateUserMsg({...data,...that.originalData});
        let userDataStr = JSON.stringify({...data,...that.originalData});
        wx.setStorageSync('userData', userDataStr);
        that.$router.go(-1);
      })
    },


    toUseNotice(){
      this.$router.push('/pages/useNotice/index')
    }

  },

  created () {
    
  },
  mounted(){
   
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