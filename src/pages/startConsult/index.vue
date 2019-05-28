<template>
  <div class="container">
    <div class="experts_item">
      <div class="top_block">
        <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
        <div class="top_block_right">
          <div class="experts_msg1">
            <div class="experts_name">朱两边<span class="sub_position_text">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span></div>
            <!-- <span class="consult_msg"><img class="query_icon" src="../../../static/img/query_icon.png">咨询流程</span> -->
          </div>
          <div class="experts_msg2">
            <span class="respond_time"><span>5</span>分钟内回应，<span>12</span>小时内作答</span>
          </div>
          <div class="experts_msg3">
            <div class="experts_location">
              <img src="../../../static/img/location_icon.png">杭州
            </div>
            <span class="devide_line"></span>
            <div class="experts_experience">
              <img src="../../../static/img/time_icon.png">20年工作经验
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="order_form_panel">
      <div class="panle_block">
        <div class="block_title mb0">预计费用&nbsp;<span class="cost_text">40</span>&nbsp;元</div>

        <!-- <div class="class_num_block">
          <van-stepper
            :value="classNum"
            integer
            min="1"
            max="99"
            step="1"
            @change="onClassNumChange"
          />
          <div class="cost_tips">
            预计费用<span>{{40*classNum}}</span>元
          </div>
        </div> -->
      </div>
      <div class="panle_block">
        <div class="block_title"><span class="require_icon">*</span>问题内容</div>
        <div class="problem_content">
          <textarea  cols="30" rows="10" placeholder="请输入咨询问题内容"></textarea>
        </div>
      </div>
      <div class="panle_block">
        <div class="block_title">其他介绍</div>
        <div class="problem_content">
          <textarea  cols="30" rows="10" placeholder="可填写相关介绍一下，例如您的自我介绍信息，让专家更了解您或您的问题。"></textarea>
        </div>
      </div>
      <div class="panle_block npb">
        <div class="block_title">问题附件</div>
        <div class="problem_content">
          
          <div class="files_group">
              <div class="title">图片</div>
              <div class="img_file_item" v-for="(item,index) in photosList" :key="index">
                <img class="img_file" :src="item">
                <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePhoto(index)">
              </div>
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png" v-show="photosList.length < 5" @click="upLoadPhoto">
          </div>

          <!-- <div class="files_group" style="padding-top: 15px;">
             <span class="title" style="top:22px;">文件</span>
              <div class="pdf_file_item">
               <img class="pdf_icon" src="../../../static/img/pdf_icon.png" alt="">
               <div class="pdf_name">文件名称文件名称文件名称文件名称</div>
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" alt="">
              </div>
             <img  class="add_files_icon" src="../../../static/img/add_files_icon.png">
          </div> -->
        </div>
      </div>
    </div>

    <div class="agree_bar">
      <span class="custom_checkbox active" style="margin-right:20px;">阅读并同意专家的使用规则</span>
    </div>

    <div class="btn_block">
      <div class="btn green large" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      classNum:1,
      photosList:[],
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  mounted(){

  },
  methods: {
    ...mapActions('counter', [
      'updateConsultListTab'
    ]),
  
    onClassNumChange(e){
      console.log(e.mp.detail);
    },
    linkTo(path){
      this.$router.push(path);
    },
    submitOrder(){
      // 控制咨询列表页Tab
      // this.updateConsultListTab(1);
      wx.switchTab({
        url: '/pages/consult/index'
      });
      let that = this;
      that.$http.request({
        url:'CreateOrder',
        data: {
          parentOrderId: 0,
          userId: this.userData.userId,
          expertId: this.expertId,
          questionRemark: "string",
          price: 0,
          quantity: 1,
          orderUserName: "string",
          orderUserCompany: "string",
          orderUserCompanyPosition: "string",
          orderUserCompanyBusiness: "string",
          remark: "string"
        },
        flyConfig:{
          headers:{
            'content-type': 'application/x-www-form-urlencoded',
          },
          method: 'post'
        }
      }).then(res => {
     
      })
    },
    upLoadPhoto(){
      let that = this;
      wx.chooseImage({
        count: 5 - that.photosList.length,
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          that.photosList = [...that.photosList,...res.tempFilePaths];
          console.log(res);
        }
      })
    },

    deletePhoto(index){
      this.photosList.splice(index,1);
    },
  },

  onLoad(options){
    this.expertId = options.expertId;
  },
}
</script>

<style lang="less">
.container{
  background-color: #fff;
  padding-bottom: 20px;
}
.btn_block{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .btn{
    width: 345px;
    height: 45px;
  }
}

// 专家
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

.experts_item{
  margin-bottom: 0;
  .top_block{
    align-items: flex-start;
    height: 95px;
    .experts_avatar{
      width: 60px;
      height: 60px;
    }
    .top_block_right{
      .experts_msg1{
        .consult_msg{
          display: flex;
          align-items: center;
          .query_icon{
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
      }
    }
  }
}

.order_form_panel{
    padding:0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  .panle_block{
    padding:10px 5px 20px 5px;
    border-top: 1px solid #e6e8eb;
  }
  .panle_block.npb{
    padding-bottom: 0;
  }
  .panle_block.nb{
    border-top: 0;
  }
  .block_title{
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
    &.mb0{
      margin-bottom: 0px;
    }
    span{
      font-size: 12px;
      color: #666;
      margin-left: 10px;
    }
    span.require_icon{
      font-size: 16px;
      color: #f44;
      margin-left: 0px;
      margin-right: 5px;
    }
    span.cost_text{
      font-size: 16px;
      color: #1fb7b6;
      margin-left: 10px;
    }
    span.time_text{
      font-size: 14px;
      color: #999;
      margin-left: 10px;
    }
  }

  .class_num_block{
    display: flex;
    align-items: flex-end;
    .cost_tips{
      font-size: 14px;
      margin-left: 10px;
      color: #666;
      span{
        color: #1fb7b6;
      }
    }
  }

  .problem_content{
    textarea{
      border:1px solid #eee;
      background-color: #fefefe;
      border-radius: 4px;
      width: 100%;
      height: 100px;
      padding:12px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    .files_group{
      padding-left: 36px;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .title{
        position: absolute;
        font-size: 14px;
        color: #666;
        left: 0;
        top:12px;
      }
      .add_files_icon{
        width: 54px;
        height: 54px;
        margin-top: 10px;
      }
      .img_file_item{
        height: 54px;
        width: 54px;
        margin-right: 15px;
        margin-top: 10px;
        position: relative;
        .img_file{
          height: 54px;
          width: 54px;
        }
        .delete_icon{
          position: absolute;
          width: 14px;
          height: 14px;
          right: -9px;
          top:-9px;
        }
      }
      .pdf_file_item{
        width: 44px;
        padding:4px;
        border:1px dashed #c6c6c6;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        margin-top: 10px;
        position: relative;
        .pdf_icon{
          height: 25px;
          width: 25px;
        }
        .pdf_name{
          width: 44px;
          font-size: 12px;
          color: #999;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .delete_icon{
          position: absolute;
          width: 14px;
          height: 14px;
          right: -9px;
          top:-9px;
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
      }
    }
    

  }
  .action_btn1{
    background-color: #f3fbfb;

  }

}

.agree_bar{
  padding-left: 20px;
  margin-top: 10px;
}
</style>
