<template>
  <div class="container">

    <van-search  background="#fff" placeholder="请输入搜索关键词" @focus="onSearchFocus"/>

    <div class="relation_experts_block">
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
    </div>

    <div class="msg_block">
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
    </div>

    <div class="tab_fix_wrap" v-show="tabFixedFlag">
       <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabsChange">
          <van-tab title="税务"></van-tab>
          <van-tab title="法务"></van-tab>
          <van-tab title="工商"></van-tab>
          <van-tab title="海关"></van-tab>
        </van-tabs>
    </div>
    <div id="tabStaticWrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabsChange">
        <van-tab title="税务"></van-tab>
        <van-tab title="法务"></van-tab>
        <van-tab title="工商"></van-tab>
        <van-tab title="海关"></van-tab>
      </van-tabs>
    </div>

    <div class="experts_list">
      <expert></expert>
      <expert></expert>
      <expert></expert>
      <expert></expert>
    </div>
  </div>
</template>
<script>
import expert from '@/components/expert'
export default {
  data () {
    return {
      userInfo: {},
      currentTab:2,
      tabFixedFlag:false
    }
  },

  components: {
    expert
  },

  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    toExpertList(path){
      this.$router.push(path);
    },
    onTabsChange(event){
      this.currentTab = event.target.index;
    },
    onSearchFocus(){
      this.$router.push('/pages/search/index')
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
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();

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
.experts_list{
  
}
</style>