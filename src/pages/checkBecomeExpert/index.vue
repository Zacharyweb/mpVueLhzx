<template>
  <div class="container">
    <div class="experts_list type1_list">
      <div class="experts_item" v-for="(item,index) in CheckList" :key="index">
        <div class="top_block">
          <img class="experts_avatar" :src="item.avatarUrl" />
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">{{item.nickName}}</span>
            </div>
            <div class="experts_msg2">
              <span class="customer_info">身份证：{{item.certNum}}</span>
            </div>
            <div class="experts_msg2">
              <span class="customer_info">手机号：{{item.phoneNumber}}</span>
            </div>
          </div>
          <van-button
            v-if="item.isExpert == 0"
            @click="BecomeExpertPass(item.id)"
            class="checkBtn"
          >审核</van-button>
          <img class="pass" v-if="item.isExpert == 1" src="../../../static/img/pass.png" />
        </div>
      </div>

      <div class="no_data_tips" v-if="CheckList.length == 0">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>{{i18n.No_relevant_data}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { API, BASE_URL } from "../../http/api.js";
import util from "../../utils/index.js";
export default {
  data() {
    return {
      CheckList: [],
      userId:0
    };
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX,
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },

  components: {},

  methods: {
    GetBecomeExpertList() {
    // 获取专家列表
      let that = this;
      that.$http.request({
        url:'GetBecomeExpertList',
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
          this.CheckList=res.data;
      })
    },
    BecomeExpertPass(id){
      let url = API['BecomeExpertPass'] + id;
      this.$http.request({
        url:url,
      }).then(res => {
          if(res.code==1)
          {
              wx.showToast({
              title: "审核通过",
              icon: "none",
              duration: 1500
            });
             this.GetBecomeExpertList();
          }else{
              wx.showToast({
              title: "审核异常请联系管理员"+res.data,
              icon: "none",
              duration: 1500
               });
          }
    })
  }
  },
  onLoad(options) {
    this.userId=this.userData.userId
  },
  created() {},
  onShow() {
      this.GetBecomeExpertList();
  },
  onPullDownRefresh() {
    //to do
    this.GetBecomeExpertList();
    wx.stopPullDownRefresh();
  }
}
</script>

<style lang="less" scoped>
.pass {
  position: absolute;
  right: 20px;
  top: 40px;
  width: 60px;
  height: 60px;
}
.checkBtn {
  color: #fff;
  background-color: #1989fa;
  border: 1px solid #1989fa;
  border-radius: 5px;
  line-height: 30px;
  position: absolute;
  right: 20px;
  top: 50px;
  width: 60px;
  text-align: center;
  height: 30px;
}

.experts_item {
  padding: 14px 15px;
  font-size: 14px;
  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
  .top_block {
    //  height: 78px;
    height: auto;
    display: flex;
    align-items: center;
    .experts_avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid #e6e8eb;
      margin-right: 10px;
    }
    .top_block_right {
      //   flex: 1;
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
        .customer_info {
          font-size: 13px;
          color: #666;
          width: 250px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>