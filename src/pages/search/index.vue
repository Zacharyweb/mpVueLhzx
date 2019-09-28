<template>
  <div class="container">
    <div class="search_block">
      <van-search :value="searchKey" background="#fff" use-action-slot placeholder="请输入搜索关键词" @change="handleSearchChange">  
        <view slot="action" @click="onSearch">搜索</view>
      </van-search>
    </div>
    <div class="fixed_fill_block"></div>

    <div class="search_history" v-show="expertsList.length == 0 && !searchHandle ">
      <div class="block_top">
        <span>最近搜索</span>
        <img src="../../../static/img/delete_icon.png" @click="triggerDelete">
      </div>
      <ul class="history_list">
        <li class="list_item" @click="selectTag(item.searchKeyWord)" v-for="(item,index) in searchKeysList" :key="index">{{item.searchKeyWord}}</li>
      </ul>
    </div>

    <div class="no_data_tips" v-show="expertsList.length == 0 && searchHandle && !isLoading">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>没有相关结果哦~</span>
    </div>

    <div class="experts_list" v-if="expertsList.length > 0">
      <expert v-for="(item,index) in expertsList" :key="index" :expert-data="item"></expert>
    </div>
    <div class="no_more_tips" v-show="expertsList.length > 0 && isNomore && !isLoading">没有更多了哦~</div>
    <van-dialog id="van-dialog"/>
  </div>
</template>
<script>
import expert from '@/components/expert'
import Dialog from '../../../static/vant/dialog/dialog';
import { mapState, mapActions } from 'vuex'
import {API, BASE_URL} from  '../../http/api.js'
export default {
  data () {
    return {
      searchKey:'',
      searchKeysList:[], // 搜索的历史记录
      searchHandle:false, //用于切换历史记录与搜索为空结果页
      expertsList:[],
      pageIndex:0,
      isNomore:false,
      isLoading:false
    }
  },
  components: {
    expert
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },
  methods: {
    handleSearchChange(event){
      this.searchKey = event.mp.detail;
      if(!event.mp.detail){
        this.getSearchHistory();
        this.expertsList = [];
        this.searchHandle = false;
      }
    },
    onSearch(){
      if(!this.searchKey){
        wx.showToast({
          title: '请输入搜索关键词',
          icon: 'none'
        })
        return;
      };
      this.expertsList = [];
      this.searchHandle = true;
      this.isNomore = false;
      this.getExpertList();
    },
    selectTag(key){
      this.expertsList = [];
      this.searchHandle = true;
      this.isNomore = false;
      this.searchKey = key;
      this.getExpertList();
    },

    // 搜索专家列表
    getExpertList () {
      if(this.isNomore || this.isLoading){
        return;
      }
      let that = this;
      that.isLoading = true;
      wx.showLoading({
        title: '搜索中',
        mask: true
      });
      that.$http.request({
        url:'GetExpertList',
        data: {
          businessArea: '',
          goodAtBusiness: '',
          address: '',
          major: '',
          keyword: this.searchKey,
          pageIndex: this.pageIndex,
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.data.length == 0){
          that.isNomore = true;
        }else{
          res.data.forEach(item => {
           
          });
        };
        that.expertsList = [...that.expertsList,...res.data];
        console.log(that.expertsList);
        that.isLoading = false; 
        wx.hideLoading()
      })
    },

    // 获取用户搜索历史
    getSearchHistory () {
      let that = this;
      that.$http.request({
        url:API['GetSearchHistory'] + this.userData.userId,
      }).then(res => {
        if(res.code == 1){
          that.searchKeysList = res.data;
        }
      })
    },

    triggerDelete(){
      let that = this;
      Dialog.confirm({
        title: '确认清空',
        message: '清空搜索记录将无法恢复，请确认'
      }).then(() => {
         that.deleteSearchHistory();
      }).catch(() => {
        
      });
    },

    deleteSearchHistory(){
      let that = this;
      that.$http.request({
        url:API['DeleteSearchHistory'] + this.userData.userId,
      }).then(res => {
        if(res.code == 1){
          that.searchKeysList = [];
          wx.showToast({
            title: '已清空记录',
            icon: 'none'
          })
        }
      })
    }
  },
  created () {
   
  },
  onShow(){
    this.getSearchHistory();
  },
  onReachBottom(){
    if(!this.isNomore && !this.isLoading){
      this.pageIndex++;
      this.getExpertList();
    };
  }
}
</script>

<style lang="less" scoped>
.search_block{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  height: 44px;
  z-index: 2;
}
.fixed_fill_block{
  height: 44px;
}
.search_history{
   padding:10px 15px;
   font-size: 14px;
  .block_top{
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
  .history_list{
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
    }
  }
}
// .no_data_tips{
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   margin-top: 50px;
//   .no_data_img{
//       width: 150px;
//       height: 150px;
//   }
//   span{
//     color: #999;
//     font-size: 14px;
//     margin-top: 20px;
//   }  
// }
.experts_list{
  
}
.no_more_tips{
  font-size: 13px;
  color: #999;
  text-align: center;
  line-height: 36px;
}
</style>