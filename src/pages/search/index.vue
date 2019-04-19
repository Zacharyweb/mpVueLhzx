<template>
  <div class="container">
    <van-search :value="searchKey" background="#fff" use-action-slot placeholder="请输入搜索关键词" @change="handleSearchChange">  
      <view slot="action" @click="onSearch">搜索</view>
    </van-search>
    <div class="search_history" v-show="!searchResultShow">
      <div class="block_top">
        <span>最近搜索</span>
        <img src="../../../static/img/delete_icon.png">
      </div>
      <ul class="history_list">
        <li class="list_item" @click="selectTag('财务')">财务</li>
        <li class="list_item" @click="selectTag('财务')">财务</li>
      </ul>
    </div>
    <!-- <div class="no_data_tips">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>没有相关结果哦~</span>
    </div> -->

    <div class="experts_list" v-show="searchResultShow">
      <expert></expert>
    </div>

  </div>
</template>
<script>
import expert from '@/components/expert'
export default {
  data () {
    return {
       searchKey:'',
       searchResultShow:false
    }
  },
  components: {
    expert
  },
  methods: {
    handleSearchChange(event){
      this.searchKey = event.mp.detail;
    },
    onSearch(){
      console.log(this.searchKey);
      this.toSearch();
    },
    selectTag(key){
      this.searchKey = key;
      this.toSearch();
    },
    toSearch(){
      this.searchResultShow = true;
    }
  },
  created () {
    // console.log('11111111111111111111111111111sddasdsadasd');
  },
  onShow(){
    this.searchResultShow = false;
    this.searchKey = '';
  }
}
</script>

<style lang="less" scoped>
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
.no_data_tips{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  .no_data_img{
      width: 150px;
      height: 150px;
  }
  span{
    color: #999;
    font-size: 14px;
    margin-top: 20px;
  }  
}
.experts_list{
  
}
</style>