<template>
  <div class="container" :class="{'m_bottom':isX}" v-if="expertData">
    <div class="experts_item">
      <div class="top_block">
        <img class="experts_avatar" :src="expertData.avatarUrl" v-if="expertData.avatarUrl" />
        <img class="experts_avatar" v-else src="../../../static/img/df_avatar.jpg" />
        <div class="top_block_right">
          <div class="experts_msg1">
            <div class="experts_name">
              {{expertData.nickName}}
              <button open-type="share" class="icon_btn btn_reset">
                <img src="../../../static/img/share_icon.png" />
              </button>
            </div>
          </div>

          <div class="experts_msg2">
            <span
              class="respond_time text_ellipsis"
            >{{expertData.companyPosition}}（{{expertData.companyName}}）</span>
          </div>

          <div class="experts_msg3">
            <div class="experts_location">
              <img src="../../../static/img/location_icon.png" />
              {{expertData.address}}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute_msg">
        <div class="query_fee">每次￥{{expertData.oneOfCost}}</div>
        <div class="work_status">
          <span class="status" v-if="expertData.workStatus == 1">{{i18n.Open}}</span>
          <span class="status grey" v-else>{{i18n.Closed}}</span>
        </div>
      </div>
    </div>

    <div class="other_msg">
      <span class="msg_item tl">{{responseTimeText}}</span>
      <span class="msg_item">{{expertData.answeringTime/60}}小时内作答</span>
      <span class="msg_item tr">已帮助{{expertData.consultedCount}}人</span>
    </div>

    <div class="custom_tabs2">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">{{i18n.About}}</div>
      <div
        class="tab_item"
        :class="{'active':currentTab == 1}"
        @click="changeTab(1)"
      >{{i18n.Shared_by_friends}}</div>
    </div>

    <div class="introduce_panel" v-show="currentTab == 0">
      <div class="panle_block nb">
        <div class="base_msg">
          <span class="msg_name">从业经验：</span>
          <span class="msg_content">{{expertData.majorYearsDesc}}</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">擅长行业：</span>
          <span class="msg_content">{{expertData.businessArea}}</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">业务科室：</span>
          <span class="msg_content">{{expertData.goodAtBusiness}}</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">工作介绍：</span>
          <span class="msg_content">{{expertData.lifeAndFeelDesc}}</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">政策解读：</span>
          <span class="msg_content">{{expertData.policyInterpretation}}</span>
        </div>

        <div class="base_msg">
          <span class="msg_name">文章链接：</span>
          <div class="msg_content link_name">
            <span
              v-for="(item,index) in expertData.outLink"
              :key="index"
              @click="copyText(item.link)"
            >{{index > 0 ?'、'+ item.name:item.name}}</span>
          </div>
        </div>

        <div class="base_msg">
          <span class="msg_name">相关照片：</span>
          <span class="msg_content img_list">
            <img
              class="intro_img"
              v-for="(item,index) in expertData.photosList"
              :src="item"
              :key="index"
              @click="showImgSwiper(index)"
            />
          </span>
        </div>
      </div>
    </div>

    <div class="comment_panel" v-show="currentTab == 1">
      <div class="friends_block" v-if="followUserList.length > 0">
        <div class="block_title nb">{{i18n.follower}}</div>
        <ul class="friends_list">
          <li class="friend_item" v-for="(item,index) in followUserList" :key="index">
            <img class="user_avatar" :src="item.userAvatarUrl" />
            <span>{{item.userNickName}}</span>
          </li>
        </ul>
      </div>

      <div class="friends_block" v-if="commentData.length > 0">
        <div class="block_title">{{i18n.review}}</div>
        <div class="comment_item" v-for="(item,index) in commentData" :key="index">
          <img class="user_avatar" :src="item.avatarUrl" />
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

      <div class="no_data_tips" v-if="commentData.length == 0 && followUserList.length == 0">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>{{i18n.No_relevant_data}}</span>
      </div>
    </div>

    <div class="bottom_fixed" :class="{'isX':isX}">
      <div class="follow_btn flex_btn">
        <img
          class="focus_icon"
          src="../../../static/img/collect_icon.png"
          v-if="!collected"
          @click="addUserFollow"
        />
        <img
          class="focus_icon"
          src="../../../static/img/collect_icon2.png"
          v-if="collected"
          @click="deleteUserFollow"
        />
        <span class="num_text">{{expertData.followCount}}{{i18n.followers}}</span>
      </div>
      <div class="chat_btn flex_btn" @click="toChatRoom">
        <img class="chat_icon" src="../../../static/img/chat_icon.png" />
        <div class="chat_text">{{i18n.chat}}</div>
      </div>
      <div class="query_btn flex_btn" :class="{'disabled': expertData.workStatus != 1}">
        <span @click="toContact" v-if="expertData.workStatus == 1">{{i18n.Ask}}</span>
        <span v-else>{{i18n.Closed}}</span>
      </div>
    </div>

    <van-action-sheet
      :show="actionSheetShow"
      :actions="actions"
      @close="onCloseActionSheet"
      @select="onSelectAction"
    />

    <swiper
      class="imgs_swiper"
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
          <image :src="item" mode="widthFix" class="slide-image" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { API, BASE_URL } from "../../http/api.js";
import util from "../../utils/index.js";
export default {
  data() {
    return {
      currentTab: 0,
      collected: false,
      actionSheetShow: false,
      actions: [
        {
          targetId: 1,
          name: "在线问答",
          subname: "￥40"
        },
        {
          targetId: 2,
          name: "电话约谈",
          subname: "￥40/15分钟"
        },
        {
          targetId: 3,
          name: "咨询疑问"
        }
      ],

      imgSwiperShow: false,
      swiperCurrent: 2,
      expertData: null,
      // expertData:{
      //   avatarUrl:'',
      //   nickName:'朱两边',
      //   workStatus:1,
      //   companyPosition:'工程师',
      //   companyName:'阿拉丁',
      //   address:'杭州',
      //   majorYearsDesc:'10-15年',
      //   followCount:'10',
      //   consultedCount:'20',
      //   businessArea:'国内挂科',

      //   goodAtBusiness:'内科',
      //   responseTime:'5',
      //   lifeAndFeelDesc:'三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是三顿饭看萨达科室萨达是',
      //   outLink:[{name:'作品1',link:'www.baidu.com'},{name:'作品2',link:'www.baidu.com'},{name:'作品333333',link:'www.baidu.com'},],
      //   photosList:['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg','https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3974834430,2578081919&fm=26&gp=0.jpg','https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3974834430,2578081919&fm=26&gp=0.jpg','https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3974834430,2578081919&fm=26&gp=0.jpg','https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3974834430,2578081919&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=320178652,790985626&fm=26&gp=0.jpg',],
      //   policyInterpretation:'萨达sad哈萨克的速度快和萨达萨达sad哈萨克的速度快和萨达萨达sad哈萨克的速度快和萨达萨达sad哈萨克的速度快和萨达萨达sad哈萨克的速度快和萨达萨达sad哈萨克的速度快和萨达',
      // },
      userId:"0",
      expertId: "",
      commentData: [],
      followUserList: []
    };
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX,
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    responseTimeText() {
      if (this.expertData && this.expertData.responseTime) {
        if (this.i18n.LANGTYPE == "en") {
          return "respond in " + this.expertData.responseTime + " min";
        } else {
          return this.expertData.responseTime + "分钟内回应";
        }
      }
      return "";
    }
  },
  onLoad(options) {
      this.expertId = options.id;
      this.currentTab = options.tab || 0;
      console.log(this.userData)
      if(this.userData==null)
      {this.userId="0"}
      else
      {this.userId=this.userData.userId}
      
      this.getInitData(options.id);
      this.CheckHasFollowed();
  },
  mounted() {},
  onShareAppMessage(obj) {
    return {
      title: "您的好友" + this.userData.nickName + "向你推荐一位咨询堂专家",
      path:
        "/pages/login/index?userId=" +
        this.userId +
        "&expertId=" +
        this.expertId +
        "&fromType=1"
      // imageUrl:'/static/img/share_test_img.png'
    };
  },
  methods: {
    ...mapActions("counter", ["increment", "decrement", "getProvince"]),
    linkTo(path) {
      this.$router.push(path);
    },
    changeTab(num) {
      if (this.currentTab == num) {
        return;
      }
      this.currentTab = num;
    },
    toContact() {
      // this.actionSheetShow = true;
      this.$router.push({
        path: "/pages/startConsult/index",
        query: { expertId: this.expertId }
      });
    },
    onCloseActionSheet() {
      this.actionSheetShow = false;
    },
    onSelectAction(data) {
      if (data.mp.detail.targetId == 1) {
      } else if (data.mp.detail.targetId == 2) {
      } else {
      }
      this.actionSheetShow = false;
    },
    toChatRoom() {
      this.$router.push({
        path: "/pages/chatRoom/index",
        query: {
          userId: this.userId,
          expertId: this.expertId,
          cost: this.expertData.oneOfCost
        }
      });
    },
    showImgSwiper(index) {
      this.swiperCurrent = index;
      this.imgSwiperShow = true;
    },
    getInitData(id) {
      let url = API["GetUserDetail"] + id;
      this.$http
        .request({
          url: url
        })
        .then(res => {
          let expertData = {};

          let result = res.data;
          expertData.avatarUrl = result.avatarUrl;
          expertData.followCount = result.followCount;
          expertData.consultedCount = result.consultedCount;
          expertData.orderCount = result.orderCount;

          expertData.nickName = result.nickName;
          if (result.address) {
            expertData.address =
              result.address.split("-")[1] ||
              result.address.split("市")[0] + "市";
          } else {
            expertData.address = "未知";
          }

          expertData.companyName = result.companyName;
          expertData.companyPosition = result.companyPosition;
          expertData.lifeAndFeelDesc = result.lifeAndFeelDesc;
          expertData.aboutUserDesc = result.aboutUserDesc;
          expertData.oneOfCost = result.oneOfCost;
          let photosList = [];
          result.userFiles.forEach(item => {
            photosList.push(item.fileUrl);
          });
          expertData.photosList = photosList;

          let outLink;
          if (result.outLink) {
            outLink = result.outLink.split("|zxt|");
          } else {
            outLink = [];
          }

          if (outLink.length > 0 && outLink[0].indexOf("{") != -1) {
            expertData.outLink = outLink.map(item => {
              return JSON.parse(item);
            });
          } else {
            expertData.outLink = [];
          }

          expertData.major = result.major;
          expertData.majorYearsDesc = result.majorYearsDesc;
          expertData.businessArea = result.businessArea;
          expertData.goodAtBusiness = result.goodAtBusiness;
          expertData.responseTime = result.responseTime;
          expertData.answeringTime = result.answeringTime;
          expertData.workStatus = result.workStatus;
          expertData.policyInterpretation = result.policyInterpretation;
          this.expertData = expertData;
          if (result.comments && result.comments.length) {
            result.comments.forEach(item => {
              item.creationTime = util.formatTime(new Date(item.creationTime));
            });
          }
          this.followUserList = result.followUserList || [];
          this.commentData = result.comments || [];
        });
    },
    CheckHasFollowed() {
      this.$http
        .request({
          url: "CheckHasFollowed",
          data: {
            userId: this.userId,
            expertId: this.expertId * 1
          },
          config: {
            hideMsg: true // 是否隐藏res.code不为1时的错误提示
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.collected = true;
          } else {
            this.collected = false;
          }
        });
    },
    addUserFollow() {
      this.$http
        .request({
          url: "AddUserFollow",
          data: {
            userId: this.userId,
            expertId: this.expertId * 1
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: "关注成功",
              icon: "none",
              duration: 1000
            });
            this.expertData.followCount++;
            this.collected = true;
          }
        });
    },
    deleteUserFollow() {
      this.$http
        .request({
          url: "DeleteUserFollow",
          data: {
            userId: this.userId,
            expertId: this.expertId * 1
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: "已取消关注",
              icon: "none",
              duration: 1000
            });
            this.expertData.followCount--;
            this.collected = false;
          }
        });
    },
    copyText(text) {
      wx.setClipboardData({
        data: text,
        success(res) {
          wx.showToast({
            title: "已复制相关链接",
            icon: "none",
            duration: 1500
          });
        }
      });
    }
  },

  onShow() {
    // this.currentTab = 0;
  }
};
</script>

<style lang="less">
.container {
  padding-bottom: 50px;
  &.m_bottom {
    padding-bottom: 82px;
  }
}
.experts_item {
  margin-bottom: 0;
  position: relative;
  .absolute_msg {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .query_fee {
      font-size: 16px;
      color: #1fb7b6;
    }
    .work_status {
      margin-top: 5px;
      .status {
        font-size: 12px;
        color: #1fb7b6;
        padding: 1px 3px;
        border: 1px solid #1fb7b6;
        border-radius: 3px;
        white-space: nowrap;
        &.gery {
          color: #999;
          border-color: #999;
        }
      }
    }
  }
}

.other_msg {
  display: flex;
  height: 32px;
  align-items: center;
  background-color: #f3fbfb;
  padding: 0 15px;
  .msg_item {
    width: 33%;
    text-align: center;
    font-size: 13px;
    color: #1fb7b6;
    &.tl {
      text-align: left;
    }
    &.tr {
      text-align: right;
    }
  }
}
.introduce_panel {
  padding: 0 15px;
  padding-bottom: 20px;
  background-color: #fff;
  font-size: 14px;
  .panle_block {
    padding: 20px 5px;
    border-top: 1px solid #e6e8eb;
  }
  .panle_block.nb {
    border-top: 0;
  }
  .block_title {
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-bottom: 17px;
  }
  .base_msg {
    font-size: 13px;
    min-height: 20px;
    color: #333;
    display: flex;
    & + .base_msg {
      margin-top: 8px;
    }
    .msg_name {
      position: relative;
      width: 72px;
    }
    .msg_content {
      flex: 1;
      white-space: wrap;
      margin-left: 5px;
      color: #333;
      line-height: 1.5;
      &.link_name {
        color: #1fb7b6;
      }
      &.img_list {
        display: flex;
        flex-wrap: wrap;
        .intro_img {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          margin-top: 5px;
        }
      }
    }
  }
}

.comment_panel {
  background-color: #fff;
  .friends_block {
    .block_title {
      border-top: 1px solid #f3f5f7;
      padding: 15px 15px;
      padding-bottom: 0;
      font-size: 14px;
      line-height: 1.5;
      color: #666;
      font-weight: bold;
      &.nb {
        border-top: none;
      }
    }
  }
  .friends_list {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    padding-bottom: 8px;
    .friend_item {
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 7px;
      .user_avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid #e6e8eb;
        margin-bottom: 5px;
      }
      span {
        text-align: center;
        font-size: 12px;
        color: #666;
      }
    }
  }

  .comment_item {
    padding: 15px;
    display: flex;
    // margin-bottom: 5px;
    position: relative;
    border-bottom: 1px solid #f3f5f7;
    .user_avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid #e6e8eb;
      margin-right: 15px;
    }
    .comment_tag {
      position: absolute;
      top: 50px;
      left: 39px;
      height: 20px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: #1fb7b6;
      background-color: #f3fbfb;
      border-radius: 10px;
      font-size: 12px;
      transform: translateX(-50%);
    }
    .comment_content {
      font-size: 13px;
      flex: 1;
      .content_top {
        display: flex;
        justify-content: space-between;
        .user_name {
          font-size: 14px;
          color: #333;
        }
        .comment_time {
          font-size: 13px;
          color: #999;
        }
      }
      .comment_text {
        margin-top: 10px;
        font-size: 13px;
        line-height: 1.5;
        color: #666;
      }
      .comment_tags {
        display: flex;
        margin-top: 10px;
        .tag_item {
          margin-right: 10px;
          font-size: 14px;
          height: 20px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          color: #1fb7b6;
          background-color: #f3fbfb;
          // border:1px solid #aaa;
          border-radius: 10px;
        }
      }
    }
  }
}

.bottom_fixed {
  justify-content: space-between;
  .flex_btn {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .follow_btn {
    width: 30%;
    border-right: 1px solid #e6e8eb;
    .focus_icon {
      width: 24px;
      height: 24px;
    }
    .num_text {
      font-size: 12px;
      margin-left: 5px;
      color: #666;
    }
  }
  .chat_btn {
    width: 30%;
    .chat_icon {
      width: 24px;
      height: 24px;
    }
    .chat_text {
      font-size: 12px;
      margin-left: 5px;
      color: #666;
    }
  }
  .query_btn {
    width: 40%;
    background-color: #1fb7b6;
    color: #fff;
    font-size: 14px;
    span {
      padding: 15px;
    }
    .disabled {
      background-color: #cccccc;
    }
  }
}

// 专家列表
.experts_name {
  font-size: 16px;
  color: #333;
  line-height: 24px;
  .icon_btn {
    margin-left: 5px;
    line-height: 1;
    img {
      width: 24px;
      height: 24px;
    }
  }
}

.experts_msg2 {
  .respond_time {
    font-size: 13px;
    color: #444;
    width: 200px;

    span {
      font-weight: bold;
    }
  }
}

.custom_tabs2 {
  display: flex;
  padding: 0 15px;
  padding-top: 5px;
  border-bottom: 1px solid #1fb7b6;
  background-color: #fff;
  .tab_item {
    font-size: 14px;
    line-height: 20px;
    padding: 8px 16px;
    background-color: #fff;
    position: relative;
    bottom: -1px;
    border-bottom: 1px solid #1fb7b6;
    border-radius: 4px 4px 0 0;
    color: #999;
    &.active {
      border: 1px solid #1fb7b6;
      border-bottom: none;
      color: #1fb7b6;
    }
  }
}
</style>
