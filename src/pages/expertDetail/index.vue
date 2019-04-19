<template>
  <div class="container" :class="{'m_bottom':isX}">
    <div class="experts_item">
      <div class="top_block">
        <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
        <div class="top_block_right">
          <div class="experts_msg1">
            <div class="experts_name">朱两边<span class="status">营业中</span></div>
            <span class="consult_msg">10人已关注</span>
          </div>
          <div class="experts_msg2">
            <span class="respond_time"><span>5</span>分钟内回应，<span>12</span>小时内作答</span>
            <span class="order_num">20人已咨询</span>
          </div>
          <div class="experts_msg3">
            <div class="experts_location">
              <img src="../../../static/img/location_icon.png">杭州
            </div>
            <span class="devide_line"></span>
            <div class="experts_experience">
              <img src="../../../static/img/time_icon.png">3-5年从业经验
            </div>
          </div>
        
        </div>
      </div>
      
    </div>
    <div class="custom_tabs">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">专业信息</div>
      <div class="tab_item" :class="{'active':currentTab == 1}" @click="changeTab(1)">介绍信息</div>
      <div class="tab_item" :class="{'active':currentTab == 2}" @click="changeTab(2)">关系户评价(2)</div>
      <span class="active_bar" :class="{'active1':currentTab == 1,'active2':currentTab == 2}"></span>
    </div>

  

    <div class="introduce_panel" v-show="currentTab == 0">
      <div class="panle_block">
         <div class="base_msg">
          <span class="msg_name">担任职位</span>
          <span class="msg_content">前所得税副处</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">任职企业</span>
          <span class="msg_content">杭州市税局大企业处</span>
        </div>
        <div class="base_msg">
          <span class="msg_name">工作年限</span>
          <span class="msg_content">20年</span>
        </div>
      </div>
      <div class="panle_block">
        <!-- <div class="block_title">领域与擅长业务</div> -->
        <div class="base_msg">
           <span class="msg_name">领域</span>
           <span class="msg_content">企业所得税、金融企业、出口退税、行政复议</span>
        </div>
     
        <div class="base_msg">
           <span class="msg_name">擅长业务</span>
           <span class="msg_content">税收检查应对、发票风险管理实务、转攻房地产税务难题</span>
        </div>
      </div>
      
       <div class="panle_block nb">
        <div class="block_title">专业见解</div>
        <div class="block_content">7号公告对美元基金的影响...</div>
      </div>
    </div>
    <div class="introduce_panel" v-show="currentTab == 1">

      <div class="panle_block">
        <div class="block_title">自我介绍</div>
        <div class="block_content">朱先生，是美国南太平洋大学的博士，现任中国葛洲坝集团国际工程有限公司的税务专家 (集团全球税务负责人）。他是经济学硕士（税务专业）、工商管理博士（税务方向），高级经济师，中国注册税务师，国家税务总局《中国税网》 税务专家顾问。</div>
      </div>

      <div class="panle_block">
        <div class="block_title">相关照片</div>
        <div class="block_content">
          <img class="intro_img"  v-for="(item,index) in imgUrls" :src="item" :key="index" @click="showImgSwiper(index)">

        </div>
      </div>
     

      <div class="panle_block nb">
        <div class="block_title">作品链接</div>
        <div class="base_msg no_name">
           <span class="msg_name"></span>
           <span class="msg_content">《作品一名称》</span>
        </div>
        <div class="base_msg no_name">
           <span class="msg_name"></span>
           <span class="msg_content">《作品二名称》</span>
        </div>
        <div class="base_msg no_name">
           <span class="msg_name"></span>
           <span class="msg_content">《作品三名称》</span>
        </div>
      </div>
      
    </div>

    <div class="comment_panel" v-show="currentTab == 2">
      <div class="comment_item">
        <img class="user_avatar" src="../../../static/img/avatar.jpeg">
        <div class="comment_content">
          <div class="content_top">
             <span class="user_name">王小花</span>
             <span class="comment_time">2019-02-08 15:00:32</span>
          </div>
          <div class="comment_text">
            张老师回答得不错哦，给个赞呢
          </div>
          <div class="comment_tags">
            <span class="tag_item">值得推荐</span>
            <span class="tag_item">将会再次咨询</span>
            <span class="tag_item">专业</span>
          </div>
        </div>
      </div>

      <div class="comment_item">
        <img class="user_avatar" src="../../../static/img/avatar.jpeg">
        <div class="comment_content">
          <div class="content_top">
             <span class="user_name">王小花</span>
             <span class="comment_time">2019-02-08 15:00:32</span>
          </div>
          <div class="comment_text">
            张老师回答得不错哦，给个赞呢
          </div>
          <div class="comment_tags">
            <span class="tag_item">值得推荐</span>
            <span class="tag_item">将会再次咨询</span>
            <span class="tag_item">专业</span>
          </div>
        </div>
      </div>
    </div>

    <div class="to_chat_btn" @click="toChatRoom" :class="{'m_top':isX}">
        <img class="bounceIn" src="../../../static/img/chat_circle_icon.png">
    </div>
    <div class="bottom_fixed" :class="{'isX':isX}">
      <div class="icon_btns">
        <div class="icon_btn" v-if="!collected" @click="collected = true">
          <img src="../../../static/img/collect_icon.png">
          <span>关注</span>
        </div>

        <div class="icon_btn" v-if="collected" @click="collected = false">
          <img src="../../../static/img/collect_icon2.png">
          <span style="color:#1fb7b6;">收藏</span>
        </div>

        <button open-type="share" class="icon_btn btn_reset">
          <img src="../../../static/img/share_icon.png">
          <span>分享</span>
        </button>
      </div>
       <span class="action_btn1" @click="toContact">马上咨询&nbsp;￥40</span>
    </div>

    <van-action-sheet
      :show="actionSheetShow"
      :actions="actions"
      @close="onCloseActionSheet"
      @select="onSelectAction"
    />
    
    <swiper class="imgs_swiper"
      v-if="imgSwiperShow"
      :indicator-dots="true"
      :current="swiperCurrent"
      :autoplay="false"
      :duration="1000"
      indicator-color="rgba(255,255,255,0.6)"
      indicator-active-color="#fff"
    >

      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item class="img_item" @click="imgSwiperShow = false">
          <image :src="item" mode="widthFix" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      currentTab:0,
      collected:false,
      actionSheetShow:false,
      actions:[
        {
          targetId:1,
          name: '在线问答',
          subname: '￥40',
        },
        {
          targetId:2,
          name: '电话约谈',
          subname: '￥40/15分钟',
        },
        {
          targetId:3,
          name: '咨询疑问'
        }
      ],
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      ],
      imgSwiperShow: false,
  

      swiperCurrent:2,
    }
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX
    })
  },
  mounted(){

  },
  onShareAppMessage(obj){
      console.log(obj);
      return {
        title:'分享测试',
        path:'/pages/expertCard/index?mineId=2019&uId=2018',
      }
  },
  methods: {
    ...mapActions('counter', [
      'increment',
      'decrement',
      'getProvince'
    ]),
    linkTo(path){
      this.$router.push(path);
    },
    changeTab(num){
      if(this.currentTab == num){
        return;
      }
      this.currentTab = num;
    },
    toContact(){
      // this.actionSheetShow = true;
      this.$router.push({path:'/pages/startConsult/index'});
    },
    onCloseActionSheet(){
       this.actionSheetShow = false;
    },
    onSelectAction(data){
      if(data.mp.detail.targetId == 1){
        
      }else if(data.mp.detail.targetId == 2){
        
      }else{

      };
      this.actionSheetShow = false;
    },
    toChatRoom(){
      this.$router.push({path:'/pages/chatRoom/index',query:{id:1}})
    },
    showImgSwiper(index){

      this.swiperCurrent = index;
      this.imgSwiperShow = true;
    }
  },
  onShow(){
    this.currentTab = 0;
  }
}
</script>

<style lang="less">
.container{
  padding-bottom: 50px;
  &.m_bottom{
    padding-bottom: 82px;
  }
}
.experts_item{
  margin-bottom: 0;
}

.introduce_panel{
    padding:0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  .panle_block{
    padding:20px 15px;
    border-bottom: 1px solid #e6e8eb;
  }
  .panle_block.nb{
    border-bottom: 0;
  }
  .block_title{
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-bottom: 17px;
  }
  .base_msg{
    font-size: 13px;
    min-height: 20px;
    color: #777;
    display: flex;
    &+.base_msg{
      margin-top: 8px;
    }
   
    .msg_name{
       position: relative;
       padding-left: 12px;
       width: 64px;
    }
    &.no_name{
      .msg_name{
        width: 0px;
      }
      .msg_content{
        margin-left: 5px;
      }
    }
    .msg_name::before{
      content:'';
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #999;
      position: absolute;
      left: 0;
      top:6px;
    }
    .msg_content{
      flex: 1;
      margin-left: 10px;
      color: #333;
    }
  }
  .block_content{
     font-size: 13px;
     color: #777;
     .intro_img{
       width: 50px;
       height: 50px;
       margin-left: 5px;
     }
  }
}
.comment_panel{
  .comment_item{
    background-color: #fff;
    padding:15px;
    display: flex;
    margin-bottom: 5px;
    .user_avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border:3px solid #e6e8eb;
      margin-right: 15px;
    }
    .comment_content{
      font-size: 13px;
      flex: 1;
      .content_top{
        display: flex;
        justify-content: space-between;
        .user_name{
          font-size: 14px;
          color: #333;
        }
        .comment_time{
          font-size: 13px;
          color: #999;
        }
      }
      .comment_text{
        margin-top: 10px;
        font-size: 13px;
        line-height: 1.5;
        color: #666;
      }
      .comment_tags{
        display: flex;
        flex-wrap: wrap;
        .tag_item{
          margin-right: 10px;
          margin-top: 10px;
          font-size: 12px;
          height: 18px;
          display: flex;
          align-items: center;
          padding:0 10px;
          color: #999;
          border:1px solid #999;
          border-radius: 10px;
        }
      }
    }
  }
}
.bottom_fixed{
  justify-content: space-between;
  .icon_btns{
    margin-left: 20px;
    display: flex;
    align-items: center;
    .icon_btn{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      img{
        width: 24px;
        height: 24px;
      }
      span{
        font-size: 12px;
        margin-top: 2px;
        line-height: 1.5;
      }
    }
    

  }
}



// 专家列表
.experts_name{
  font-size: 16px;
  color: #333;
  span{
    font-size: 13px;
    margin-left: 5px;
    color: #666;
  }
}
.experts_msg2{
  .respond_time{
    font-size: 13px;
    color: #444;
    span{
      font-weight: bold;
    }
  }
}
.to_chat_btn{
  position: fixed;
  bottom: 60px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px solid #1fb7b6;
  background-color: #f3fbfb;
  &.m_top{
    bottom: 92px;
  }
  img{
    width: 22px;
    height: 22px;
  }
}
// .imgs_swiper{
//   position: fixed;
//   top:0;
//   left: 0;
//   background-color: #000;
//   z-index: 9;
//   height: 100%;
//   width: 100%;

//   .img_item{
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     image{
//       width: 375px;
//     }

//   }

// }

 
</style>
