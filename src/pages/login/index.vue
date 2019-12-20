<template>
  <div class="container">
    <div class="user_avatar_panel">
      <open-data class="user_avatar" type="userAvatarUrl"></open-data>
      <span class="change_avatar_btn" @click="toUseNotice">使用说明</span>
    </div>
    <div class="base_msg_panel"><open-data type="userNickName"></open-data></div>
    <div class="base_msg_panel" v-if="userData && userData.phoneNumber">{{userData.phoneNumber}}</div>
    <div class="base_msg_panel">
      <div class="btn_block">
        <button
          v-if="encryptedData==null"
          class="btn large green"
          open-type="getPhoneNumber"
          @getphonenumber="GetPhoneNumber"
        >获取授权</button>

        <button
          class="btn large green"
          v-if="encryptedData!=null && userData==null"
          open-type="getUserInfo"
          @getuserinfo="GetUserInfo"
        >登录</button>
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
      originalData: {},
      fromType: 0, // 1:来自专家详情 2：来自评价选择好友 3：来自添加关系户
      fromUserId: 0,
      shareExpertId: 0,
      code: "",
      encryptedData: null,
      iv: null
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
        console.log(self.userData);
        if (res.code) {
          self.code = res.code;
        }
      }
    });
  },
  methods: {
    ...mapActions("counter", ["updateUserMsg"]),
    toUseNotice() {
      this.$router.push("/pages/useNotice/index");
    },

    GetPhoneNumber(e) {
      if (e.mp.detail.errMsg == "getPhoneNumber:ok") {
        this.encryptedData = e.mp.detail.encryptedData;
        this.iv = e.mp.detail.iv;
      }
    },

    GetUserInfo(e) {
      console.log("回调事件后触发");
      const self = this;
      if (e.mp.detail.userInfo) {
        console.log("用户按了允许授权按钮");
        let data = self.userData || {};
        self.originalData = { ...data, ...e.mp.detail.userInfo };
        self.$http
          .request({
            url: "AuthorizedLoginByWx",
            data: {
              Code: self.code,
              NickName: self.originalData.nickName,
              AvatarUrl: self.originalData.avatarUrl,
              EncryptedData: self.encryptedData,
              IV: self.iv
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
            self.updateUserMsg({ ...data, ...self.originalData });
            let userDataStr = JSON.stringify({ ...data, ...self.originalData });
            wx.setStorageSync("userData", userDataStr);

            if (self.fromType == 1) {
              self.shareExpert();
            } else if (self.fromType == 2) {
              self.addUserFriend();
            } else if (self.fromType == 3) {
              self.addUserFriend();
            } else {
              wx.switchTab({
                url: "/pages/mine/index"
              });
            }
          });
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    addUserFriend() {
      this.$http
        .request({
          url: "AddUserFriend",
          data: {
            userId: this.fromUserId,
            friendId: this.userData.userId,
            remark: ""
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          wx.redirectTo({
            url: "/pages/myRelation/index?tab=1"
          });
        });
    },
    shareExpert() {
      this.$http
        .request({
          url: "ShareExpert",
          data: {
            userId: this.fromUserId,
            shareUserId: this.userData.userId,
            expertId: this.shareExpertId
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          wx.redirectTo({
            url: "/pages/expertDetail/index?id=" + this.shareExpertId
          });
        });
    },
    checkIfLogin() {
      if (this.userData && this.userData.accessToken) {
        if (this.fromType == 1) {
          this.shareExpert();
        } else if (this.fromType == 2) {
          this.addUserFriend();
        } else if (this.fromType == 3) {
          this.addUserFriend();
        } else {
          wx.switchTab({
            url: "/pages/index/index"
          });
        }
      } else {
        this.showLoginPage = true;
      }
    }
  },

  onLoad(options) {
    console.log(this.encryptedData);
    console.log(this.userData);
    this.fromType = options.fromType || 0;
    this.fromUserId = options.userId || 0;
    this.shareExpertId = options.expertId || 0;
    this.checkIfLogin();
  },
  onShow() {this.encryptedData=null;},
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