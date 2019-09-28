<template>
  <div>
    <div class="expert_card_block" v-if="expertData">
      <img class="bg_img" src="../../../static/img/center_bg.png">
     
      <div class="card_panel">
        <div class="top">
          <div class="top_left">
            <img class="expert_avatar" :src="expertData.avatarUrl" v-if="expertData.avatarUrl">
            <img class="expert_avatar" v-else src="../../../static/img/df_avatar.jpg">
            <span class="expert_name">{{expertData.nickName}}</span>
            <div class="expert_location">
              <img src="../../../static/img/location_icon.png">
              <span>{{expertData.address}}</span>
            </div>
          </div>
          <div class="top_right">
            <div class="msg_item">
              <span class="item_name">从事专业：</span>
              <span class="item_content">{{expertData.major}}</span>
            </div>
              <div class="msg_item">
              <span class="item_name">从业年限：</span>
              <span class="item_content">{{expertData.majorYearsDesc}}</span>
            </div>
            <div class="msg_item">
              <span class="item_name">擅长领域：</span>
              <span class="item_content">{{expertData.businessArea}}</span>
            </div>
            <div class="msg_item nmb">
              <span class="item_name">专家介绍：</span>
            </div>
            <div class="expret_intro">{{expertData.aboutUserDesc}}</div>
            
            
          </div>
        </div>
        <div class="bottom">
          <div class="action_btn" @click="linkTo('/pages/expertDetail/index?id=' + expertId)">查看专家详情</div>
          <div class="action_btn2" @click="toIndex">进入咨询堂</div>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {API, BASE_URL} from  '../../http/api.js'
export default {
  computed: {
    ...mapState({
      i18n: state => state.counter.i18n      
    })
  },
  data(){
    return {
      userId:'',
      expertId:'',
      expertData:null
    }

  },
  mounted(){

  },
  onLoad(options){
    this.userId = options.userId;
    this.expertId = options.expertId;
    this.getExpertData()
  },
  methods: {
    ...mapActions('counter', [
     
    ]),
    toIndex(){
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    linkTo(path){
      this.$router.push(path);
    },
    getExpertData(){
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      let url = API['GetUserDetail'] + this.expertId;
      this.$http.request({
        url:url,
      }).then(res => {
        let expertData = {};
        let result = res.data;
        expertData.avatarUrl = result.avatarUrl;
        expertData.nickName = result.nickName;
        expertData.address = result.companyAddress.split('-')[1] || result.companyAddress.split('市')[0] + '市';
        expertData.companyPosition = result.companyPosition;
        expertData.aboutUserDesc = result.aboutUserDesc;
        expertData.gootAtList = result.goodAtBusiness.split('|zxt|').join('、');
        let outLink = result.outLink.split('|zxt|');
        expertData.major = result.major;
        expertData.majorYearsDesc = result.majorYearsDesc;
        expertData.businessArea = result.businessArea.split('|zxt|').join('、');
        this.expertData = expertData;
        wx.hideLoading();
      })
    }
  }
}
</script>

<style lang="less">
.expert_card_block {
  height: 207px;
  font-size: 14px;
  position: relative;
  .bg_img{
    width: 375px;
    height: 207px;
  }
  .card_panel{
    position: absolute;
    width: 345px;
    top: 100px;
    left: 15px;
    background-color: #fff;
    border-radius: 5px;
    .top{
      padding: 20px 15px;
      padding-bottom: 10px;
      display: flex;
      // align-items: center;
      .top_left{
         display: flex;
         flex-direction: column;
         align-items: center;
          margin-right: 15px;
        .expert_avatar{
          width: 60px;
          height: 60px;
          border-radius: 33px;
          border:3px solid #e6e8eb; 
        }
        .expert_name{
          margin-top: 15px;
          font-size: 16px;
        }
        .expert_location{
          margin-top: 10px;
          display: flex;
          align-items: center;
          img{
            width: 16px;
            height: 16px;
          }
          span{
            color: #666;
            margin-left: 5px;
          }
        }

      }
      .top_right{
        font-size: 14px;
        padding-left: 18px;

        position: relative;
        &::before{
          content: '';
          position: absolute;
          width: 1px;
          height: 80px;
          background-color: #e6e8eb;
          left: 0;
          top: 4px;
        }
        .msg_item{
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          &.nmb{
            margin-bottom: 4px;
          }
          .item_icon{
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
          .item_name{
            margin-right: 5px;
            color: #333;
          }
          .item_content{
            color: #666;
            flex: 1;
            max-width: 140px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          
        }
        .expret_intro{
           color: #666;
        }
      }

    }
    .bottom{
      padding:15px;
      display: flex;
      justify-content: flex-end;
      background-color: #f3fbfb;
      border-radius: 0 0 5px 5px;
      .action_btn{
        height: 28px;
        padding:0 10px;
        border-radius: 4px;
        color: #fff;
        background-color: #1fb7b6;
        border: 1px solid #1fb7b6;
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
      .action_btn2{
        height: 28px;
        padding:0 10px;
        border-radius: 4px;
        color: #1fb7b6;
        background-color: #f3fbfb;
        border: 1px solid #1fb7b6;
        display: flex;
        align-items: center;  
        margin-left: 10px;
      }

    }
  }
}
</style>
