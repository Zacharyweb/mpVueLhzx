<template>
  <div class="container">

    <div class="tab_fix_wrap">
      <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
          <van-tab title="咨询过您"></van-tab>
          <van-tab title="关注您的"></van-tab>
          <!-- <van-tab title="问候过您"></van-tab> -->
      </van-tabs>
    </div>

    <div style="height:32px;"></div>

    <!-- <div class="no_data_tips">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>还没有相关客户哦~</span>
    </div>  -->

    <div class="experts_list type1_list" v-show="currentTab == 0">
     
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">客户1</span>
            </div>
            <div class="experts_msg2">
              <span class="customer_info">客户1的自我介绍</span>
            </div>
          </div>
        
        </div>
      </div>
    </div>

    <div class="experts_list type1_list" v-show="currentTab == 1">
    
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">客户3</span>
            </div>
            <div class="experts_msg2">
              <span class="customer_info">客户3的自我介绍客户3的自我介绍客户3的自我介绍客户3的自我介绍客户3的自我介绍客户3的自我介绍客户3的自我介绍</span>
            </div>
          </div>
        
        </div>
      </div>
    </div> 
<!-- 
    <div class="experts_list type1_list" v-show="currentTab == 2">
  
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">客户2</span>
            </div>
            <div class="experts_msg2">
              <span class="customer_info">客户2的自我介绍</span>
            </div>
          </div>
         
        </div>
      </div>
    </div> -->

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentTab: 0,
    }
  },
  computed:{
    ...mapState({
      isX: state => state.counter.isX,
      i18n: state => state.counter.i18n
    }),
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
.container.hpb{
  padding-bottom: 50px;
}
.container.hpb.isX{
  padding-bottom: 82px;
}
.tab_fix_wrap{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 2;
}
.experts_item{
    padding: 14px 15px;
    font-size: 14px;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    .top_block{
      //  height: 78px;
      height: auto;
       display: flex;
       align-items: center;
      .experts_avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 3px solid #e6e8eb; 
        margin-right: 10px;
      }
      .top_block_right{
        flex: 1;
        .experts_msg1{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .experts_name{
            font-size: 16px;
            color: #333;
          }
        }
        .experts_msg2{
          margin-top: 10px;
          font-size: 14px;
          color: #333;
          display: flex;
          justify-content: space-between;
          .customer_info{
            font-size: 13px;
            color: #666;
            width: 250px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
         
        }
      }
    }
  }
</style>