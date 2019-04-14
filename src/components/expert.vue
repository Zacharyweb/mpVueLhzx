<template>
  <div class="experts_item" @click="linkTo('/pages/expertDetail/index')">
    <div class="top_block">
      <img class="experts_avatar" src="../../static/img/avatar.jpeg">
      <div class="top_block_right">
        <div class="experts_msg1">
          <div class="experts_name">朱两边<span class="status">营业中</span></div>
          <span class="consult_msg">5位关系户已咨询过</span>
        </div>
        <div class="experts_msg2">
          <span class="experts_position">前所得税副处（杭州市税局大企业处）</span>
          <!-- <span class="consult_price">￥66/节</span> -->
        </div>
        <div class="experts_msg3">
          <div class="experts_location">
            <img src="../../static/img/location_icon.png">杭州
          </div>
          <span class="devide_line"></span>
          <div class="experts_experience">
            <img src="../../static/img/time_icon.png">3-5年工作经验
          </div>
        </div>
      
      </div>
    </div>
    <div class="bottom_block">
      <!-- <span>专注行业领域</span>
      <span class="speciality_tag">医疗/健康/制药</span>
      <span class="speciality_tag">广告/传媒</span>
       <span class="speciality_tag">广告/传媒</span> -->
      <div class="bottom_block_item">
        <span class="item_title">擅长业务领域：</span>
        <span class="item_text">高新企业所得税申请、7号公告的应用和申报</span>
      </div>
      <div class="bottom_block_item">
        <span class="item_title">回应作答时间：</span>
        <span class="item_text">30分钟内回应、24小时内作答</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['expertData'],
  methods:{
    linkTo(path){
      this.$router.push(path);
    }
  }

}
</script>
<style lang="less" scoped>
 .experts_item{
    height: 183px;
    .top_block{
       height: 128px;
      .experts_avatar{
        width: 90px;
        height: 90px;
      }
      .top_block_right{
      
      }
    }
    .bottom_block{
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 55px;
      .bottom_block_item{
        line-height: 1.5;
        display: flex;
        .item_title{
          color: #666;
        }
        .item_text{
          color: #999;
          width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }

      }
    }
  }
</style>
