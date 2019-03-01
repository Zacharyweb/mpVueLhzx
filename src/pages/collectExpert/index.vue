<template>
  <div class="container">
    <div class="tab_fix_wrap">
       <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
          <van-tab title="税务"></van-tab>
          <van-tab title="法务"></van-tab>
          <van-tab title="工商"></van-tab>
          <van-tab title="海关"></van-tab>
        </van-tabs>
    </div>
 
    <div class="experts_list">

      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">取消收藏</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
              <span class="consult_status">已咨询</span>
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
              <span class="consult_msg">取消收藏</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
              <span class="consult_status">已咨询</span>
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
      currentTab:0,
    }
  },

  components: {
  
  },

  methods: {
    onTabChange(event){
      this.currentTab = event.target.index;
    }
  },
  created () {
   
  }
}
</script>

<style lang="less" scoped>
.tab_fix_wrap{
  position: fixed;
  width: 100%;
  height: 16px;
  top:0;
  left: 0;
  z-index: 2;
}
.experts_list{
  padding-top: 32px;
}
</style>