<template>
  <div class="experts_item" @click="linkTo('/pages/expertDetail/index')">
    <div class="top_block">
      <img class="experts_avatar" :src="expertData.avatarUrl">
      <div class="top_block_right">

        <div class="experts_msg1">
          <div class="experts_name">
            <span class="experts_nickname">{{expertData.nickName}}</span>
            <span class="experts_experience">{{expertData.majorYearsDesc}}</span>
          </div>
          <span class="status" v-if="expertData.workStatus == 1">{{i18n.Open}}</span>
          <span class="status grey" v-else>{{i18n.Closed}}</span>
          <!-- <span class="consult_msg">{{expertData.relationCount}}位关系户已咨询过</span> -->
        </div>
        
        <div class="experts_msg2">
          <span class="experts_position">{{expertData.companyPosition}}{{expertData.companyName?' | ' + expertData.companyName:''}}</span>
        </div>
       
        <div class="experts_msg3">
          <div class="experts_location">
            <img src="../../static/img/hy_icon.png">{{expertData.businessArea}}-{{expertData.goodAtBusiness}}
          </div>
          <span class="devide_line"></span>
          <div class="experts_experience">
            <img src="../../static/img/location_icon.png">{{expertData.companyAddress}}
          </div>

          <div class="has_relation" @click.stop="linkTo('/pages/expertDetail/index',1)" v-if="expertData.relationCount > 0">
            <img src="../../static/img/center_icon2.png">
          </div>
        </div>
      </div>
    </div>

    <div class="bottom_block" v-if="expertData.lifeAndFeelDesc">
      <div class="bottom_block_item">
        <!-- <span class="item_title">回应作答时间：</span>
        <span class="item_text">{{expertData.responseTime}}分钟内回应、{{expertData.answeringTime/60}}小时内作答</span> -->
        <span class="item_text">{{expertData.lifeAndFeelDesc}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['expertData'],
  computed:{
    ...mapState({
      i18n: state => state.counter.i18n
    })
  },
  methods:{
    linkTo(path,tab){
      this.$router.push({
        path:path,
        query:{
          id:this.expertData.id,
          tab:tab|| 0
        }
      });
    }
  },
  create(){
    console.log(this.experData);
  }

}
</script>
<style lang="less" scoped>
 .experts_item{
    // height: 183px;
    .top_block{
        //  min-height: 108px;
         min-height: 86px;
         display: flex;
        //  align-items: center;
         padding: 11px 0;
        .experts_avatar{
          margin-top: 8px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #e6e8eb; 
          margin-right: 10px;
        }
    }
    .bottom_block{
      // flex-direction: column;
      // justify-content: center;
      // align-items: flex-start;
      // height: 55px;
      height: 35px;
      .bottom_block_item{
        line-height: 1.5;
        display: flex;
        .item_title{
          color: #666;
        }
        .item_text{
          // color: #999;
          color: #666;
          // width: 260px;
          width: 340px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
