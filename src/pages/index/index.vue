<template>
  <div class="container">
    <van-search  background="#fff" placeholder="请输入搜索关键词" @focus="onSearchFocus"/>
    <div class="tab_fix_wrap" v-show="tabFixedFlag">
       <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabsChange">
          <van-tab v-for="(item,index) in tagsList" :key="index" :title="item"></van-tab>
        </van-tabs>
        <!-- <div class="top_tips" @click="toConsultList">
           <img src="../../../static/img/notice_icon.png">您有咨询订单状态已更新，请及时查看。
        </div> -->
    </div>

    <div id="tabStaticWrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabsChange">
        <van-tab  v-for="(item,index) in tagsList" :key="index" :title="item"></van-tab>
      </van-tabs>
    </div>

    <!-- <div class="top_tips" @click="toConsultList">
       <img src="../../../static/img/notice_icon.png">您有咨询订单状态已更新，请及时查看。
    </div> -->

    <div class="experts_list" v-if="expertsList.length > 0">
      <expert v-for="(item,index) in expertsList" :key="index" :expert-data="item"></expert>
    </div>

    <div class="no_data_tips" v-if="expertsList.length == 0 && !isLoading">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>还没有相关专家哦~</span>
    </div> 

  </div>
</template>
<script>
import expert from '@/components/expert'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      userInfo: {},
      currentTab:0,
      tabFixedFlag:false,
      tagsList:[],
      expertsList:[],
      pageIndex:0,
      major:'',
      isNomore:false,
      isLoading:false
    }
  },
  

  components: {
    expert
  },

  methods: {
    ...mapActions('counter', [
      'updateConsultListTab'
    ]),
    // 获取分类标签
    GetAllMajor(){
      let that = this;
      that.isLoading = true;
      that.$http.request({
        url:'GetAllMajor',
      }).then(res => {
        wx.hideLoading();
        that.isLoading = false;
        if(res && res.code == 1){
          that.tagsList = res.data;
          that.currentTab = 0;
          that.major = res.data[0];
          that.expertsList = [];
          that.getAllExperts();
        }
      })
    },
    
    // 获取专家列表
    getAllExperts () {
      let that = this;
      that.isLoading = true;
      that.$http.request({
        url:'GetExpertList',
        data: {
          major: this.major,
          keyword: '',
          pageIndex: this.pageIndex,
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        that.isLoading = false;
        if(res.data.length == 0){
          that.isNomore = true;
        }else{
          res.data.forEach(item => {
            item.companyAddress = item.companyAddress.split('-')[1] || item.companyAddress.split('市')[0] + '市';
            item.goodAtBusiness = item.goodAtBusiness.split('|zxt|');
          });
        }
        that.expertsList = [...that.expertsList,...res.data];
      })
    },

    toExpertList(path){
      this.$router.push(path);
    },

    onTabsChange(event){
      this.expertsList = [];
      this.pageIndex = 0;
      this.isNomore = false;
      let index = event.target.index;
      this.currentTab = index;
      this.major = this.tagsList[index];
      this.getAllExperts();
    },

    onSearchFocus(){
      this.$router.push('/pages/search/index')
    },
    
    toConsultList(){
      // 控制咨询列表页Tab
      // this.updateConsultListTab(1);
      wx.switchTab({
        url: '/pages/consult/index'
      });
    }
  },
  onPageScroll() {
    var that = this;
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#tabStaticWrap').boundingClientRect()
    query.exec((res) => {
      //res就是 该元素的信息 数组
      if(res[0].top <= 0){
        if(!this.tabFixedFlag){
          this.tabFixedFlag = true;
        }
      }else{
        if(this.tabFixedFlag){
          this.tabFixedFlag = false;
        }
      }
    })
  },
  onShow(){
    if(!this.major){
      this.GetAllMajor();
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    // 接口调用案例
    // get请求
    // this.$http.request({
    //   url:'getProvince',
    //   flyConfig:{
    //     'content-type': 'application/json'
    //   },
    //   config:{
    //     showLoaing:true // 不传默认就是true
    //   }
    // }).then(res => {
    
    // })
    
    // post请求
    // this.$http.request({
    //   url:'test',
    //   data: {
    //     'categoryType': 'SaleGoodsType@sim',
    //     'streamNo': 'web_bss153570682909641893',
    //     'reqSource': 'MALL_H5',
    //     'appid': 'string',
    //     'timestamp': 1535706829096,
    //     'sign': 'string'
    //   },
    //   flyConfig:{
    //     method: 'post',
    //     baseURL: 'https://rmall.ukelink.net'
    //   },
    //   config:{
    //     showLoaing:true
    //   }
    // }).then(res => {
      
    // })
   
  },
  onReachBottom(){
    if(!this.isNomore && !this.isLoading){
      this.pageIndex++;
      this.getAllExperts();
    };
  }
}
</script>

<style lang="less" scoped>
.relation_experts_block{
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
  margin-bottom:  10px;
}
.relation_expert{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .expert_num{
    position: relative;
  
    .num_text{
      position: absolute;
      left: 35px;
      top:-10px;
    }
    img{
      width: 46px;
      height: 46px;
    }
  }
  .expert_cate{
    font-size: 12px;
    color: #000;

  }
}

.msg_block{
  font-size: 14px;
  padding:0 15px;
  background-color: #fff;
  margin-bottom: 10px;
  .block_top{
    padding: 10px 0;
    display: flex;
    img{
      width: 20px;
      height: 20px;
      padding-right: 5px;
    }
    span{
     color: #333;
    }
  }
  .new_msg{
    padding-bottom:10px;
    .msg_content{
      width: 100%;
      padding: 10px 15px;
      padding-right: 0;
      border-top: 1px solid #eee;
      box-sizing: border-box;
      span{
        font-weight: bold;
        font-size: 16px;
      }
    }
    .msg_time{
       font-size: 12px;
       text-align: center;
       color: #999;
    }
  }
}
.tab_fix_wrap{
  position: fixed;
  width: 100%;
  height: 16px;
  top:0;
  left: 0;
  z-index: 2;
}
.top_tips{
  background-color: #f3fbfb;
  height: 28px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding:0 15px;
  color: #1fb7b6;
  img{
    margin-right: 10px;
    width: 16px;
    height: 16px;
  }
}
.experts_list{
  
}
</style>