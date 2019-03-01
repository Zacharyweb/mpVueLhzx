<template>
  <div class="container">
    <div class="search_bar_fixed">
      <van-search :value="searchKey" background="#fff" use-action-slot placeholder="搜索好友" @change="handleSearchChange">  
        <view slot="action" @click="onSearch">搜索</view>
      </van-search>
    </div>
   
    <!-- <div class="no_data_tips">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>没有相关结果哦~</span>
    </div> -->

    <div class="experts_list">

      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
            <div class="experts_msg3">
              <div class="experts_location">
                <img src="../../../static/img/location_icon.png">杭州
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
            <div class="experts_msg3">
              <div class="experts_location">
                <img src="../../../static/img/location_icon.png">杭州
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
       searchKey:'',
    }
  },
  components: {

  },
  methods: {
    handleSearchChange(event){
      this.searchKey = event.mp.detail;
    },
    onSearch(){
      console.log(this.searchKey);
      this.toSearch();
    },
   
    toSearch(){
      this.searchResultShow = true;
    }
  },
  created () {

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
.search_bar_fixed{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
}
.experts_list{
  padding-top: 44px;
}
</style>