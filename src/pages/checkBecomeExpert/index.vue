<template>
  <div class="container">
    <div class="experts_list" v-if="expertsList.length > 0">
      <expert v-for="(item,index) in expertsList" :key="index" :expert-data="item"></expert>
    </div>

    <div class="no_data_tips" v-if="expertsList.length == 0 && !isLoading">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>{{i18n.No_relevant_data}}</span>
    </div> 
  </div>
</template>
<script>
import expert from '@/components/expert'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed:{
  },
  components: {
    expert
  },

  methods: {

    // 获取专家列表
    getAllExperts () {
      let that = this;
      that.isLoading = true;
      if(!this.major){
        this.major = '税务';
      };
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
        wx.stopPullDownRefresh();
        if(res.data.length == 0){
          that.isNomore = true;
        }else{
          res.data.forEach(item => {
            item.companyAddress = item.companyAddress ? item.companyAddress.split('-')[1] :'未知';
          });
        }
        if(that.pageIndex == 0){
          that.expertsList = [...res.data];
        }else{
          that.expertsList = [...that.expertsList,...res.data];
        }
     
      })
    }
  },
  onPageScroll() {

  },
  onShow(){

  },
  created () {
    
  },
   onPullDownRefresh () {
       
    wx.stopPullDownRefresh();
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