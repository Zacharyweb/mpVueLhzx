<template>
  <div class="container">
    <van-search  background="#fff" placeholder="请输入搜索关键词" @focus="onSearchFocus"/>
    
    <!-- <div class="relation_experts_block">
      <div class="relation_expert" @click="toExpertList('/pages/collectExpert/index')">
        <div class="expert_num">
          <img src="../../../static/img/index_icon1.png" alt="">
          <span class="num_text">
            <van-tag round color="#1fb7b6" type="primary">0</van-tag>
          </span>
        </div>
        <div class="expert_cate">收藏的专家</div>
      </div>

      <div class="relation_expert" @click="toExpertList('/pages/expertFriends/index')">
        <div class="expert_num">
          <img src="../../../static/img/index_icon2.png" alt="">
          <span class="num_text">
            <van-tag round color="#1fb7b6" type="primary">10</van-tag>
          </span>
        </div>
        <div class="expert_cate">我的专家好友</div>
      </div>

      <div class="relation_expert" @click="toExpertList('/pages/expertFriends/index')">
        <div class="expert_num">
          <img src="../../../static/img/index_icon3.png" alt="">
          <span class="num_text">
            <van-tag round color="#1fb7b6" type="primary">100</van-tag>
          </span>
        </div>
        <div class="expert_cate">已咨询专家</div>
      </div>

      <div class="relation_expert" @click="toExpertList('/pages/recommendExpert/index')">
        <div class="expert_num">
          <img src="../../../static/img/index_icon4.png" alt="">
          <span class="num_text">
            <van-tag round color="#1fb7b6" type="primary">100</van-tag>
          </span>
        </div>
        <div class="expert_cate">好友推荐专家</div>
      </div>
    </div> -->

    <!-- <div class="msg_block">
      <div class="block_top">
        <img src="../../../static/img/notice_icon1.png">
        <span>您有3条未查看消息。</span>
      </div>
      <div class="new_msg">
        <div class="msg_content text_ellipsis">
          <span>最新：</span>文本超出省略文本超出省略文本超出省略文本超出省略文本超出省略
        </div>
        <div class="msg_time">2018-11-28 00:00:00</div>
      </div>
    </div> -->

    <div class="tab_fix_wrap" v-show="tabFixedFlag">
       <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabsChange">
          <van-tab v-for="(item,index) in tagsList" :key="index" :title="item.tagName"></van-tab>
        </van-tabs>
        <div class="top_tips" @click="toConsultList">
           <img src="../../../static/img/notice_icon.png">您有咨询订单状态已更新，请及时查看。
        </div>
    </div>

    <div id="tabStaticWrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabsChange">
        <van-tab  v-for="(item,index) in tagsList" :key="index" :title="item.tagName"></van-tab>
      </van-tabs>
    </div>

    <div class="top_tips" @click="toConsultList">
       <img src="../../../static/img/notice_icon.png">您有咨询订单状态已更新，请及时查看。
    </div>

    <div class="experts_list" v-if="expertsList.length > 0">
      <expert v-for="(item,index) in expertsList" :key="index" :expert-data="item"></expert>
    </div>

    <div class="no_data_tips" v-else>
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

      expertsList:[]
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
      that.$http.request({
        url:'GetAllMajor',
        data: {
 
        }
      }).then(res => {
        that.tagsList = res.result.items;
        that.getAllExperts(res.result.items[0].id);
      })
    },
    
    // 获取专家列表
    getAllExperts (tagsId) {
      let that = this;
      that.$http.request({
        url:'GetAllExperts',
        data: {
          TagsId: tagsId,
        }
      }).then(res => {
        console.log(res);
        that.expertsList = res.result.items;
      })
    },

    toExpertList(path){
      this.$router.push(path);
    },

    onTabsChange(event){
      let index = event.target.index;
      this.currentTab = index;
      this.getAllExperts(this.tagsList[index].id);
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
    this.GetAllMajor();
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