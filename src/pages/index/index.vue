<template>
  <div class="container">
    <div class="top_bar">
        <div class="location_select" @click="showAreaSelectPanel">
          <img class="location_icon" src="../../../static/img/location_icon.png">
          <span>{{cityKey}}</span>
        </div>
        <div class="search_wrap">
          <van-search  background="#fff" :value="searchKey" placeholder="请输入搜索关键词" @focus="onSearchFocus"/>
        </div>
        <img class="sx_icon" v-show="selectedHy || selectedKs" src="../../../static/img/sx_active.png" @click="sxPanelShow = true;">
        <img class="sx_icon" v-show="!selectedHy && !selectedKs" src="../../../static/img/sx_grey.png" @click="sxPanelShow = true;">
    </div>
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
      <span>{{i18n.No_relevant_data}}</span>
    </div> 

    
    <!-- 地区选择组件 -->
    <div class="area_select_block">
      <div class="mask" @click="areaSelectPanelShow = false" v-show="areaSelectPanelShow"></div>
      <div class="area_select_panel" :class="{'show':areaSelectPanelShow}">
        <van-area :area-list="areaList" :columns-num="2" @confirm="confirmArea" @cancel="cancelArea"/>
      </div>
    </div>

    <div class="sx_panel" :class="{show:sxPanelShow}">
      <div class="sx_top_bar">
        <span class="cancel_btn" @click="sxPanelShow = false;">取消</span>
        <span class="panel_title">筛选</span>
        <span class="confirm_btn" @click="submitSx">完成</span>
      </div>
      <div class="sx_tabs">
        <div class="tab_item">
          <span class="tab_name" @click="sxType = 1 ">{{i18n.Sector}}：</span>
          <span class="tab_content" :class="{'active':selectedHy}" @click="sxType = 1 ">{{selectedHy?selectedHy:i18n.unselected}}</span>
          <img class="arrow_icon" src="../../../static/img/arrow_down2.png" @click="sxType = 1 ">
        </div>
        <div class="tab_item">
          <span class="tab_name" @click="sxType = 2 ">{{i18n.Speciality}}：</span>
          <span class="tab_content"  :class="{'active':selectedKs}" @click="sxType = 2 ">{{selectedKs?selectedKs:i18n.unselected}}</span>
          <img class="arrow_icon" src="../../../static/img/arrow_down2.png" @click="sxType = 2 ">

        </div>
      </div>

      <div class="sx_body" v-show="sxType == 1">
        <div class="body_top">
          <span>行业</span>
        </div>
        <ul class="tags_list">
          <li class="list_item" :class="{'active':item.flag}" v-for="(item,index) in hyList" @click="singleChange('hyList',index)" :key="index">{{item.name}}</li>
        </ul>
      </div>

      <div class="sx_body" v-show="sxType == 2">
        <div class="body_top">
          <span>科室</span>
        </div>
        <ul class="tags_list">
          <li class="list_item" :class="{'active':item.flag}" v-for="(item,index) in ksList" @click="singleChange('ksList',index)" :key="index">{{item.name}}</li>
        </ul>
       
      </div>
        <div class="btns_wrap">
          <span class="clean_btn" @click="cleanSx">清空</span>
          <span class="submit_btn" @click="submitSx">完成</span>
        </div>
    </div>
  </div>
</template>
<script>
import expert from '@/components/expert'
import { mapState, mapActions } from 'vuex'
import AreaList from '../../../static/js/area.js';
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
      isLoading:false,
      areaList:AreaList,
      areaSelectPanelShow:false,
      sxType:1, // 1:筛选行业 2：筛选科室
      city:'全国',
      cityKey:'全国',
      hyList:[
    
      ],
      ksList:[
      
      ],
      sxPanelShow:false,
      searchKey:''
    }
  },
  computed:{
    selectedHy(){
      let l = this.hyList.length;
      for(let i = 0; i < l; i++){
        if(this.hyList[i].flag){
          return this.hyList[i].name;
        }
      }
      return '';
    },
    selectedKs(){
      let l = this.ksList.length;
      for(let i = 0; i < l; i++){
        if(this.ksList[i].flag){
          return this.ksList[i].name;
        }
      }
      return '';
    },
    ...mapState({
      i18n: state => state.counter.i18n
    })
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
    getLhzxBusinessAreas(){
      let that = this;
      that.$http.request({
        url:'GetLhzxBusinessAreas',
        flyConfig:{
          method: 'get'
        }
      }).then(res => {
        let hyList = [];
        res.data.forEach(item => {
          hyList.push({
            name:item.businessAreaName,
            id:item.id,
            flag:false
          })
        });
        this.hyList = hyList;
     
      })
    },
    getLhzxGoodAtBusiness(){
      let that = this;
      that.$http.request({
        url:'GetLhzxGoodAtBusiness',
        flyConfig:{
          method: 'get'
        }
      }).then(res => {
        let ksList = [];
        res.data.forEach(item => {
          ksList.push({
            name:item.goodAtBusinessName,
            id:item.id,
            flag:false
          })
        });
        this.ksList = ksList;
      })
    },
    
    // 获取专家列表
    getAllExperts () {
      let that = this;
      that.isLoading = true;
      that.$http.request({
        url:'GetExpertList',
        data: {
          businessArea: this.selectedHy,
          goodAtBusiness: this.selectedKs,
          address: this.city == '全国'? '':this.city,
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
            // item.companyAddress = item.companyAddress.split('-')[1] || item.companyAddress.split('市')[0] + '市';
          });
        }
        if(that.pageIndex == 0){
          that.expertsList = [...res.data];
        }else{
          that.expertsList = [...that.expertsList,...res.data];
        }
     
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
    },

    showAreaSelectPanel(){
      this.areaSelectPanelShow = true;
    },
    cancelArea(){
      this.areaSelectPanelShow = false;
      this.city = '全国';
      this.cityKey = '全国';
      this.getAllExperts();
    },
    confirmArea(e){
      let result = e.mp.detail.values;
      this.city = result[0].name + '-' + result[1].name;
      this.cityKey = result[1].name;
      this.areaSelectPanelShow = false;
      this.getAllExperts();
    },
    // 单选变动
    singleChange(itemName,index){
      if(this[itemName][index].flag) return;
      this[itemName].forEach(item => {
        item.flag = false;
      });
      this[itemName][index].flag =  true;
    },
    cleanSx(){
      this.hyList.forEach((item)=>{
        item.flag = false;
      })
      this.ksList.forEach((item)=>{
        item.flag = false;
      })
    },
    submitSx(){
      this.sxPanelShow = false;
      this.getAllExperts();
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
    this.searchKey = '';
    if(!this.major){
      this.GetAllMajor();
      this.getLhzxBusinessAreas();
      this.getLhzxGoodAtBusiness();
    }else{
      // this.expertsList = [];
      this.pageIndex = 0;
      this.isNomore = false;
      this.getAllExperts();
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

.top_bar{
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  .location_select{
    display: flex;
    align-items: center;
    // margin-right: 10px;
    .location_icon{
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    span{
      font-size: 12px;
      color: #999;
    }
  }
  .search_wrap{
    flex: 1;
  }
  .sx_icon{
    width: 20px;
    height: 20px;
    // margin-left: 10px;
  }
}


.sx_panel{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
  transform: translateX(100%);
  transition: all 0.3s;
  &.show{
    transform: translateX(0);
  }
  .sx_top_bar{
    display: flex;
    align-items: center;
    height: 40px;
    padding:0 10px;
    border-bottom: 1px solid #e6e8eb;
    .cancel_btn{
      width: 60px;
      font-size: 13px;
      color: #333;
    }
    .panel_title{
      flex: 1;
      font-size: 15px;
      text-align: center;
      color: #333;
    }
    .confirm_btn{
      width: 60px;
      height: 24px;
      border-radius: 3px;
      font-size: 13px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1fb7b6;
    }
  }
  .sx_tabs{
    display: flex;
    align-items: center;
    height: 40px;
    padding:0 15px;
    .tab_item{
      display: flex;
      flex: 1;
      align-items: center;
      .tab_name{
        font-size: 14px;
        margin-right: 10px;
      }
      .tab_content{
        font-size: 14px;
        color: #999;
        &.active{
          color: #666;
        }
      }
      .arrow_icon{
        margin-left: 5px;
        width: 12px;
        height: 9px;
      }
    }

  }
  .btns_wrap{
    display: flex;
    justify-content: space-between;
    padding:0 20px;
    .clean_btn{
      width: 150px;
      height: 36px;
      border-radius: 3px;
      font-size: 14px;
      color: #1fb7b6;
      display: flex;
      align-items: center;
      justify-content: center;
      border:1px solid #1fb7b6;
    }
    .submit_btn{
      width: 150px;
      height: 36px;
      border-radius: 3px;
      font-size: 14px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1fb7b6;
    }
  }
}

.sx_body{
   padding:10px 15px;
   font-size: 14px;
    min-height: 230px;
  .body_top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    span{
      color: #666;
      font-weight: bold;
    }
    img{
      height: 18px;
      width: 18px;
    }
  }
  .tags_list{
    display: flex;
    flex-wrap: wrap;
    .list_item{
      margin-right: 5px;
      margin-top: 5px;
      background-color: #f8f8f8;
      color: #666;
      font-size: 12px;
      height: 32px;
      display: flex;
      align-items: center;
      padding:0 15px;
      border-radius: 16px; 
      &.active{
        color: #fff;
        background-color: #1fb7b6;
      }
    }
  }

}

</style>