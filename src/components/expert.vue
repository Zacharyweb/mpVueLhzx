<template>
  <div class="experts_item" @click="linkTo('/pages/expertDetail/index')">
    <div class="top_block">
      <img class="experts_avatar" src="../../static/img/avatar.jpeg">
      <div class="top_block_right">
        <div class="experts_msg1">
          <span class="experts_name">朱两边</span>
          <span class="consult_msg">10个好友已咨询</span>
        </div>
        <div class="experts_msg2">
          <span class="experts_position">高级财务专家</span>
          <span class="consult_price">￥66/节</span>
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
      <span>专注行业领域</span>
      <span class="speciality_tag">医疗/健康/制药</span>
      <span class="speciality_tag">广告/传媒</span>
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
      height: 55px;
    }
  }
</style>
