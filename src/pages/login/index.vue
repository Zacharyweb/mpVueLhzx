<template>
  <div class="container">
    <div class="user_avatar_panel">
      <img class="user_avatar" :src="originalData.avatarUrl" />
      <span class="change_avatar_btn" @click="toUseNotice">使用说明</span>
    </div>
    <div class="base_msg_panel">{{originalData.nickName}}</div>
    <div class="base_msg_panel">
      <div class="btn_block">
        <button class="btn large green" v-if="buttonVisible" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">获取权限</button>
        <button class="btn large green" v-if="!buttonVisible" @click="Login">授权登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userInfo: {},
      buttonVisible:false,
      originalData: {},
      userData:{}
    };
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },
  components: {},
  mounted() {
    const self = this;
    wx.login({
      success(res) {
        if (res.code) {
          self.code = res.code;
          self.wxGetUserInfo(res.code);
        }
      }
    });
  },
  methods: {
    ...mapActions("counter", ["updateUserMsg"]),
    toUseNotice() {
      this.$router.push("/pages/useNotice/index");
    },
    Login(){
      console.log("登录");
    },
    wxGetUserInfo(code) {
      const self = this;
      wx.getUserInfo({
        withCredentials: true,
        success(res) {
          let { encryptedData, userInfo, iv } = res;
          let data = self.userData || {};
          self.originalData = { ...data, ...res.userInfo };
          self.$http
                .request({
                  url: "AuthorizedLoginByWx",
                  data: {
                    Code: code,
                    NickName: self.originalData.nickName,
                    AvatarUrl: self.originalData.avatarUrl,
                    EncryptedData:encryptedData,
                    IV:iv
                  },
                  flyConfig: {
                    headers: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "post"
                  }
                })
                .then(res => {
                  self.originalData = { ...self.originalData, ...res.data };
                  console.log(self.originalData);
                });

            
        },
        fail(err) {
          console.log("自动wx.getUserInfo失败:", err);
          // 显示主动授权的button
          self.buttonVisible = true;
        }
      });
    },
    bindGetUserInfo(e) {
      // console.log('回调事件后触发')
      const self = this;
      if (e.mp.detail.userInfo) {
        console.log("用户按了允许授权按钮");
        let { encryptedData, userInfo, iv } = e.mp.detail;
        let data = self.userData || {};
        self.originalData = { ...data, ...e.mp.detail.userInfo };
        self.$http
              .request({
                url: "AuthorizedLoginByWx",
                data: {
                    Code: code,
                    NickName: self.originalData.nickName,
                    AvatarUrl: self.originalData.avatarUrl,
                    EncryptedData:encryptedData,
                    IV:iv
                },
                flyConfig: {
                  headers: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  method: "post"
                }
              })
              .then(res => {
                self.originalData = { ...self.originalData, ...res.data };
                console.log(self.originalData);
              });

      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    }
  },

  onLoad(options) {},
  onShow() {},
  onHide() {}
};
</script>

<style lang="less" scoped>
.auth_btn {
  width: 200px;
  height: 50px;
  background-color: red;
}

.user_avatar_panel {
  height: 90px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .user_avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #ebebeb;
  }
  .change_avatar_btn {
    position: absolute;
    font-size: 14px;
    color: #666;
    top: 10px;
    right: 20px;
  }
}
.base_msg_panel {
  background-color: #fff;
  padding: 0 35px;
  text-align: center;
}
.btn_block {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>