<template>
  <div class="container">
    <div class="noLogin" v-if="!userData">
      <div class="no_data_tips">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>您未登录，请先登录哦~</span>
      </div>
      <div class="login_btn">
        <div class="to_login_btn" @click="toLoginPage">马上登录</div>
      </div>
    </div>

    <div class="custom_tabs" v-if="userData && userData.isExpert == 1">
      <div
        class="tab_item"
        :class="{'active':currentTab == 0}"
        @click="changeTab(0)"
      >{{i18n.Client_Query}}</div>

      <div
        class="tab_item"
        :class="{'active':currentTab == 1}"
        @click="changeTab(1)"
      >{{i18n.My_Query}}</div>

      <span class="active_bar active25" :class="{'active75':currentTab == 1}"></span>
    </div>
    <div style="height:45px;" v-if="userData && userData.isExpert == 1"></div>

    <div class="orders_list" v-show="currentTab == 0">
      <customer-order v-for="(item,index) in customerOrders" :key="index" :order-data="item"></customer-order>
      <div class="no_data_tips" v-if="customerOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>{{i18n.No_relevant_data}}</span>
      </div>
    </div>

    <div class="orders_list" v-show="currentTab == 1">
      <my-order v-for="(item,index) in myOrders" :key="index" :order-data="item"></my-order>
      <div class="no_data_tips" v-if="myOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>{{i18n.No_relevant_data}}</span>
      </div>
    </div>

    
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import util from "../../utils/index.js";
import { setInterval, setTimeout, clearInterval } from "timers";
import myOrder from "@/components/myOrder";
import customerOrder from "@/components/customerOrder";
import { API, BASE_URL } from "../../http/api.js";
export default {
  data() {
    return {
      currentTab: 0,
      myOrders: [],
      customerOrders: [],
      isLoading: false,
      userId: 0
    };
  },
  computed: {
    ...mapState({
      consultListTab: state => state.counter.consultListTab,
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },

  components: {
    myOrder,
    customerOrder
  },

  methods: {
    ...mapActions('counter', [
      'updateConsultListTab'
    ]),
    changeTab(num) {
      if (this.currentTab == num) {
        return;
      }
      this.currentTab = num;
      if (num == 0) this.getExpertOrderList();
      if (num == 1) this.getUserOrderList();
    },

    getUserOrderList() {
      this.isLoading = true;
      console.log(this.userData);
      if (this.userData != null) {
        this.userId = this.userData.userId;
        let url = API["UserOrderList"] + this.userId;
        this.$http
          .request({
            url: url
          })
          .then(res => {
            wx.stopPullDownRefresh();
            this.isLoading = false;
            if (res.code == 1) {
              res.data = res.data || [];
              res.data.forEach(item => {
                item.creationTime = util.formatTime(
                  new Date(item.creationTime)
                );
                item.leaveReceiptTime = Math.ceil(
                  (+new Date(item.lastReceiptTime) - +new Date()) / 1000
                );
                item.lastReceiptTime = util.formatTime(
                  new Date(item.lastReceiptTime)
                );
                item.leaveAnswerTime = Math.ceil(
                  (+new Date(item.lastAnswerTime) - +new Date()) / 1000
                );
                item.lastAnswerTime = util.formatTime(
                  new Date(item.lastAnswerTime)
                );
              });
              this.myOrders = res.data;
            }
          });
      }
    },

    getExpertOrderList() {
      this.isLoading = true;
      console.log(this.userData);
      if (this.userData != null) {
        this.userId = this.userData.userId;

        let url = API["ExpertOrderList"] + this.userId;
        this.$http.request({url: url}).then(res => {
            wx.stopPullDownRefresh();
            this.isLoading = false;
            if (res.code == 1) {
              res.data = res.data || [];
              res.data.forEach(item => {
                item.creationTime = util.formatTime(
                  new Date(item.creationTime)
                );
                item.leaveReceiptTime = Math.ceil(
                  (+new Date(item.lastReceiptTime) - +new Date()) / 1000
                );
                item.lastReceiptTime = util.formatTime(
                  new Date(item.lastReceiptTime)
                );
                item.leaveAnswerTime = Math.ceil(
                  (+new Date(item.lastAnswerTime) - +new Date()) / 1000
                );
                item.lastAnswerTime = util.formatTime(
                  new Date(item.lastAnswerTime)
                );
              });
              this.customerOrders = res.data;
            }
          });
      }
    },
    toLoginPage(){
      this.$router.push({path:'/pages/login/index'});
    },
  },
  onShow() {
    if (this.userData && this.userData.isExpert == 1) {
      this.currentTab = this.consultListTab;
      if(this.consultListTab == 1){
        this.getUserOrderList();
      }else{
        this.getExpertOrderList();
      }
    } else {
      this.currentTab = 1;
      this.getUserOrderList();
    }
  },
  onHide(){
    this.updateConsultListTab(this.currentTab);
  },
  onPullDownRefresh () {
    if(this.currentTab == 1){
      this.getUserOrderList();
    }else{
      this.getExpertOrderList();
    };
  }
};
</script>

<style lang="less" scoped>
.custom_tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.noLogin{
  padding-top: 20px;
  .login_btn{
    display: flex;
    justify-content: center;
    .to_login_btn{
      height: 30px;
      display: flex;
      align-items: center;
      border: 1px solid #1fb7b6;
      color: #1fb7b6;
      padding: 0 8px;
      border-radius: 14px;
      font-size: 14px;
      margin-top: 12px;
    }
  }
}

</style>