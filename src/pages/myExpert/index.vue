<template>
  <div class="container">
    <div class="tab_fix_wrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
        <van-tab :title="i18n.used"></van-tab>
        <van-tab :title="i18n.followed"></van-tab>
        <!-- <van-tab title="问候过的"></van-tab> -->
      </van-tabs>
    </div>
    <div style="height:32px;"></div>
    <div
      class="no_data_tips"
      v-show="(currentTab == 0 && list1.length == 0) || (currentTab == 1 && list2.length == 0) || (currentTab == 2 && list3.length == 0)"
    >
      <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
      <span>{{i18n.No_relevant_data}}</span>
    </div>

    <div class="experts_list type2_list" v-show="currentTab == 0">
      <div
        class="experts_item"
        v-for="(item,index) in list1"
        :key="index"
        @click="toExpertDetail(item)"
      >
        <div class="top_block">
          <img class="experts_avatar" :src="item.avatarUrl" />
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">{{item.nickName}}</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">{{item.companyPosition}}</span>
            </div>
          </div>
          <div class="action_btns">
            <img
              src="../../../static/img/list_icon4.png"
              @click.stop="GetExpertOfMyFriendListToDisplay(item.expertId)"
            />

            <!-- <img src="../../../static/img/list_icon4.png"  @click.stop="addViewPanelShow = true"> -->
            <!-- <img src="../../../static/img/list_icon4_active.png" alt=""> -->
          </div>
        </div>
      </div>
    </div>

    <div class="experts_list type2_list" v-show="currentTab == 1">
      <div
        class="experts_item"
        v-for="(item,index) in list2"
        :key="index"
        @click="toExpertDetail(item)"
      >
        <div class="top_block">
          <img class="experts_avatar" :src="item.avatarUrl" />
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">{{item.nickName}}</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">{{item.companyPosition}}</span>
            </div>
          </div>
          <div class="action_btns">
            <img src="../../../static/img/list_icon4.png" @click.stop="addViewPanelShow = true" />
            <!-- <img src="../../../static/img/list_icon3_active.png" alt=""> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 设置专家对好友的可见性 -->
    <div class="add_view_panel" @touchmove.stop="touchmoveStop" :class="{'show':addViewPanelShow}">
      <div class="panel_top">
        <span class="cancel_btn" @click="addViewPanelShow = false">{{i18n.cancel}}</span>
        <span class="title">{{i18n.Who_can_see}}</span>
        <span class="submit_btn" @click="addShareDisplay">{{i18n.done}}</span>
      </div>
      <!-- <scroll-view scroll-y :scroll-top="sTop" class="select_list" v-show="!showSelectedPanel">
        <div class="friend_avatar_list"  id='chat-ref'>
          <img class="friend_avatar" src="../../../static/img/avatar.jpeg"  v-for="(item,index) in friendsList" :key="index" v-if="item.selected">
        </div>
      </scroll-view>
      <scroll-view scroll-y class="friend_list_wrap" :class="{'less_top':showSelectedPanel}">-->

      <scroll-view scroll-y class="friend_list_wrap" style="top:48px;">
        <ul class="friend_list">
          <li
            class="friend_item"
            v-for="(item,index) in friendsList"
            :key="index"
            @click="selectFriend(index)"
          >
            <div class="select_icon">
              <span class="selcet_fill" v-show="item.selected"></span>
            </div>
            <img class="friend_avatar" :src="item.avatarUrl" />
            <div class="friend_name">{{item.nickName}}</div>
          </li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { API, BASE_URL } from "../../http/api.js";
export default {
  data() {
    return {
      currentTab: 0,
      friendsList: [],
      sTop: 0,
      addViewPanelShow: false,
      list1: [],
      list2: [],
      list3: [],
      shareDisplayList: [],
      expertid: 0
    };
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX,
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    showSelectedPanel() {
      return this.friendsList.every(item => {
        return item.selected == false;
      });
    }
  },

  components: {},
  onShow() {
    this.addViewPanelShow = false;
    this.getConsultedExpertList();
    this.getFollowedExpertList();
    // this.getInquiredExpertList();
  },
  methods: {
    onTabChange(event) {
      this.currentTab = event.target.index;
    },
    touchmoveStop(e) {
      e.stopPropagation();
    },

    selectFriend(index) {
      this.friendsList[index].selected = !this.friendsList[index].selected;
      if (this.friendsList[index].selected) {
        let itemList = {
          userId: this.friendsList[index].userId,
          expertId: parseInt(this.expertid),
          createUserId: this.userData.userId
        };
        this.shareDisplayList.push(itemList);
        console.log(this.unique(this.shareDisplayList));
      }else{
        this.del(this.friendsList[index].userId);
         console.log(this.unique(this.shareDisplayList));
      }
      this.selectFriendsPanelScrollBottom();
    },
    selectFriendsPanelScrollBottom() {
      let that = this;
      wx
        .createSelectorQuery()
        .select("#chat-ref")
        .boundingClientRect(function(rect) {
          that.sTop = rect ? parseInt(rect.height) : 0;
        })
        .exec();
    },

    addShareDisplay() {
      let that = this;

      if (that.shareDisplayList.length > 0) {
        that.$http
          .request({
            url: "AddShareDisplay",
            data:this.unique(that.shareDisplayList),
            flyConfig: {
              method: "post"
            }
          })
          .then(res => {
            if (res.code == 1) {
              that.addViewPanelShow = false;
            }
          });
      } else {
        this.showToast("请选择后再提交");
      }
    },
    getConsultedExpertList() {
      let url = API["GetConsultedExpertList"] + this.userData.userId;
      this.$http
        .request({
          url: url
        })
        .then(res => {
          let result = res.data;
          this.list1 = result;
        });
    },

    getFollowedExpertList() {
      let url = API["GetFollowedExpertList"] + this.userData.userId;
      this.$http
        .request({
          url: url
        })
        .then(res => {
          let result = res.data;
          this.list2 = result;
        });
    },

    getInquiredExpertList() {
      let url = API["GetInquiredExpertList"] + this.userData.userId;
      this.$http
        .request({
          url: url
        })
        .then(res => {
          let result = res.data;
          this.list3 = result;
        });
    },
    GetExpertOfMyFriendListToDisplay(expertid) {
      this.expertid = expertid;
      this.$http
        .request({
          url: "GetExpertOfMyFriendListToDisplay",
          data: {
            userId: this.userData.userId,
            expertId: expertid
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.addViewPanelShow = true;
            this.friendsList = res.data;
          }
        });
    },

    toExpertDetail(item) {
      this.$router.push({
        path: "/pages/expertDetail/index",
        query: { id: item.expertId }
      });
    },
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.userId) && res.set(arr.userId, 1));
    },
    del(userId) {
      var index = this.shareDisplayList.findIndex(item => {
        if (item.userId == userId) {
          return true;
        }
      });
      this.shareDisplayList.splice(index, 1);
    }
  },
  created() {},
  onPullDownRefresh() {
    //to do
    wx.stopPullDownRefresh();
  }
};
</script>

<style lang="less" scoped>
.container.hpb {
  padding-bottom: 50px;
}
.container.hpb.isX {
  padding-bottom: 82px;
}
.tab_fix_wrap {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.experts_item {
  padding: 14px 15px;
  font-size: 14px;
  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
  .top_block {
    height: auto;
    display: flex;
    align-items: center;
    padding: 0;
    .experts_avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid #e6e8eb;
      margin-right: 10px;
    }
    .top_block_right {
      flex: 1;
      .experts_msg1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .experts_name {
          font-size: 16px;
          color: #333;
        }
      }
      .experts_msg2 {
        margin-top: 10px;
        font-size: 14px;
        color: #333;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .action_btn {
    position: absolute;
    top: 27px;
    right: 15px;
    height: 24px;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: #1fb7b6;
    border-radius: 12px;
    padding: 0 10px;
    font-size: 12px;
  }
  .action_btns {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    height: 28px;
    display: flex;
    align-items: center;
    color: #fff;
    img {
      width: 26px;
      height: 26px;
      margin-left: 8px;
    }
  }
}
.experts_list {
}
</style>