<template>
  <div class="container">
    <div class="noLogin" v-if="!userData">请登录后查看</div>

    <div class="custom_tabs" v-if="userData && userData.isExpert == 1">
      <div
        class="tab_item"
        :class="{'active':currentTab == 0}"
        @click="changeTab(0)"
      >{{i18n.My_Query}}</div>
      <div
        class="tab_item"
        :class="{'active':currentTab == 1}"
        @click="changeTab(1)"
      >{{i18n.Client_Query}}</div>
      <span class="active_bar active25" :class="{'active75':currentTab == 1}"></span>
    </div>
    <div style="height:45px;" v-if="userData && userData.isExpert == 1"></div>

    <div class="orders_list" v-show="currentTab == 0">
      <my-order v-for="(item,index) in myOrders" :key="index" :order-data="item"></my-order>
      <div class="no_data_tips" v-if="myOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>{{i18n.No_relevant_data}}</span>
      </div>
    </div>

    <div class="orders_list" v-show="currentTab == 1">
      <!-- 待接单 -->
      <customer-order v-for="(item,index) in customerOrders" :key="index" :order-data="item"></customer-order>

      <div class="no_data_tips" v-if="customerOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png" />
        <span>{{i18n.No_relevant_data}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
    changeTab(num) {
      if (this.currentTab == num) {
        return;
      }
      this.currentTab = num;

      if (num == 0) this.getUserOrderList();
      if (num == 1) this.getExpertOrderList();
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
        this.$http
          .request({
            url: url
          })
          .then(res => {
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
    }
  },
  created() {},
  onLoad: function(options) {
    if (this.userData && this.userData.isExpert == 1) {
      this.currentTab = this.consultListTab;
    } else {
      this.currentTab = 0;
    }
  },
  onShow() {
    this.getUserOrderList();
    if (this.userData && this.userData.isExpert == 1) {
      this.getExpertOrderList();
    }
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
  margin: 0 auto;
  width: 10rem;
 text-align: center;
 color: #ccc;
}
</style>