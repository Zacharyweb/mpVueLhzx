<template>
  <div>
    <ul class="router_list">
      <li
        class="router_item"
        v-if="userData && userData.isExpert == 1"
        @click="actionSheet3Show = true"
      >
        <div class="router_top">
          <div class="item_left">模式</div>
          <div class="item_right">
            <span class="status_text" v-if="userData && userData.workMode == 1">定时</span>
            <span class="status_text" v-else-if="userData && userData.workMode == 2">自由</span>
            <span class="status_text" v-else>{{i18n.Loaidng}}</span>
            <img src="../../../static/img/arrow_right.png" />
          </div>
        </div>

        <div class="router_bottom" v-if="userData && userData.workMode == 1">每天早上8:00-晚上8:00默认为营业状态</div>
        <div class="router_bottom" v-else-if="userData && userData.workMode == 2">打开后自主切换营业和休息状态</div>
      </li>

      <li
        class="router_item"
        v-if="userData && userData.isExpert == 1"
        @click="actionSheetShow = true"
      >
        <div class="router_top">
          <div class="item_left">状态</div>
          <div class="item_right">
            <span class="status_text" v-if="userData && userData.workStatus == 1">{{i18n.Open}}</span>
            <span
              class="status_text"
              v-else-if="userData && userData.workStatus == 2"
            >{{i18n.Closed}}</span>
            <span
              class="status_text"
              v-else-if="userData && userData.workStatus == 3"
            >{{i18n.Rest_until_tomorrow}}</span>
            <span class="status_text" v-else>{{i18n.Loaidng}}</span>
            <img src="../../../static/img/arrow_right.png" />
          </div>
        </div>
        <div
          class="router_bottom"
          v-if="userData && userData.workStatus == 1"
        >{{this.i18n.Rest_until_tomorrow}}</div>
        <div
          class="router_bottom"
          v-else-if="userData && userData.workStatus == 2"
        >{{this.i18n.Rest_until_tomorrow}}</div>
      </li>

      <li
        class="router_item"
        v-if="userData && userData.isExpert == 1"
        @click="actionSheet4Show = true"
      >
        <div class="router_top">
          <div class="item_left">问候</div>
          <div class="item_right">
            <span class="status_text" v-if="userData && userData.chatMode == 1">即时回应</span>
            <span class="status_text" v-else-if="userData && userData.chatMode == 2">不即时回应</span>
            <span class="status_text" v-else>{{i18n.Loaidng}}</span>
            <img src="../../../static/img/arrow_right.png" />
          </div>
        </div>
        <div class="router_bottom" v-if="userData && userData.chatMode == 1">用户期待你能尽快进入聊天室</div>
        <div class="router_bottom" v-else-if="userData && userData.chatMode == 2">用户将在聊天室给你留言</div>
      </li>

      <!-- <li class="router_item">
        <div class="item_left">{{i18n.languageName}}</div>
        <div class="item_right" @click="actionSheet2Show = true">
          <span class="status_text" v-if="i18n.LANGTYPE == 'cn_j'">简体中文</span>
          <span class="status_text" v-else-if="i18n.LANGTYPE == 'cn_f'">繁體中文</span>
          <span class="status_text" v-else-if="i18n.LANGTYPE == 'en'">English</span>
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>-->
    </ul>

    <van-dialog id="van-dialog" />
    <van-action-sheet
      :show="actionSheetShow"
      :actions="actions"
      @close="onCloseActionSheet"
      @select="onSelectAction"
    />

    <van-action-sheet
      :show="actionSheet2Show"
      :actions="actions2"
      @close="onCloseAction2Sheet"
      @select="onSelectAction2"
    />

    <van-action-sheet
      :show="actionSheet3Show"
      :actions="actions3"
      @close="onCloseAction3Sheet"
      @select="onSelectAction3"
    />

    <van-action-sheet
      :show="actionSheet4Show"
      :actions="actions4"
      @close="onCloseAction4Sheet"
      @select="onSelectAction4"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { API, BASE_URL } from "../../http/api.js";
import Dialog from "../../../static/vant/dialog/dialog";
export default {
  data() {
    return {
      actionSheetShow: false,
      actionSheet2Show: false,
      actions2: [
        {
          targetId: "cn_j",
          name: "简体中文"
        },
        {
          targetId: "en",
          name: "English"
        }
      ],

      actionSheet3Show: false,
      actions3: [
        {
          targetId: 1,
          name: "定时",
          subname: "每天早上8:00-晚上8:00默认为营业状态"
        },
        {
          targetId: 2,
          name: "自由",
          subname: "打开后自主切换营业和休息状态"
        }
      ],

      actionSheet4Show: false,
      actions4: [
        {
          targetId: 1,
          name: "即时回应",
          subname: "用户期待你能尽快进入聊天室"
        },
        {
          targetId: 2,
          name: "不即时回应",
          subname: "用户将在聊天室给你留言"
        }
      ],
      userId: "0"
    };
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    actions: function() {
      if (this.userData && this.userData.workStatus == 2) {
        return [
          {
            targetId: 1,
            name: this.i18n.Open
          },
          {
            targetId: 2,
            name: this.i18n.Closed
          }
        ];
      } else {
        return [
          {
            targetId: 1,
            name: this.i18n.Open
          },
          {
            targetId: 2,
            name: this.i18n.Closed,
            subname: this.i18n.Rest_until_next_login
          },
          {
            targetId: 3,
            name: this.i18n.Closed,
            subname: this.i18n.Rest_until_tomorrow
          }
        ];
      }
    }
  },
  mounted() {
    if (this.userData == null) {
      this.userId = "0";
    } else {
      this.userId = this.userData.userId;
    }
    this.getInitData(this.userId);
  },
  onShow() {
    if (!this.userData) {
      wx.removeStorageSync("userData");
      this.$router.push("/pages/login/index");
    }
  },
  onLoad(options) {
    console.log(this.userData);
  },
  methods: {
    ...mapActions("counter", ["updateUserMsg", "updateLanguage"]),
    onCloseActionSheet() {
      this.actionSheetShow = false;
    },
    onCloseAction2Sheet() {
      this.actionSheet2Show = false;
    },
    onCloseAction3Sheet() {
      this.actionSheet3Show = false;
    },
    onCloseAction4Sheet() {
      this.actionSheet4Show = false;
    },
    onSelectAction(data) {
      let workStatus;
      if (data.mp.detail.targetId == 2) {
        workStatus = 2;
      } else if (data.mp.detail.targetId == 3) {
        workStatus = 3;
      } else {
        workStatus = 1;
      }
      this.setWorkStatus(workStatus);
      this.actionSheetShow = false;
    },

    onSelectAction2(data) {
      let lang = data.mp.detail.targetId;
      wx.setStorage({ key: "langFlag", data: lang });
      this.$t.setLocale(lang || "cn_j");
      let langData = this.$t.getLanguage();
      this.updateLanguage(langData);
      this.actionSheet2Show = false;
    },

    onSelectAction3(data) {
      let setWorkMode;
      if (data.mp.detail.targetId == 1) {
        setWorkMode = 1;
      } else if (data.mp.detail.targetId == 2) {
        setWorkMode = 2;
      }
      this.setWorkMode(setWorkMode);
      this.actionSheet3Show = false;
    },

    onSelectAction4(data) {
      let setChatMode;
      if (data.mp.detail.targetId == 1) {
        setChatMode = 1;
      } else if (data.mp.detail.targetId == 2) {
        setChatMode = 2;
      }
      this.setChatMode(setChatMode);
      this.actionSheet4Show = false;
    },

    setWorkStatus(workStatus) {
      if (this.userData.workStatus == workStatus) {
        return;
      }
      this.$http
        .request({
          url: "SetWorkStatus",
          data: {
            id: this.userData.userId,
            workStatus: workStatus
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            let data = this.userData || {};
            this.updateUserMsg({ ...data, workStatus: workStatus });
            wx.showToast({
              title: "服务状态切换成功",
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    setWorkMode(setWorkMode) {
      if (this.userData.workMode == setWorkMode) {
        return;
      }
      this.$http
        .request({
          url: "SetWorkMode",
          data: {
            id: this.userData.userId,
            workMode: setWorkMode
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            let data = this.userData || {};
            this.updateUserMsg({ ...data, workMode: setWorkMode });
            wx.showToast({
              title: "工作状态切换成功",
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    setChatMode(setChatMode) {
      if (this.userData.chatMode == setChatMode) {
        return;
      }
      this.$http
        .request({
          url: "SetChatMode",
          data: {
            id: this.userData.userId,
            chatMode: setChatMode
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            let data = this.userData || {};
            this.updateUserMsg({ ...data, chatMode: setChatMode });
            wx.showToast({
              title: "聊天状态切换成功",
              icon: "none",
              duration: 1500
            });
          }
        });
    },
    getInitData(id) {
      let data = this.userData || {};
      let url = API["GetUserDetail"] + id;
      this.$http.request({ url: url }).then(res => {
        let result = res.data;

        this.updateUserMsg({
          ...data,
          workStatus: result.workStatus,
          workMode: result.workMode,
          chatMode: result.setChatMode
        });
      });
    }
  },
  onPullDownRefresh() {
    //to do
    this.getInitData(this.userId);
    console.log(this.userData);
    wx.stopPullDownRefresh();
  }
};
</script>

<style lang="less">
.router_list {
  background-color: #fff;
  padding: 0 15px;
  margin-top: 10px;
  .router_item + .router_item {
    border-top: 1px solid #e3e5e7;
  }
  .router_item {
    padding: 8px 0;
    min-height: 30px;
    .router_top {
      padding: 0 5px;
      font-size: 14px;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_left {
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }
      .item_right {
        display: flex;
        align-items: center;
        .status_text {
          font-size: 14px;
          color: #333;
          margin-right: 10px;
        }
        img {
          width: 9px;
          height: 12px;
        }
      }
    }
    .router_bottom {
      margin-top: 5px;
      padding: 0 5px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
