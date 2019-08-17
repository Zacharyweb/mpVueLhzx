<template>
  <div class="container">
    <div class="custom_tabs" v-if="userData && userData.isExpert == 1">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">我的咨询</div>
      <div class="tab_item" :class="{'active':currentTab == 1}" @click="changeTab(1)">客户咨询</div>
      <span class="active_bar active25" :class="{'active75':currentTab == 1}"></span>
    </div>
    <div style="height:45px;"  v-if="userData && userData.isExpert == 1"></div>

    <div class="orders_list" v-show="currentTab == 0">
      <my-order v-for="(item,index) in myOrders" :key="index" :order-data="item"></my-order>
      <div class="no_data_tips" v-if="myOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png">
        <span>还没有相关订单哦~</span>
      </div>   
    </div>

    <div class="orders_list" v-show="currentTab == 1">
      <!-- 待接单 -->
      <customer-order v-for="(item,index) in customerOrders" :key="index" :order-data="item"></customer-order>

      <div class="no_data_tips" v-if="customerOrders.length == 0 && !isLoading">
        <img class="no_data_img" src="../../../static/img/no_data_tips.png">
        <span>还没有相关订单哦~</span>
      </div>   

    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import util from '../../utils/index.js'
import { setInterval, setTimeout, clearInterval } from 'timers';
import myOrder from '@/components/myOrder'
import customerOrder from '@/components/customerOrder'

export default {
  data () {
    return {
      currentTab:0,
      myOrders:[
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:0,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:1,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:2,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:3,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:4,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:5,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:6,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:7,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:8,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:9,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:-1,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11'},
      ],
      customerOrders:[
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:0,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:1,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:2,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:3,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:4,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:5,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:6,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:7,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:8,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:9,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
        // {id:1,avatarUrl:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4112766760,3919855354&fm=179&app=42&f=JPG?w=56&h=56',status:-1,orderNo:'xy1223213',nickName:'朱两边',amount:'40',companyPosition:'前端工程师',companyName:'阿拉丁',questionRemark:'小问题问题内容内容容内容容内容容内容',creationTime:'2018-09-18 08:09:11',actualAnswerTime:'2018-09-19 08:09:11',orderUserDesc:'我是自我介绍'},
      ],
      isLoading:false
    }
  },
  computed:{
    ...mapState({
      consultListTab: state => state.counter.consultListTab,
      userData: state => state.counter.userData
    })
  },

  components: {
    myOrder,
    customerOrder
  },

  methods: {
    changeTab(num){
      if(this.currentTab == num){
        return;
      }
      this.currentTab = num;
    },
  
    getUserOrderList(){
      this.isLoading = true;
      this.$http.request({
        url:'GetUserOrderList',
        data:{
          userid:this.userData.userId
        }
      }).then(res => {
        this.isLoading = false;
        if(res.code == 1){
          res.data = res.data || [];
          res.data.forEach(item => {
            item.creationTime = util.formatTime(new Date(item.creationTime));
            item.leaveReceiptTime = Math.ceil(((+new Date(item.lastReceiptTime)) - (+new Date()))  / 1000);
            item.lastReceiptTime = util.formatTime(new Date(item.lastReceiptTime));
            item.leaveAnswerTime = Math.ceil(((+new Date(item.lastAnswerTime)) - (+new Date())) / 1000);
            item.lastAnswerTime = util.formatTime(new Date(item.lastAnswerTime));
          });
          this.myOrders = res.data;
        }
      })
    },
    
    getExpertOrderList(){
      this.isLoading = true;
      this.$http.request({
        url:'GetExpertOrderList',
        data:{
          userid:this.userData.userId
        }
      }).then(res => {
        this.isLoading = false;
        if(res.code == 1){
          res.data = res.data || [];
          res.data.forEach(item => {
            item.creationTime = util.formatTime(new Date(item.creationTime));
  
            item.leaveReceiptTime =  Math.ceil(((+new Date(item.lastReceiptTime)) - (+new Date())) / 1000);
            item.lastReceiptTime = util.formatTime(new Date(item.lastReceiptTime));
  
          
            item.leaveAnswerTime =  Math.ceil(((+new Date(item.lastAnswerTime)) - (+new Date())) / 1000);
      
            item.lastAnswerTime = util.formatTime(new Date(item.lastAnswerTime));
          });
          this.customerOrders = res.data;
        }
      })
    },
  },
  created () {

  },
  onLoad: function (options) {
    if(this.userData && this.userData.isExpert == 1){
       this.currentTab = this.consultListTab;
    }else{
       this.currentTab = 0;
    }
  },
  onShow(){
    this.getUserOrderList();
    if(this.userData && this.userData.isExpert == 1){
      this.getExpertOrderList();
    }
  }

}
</script>
<style lang="less" scoped>
  .custom_tabs{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
</style>