<template>
  <div class="container">

    <div class="order_form_panel">
     <div class="order_base_msg">
        <div class="order_no"><span>订单号：</span>{{orderData.orderNo}}</div>
        <div class="order_status">
          <span class="status">待作答</span>
        </div>
      </div>
  
      <div class="orders_list">
        <div class="order_item">
          <div class="top_block">
            <img class="experts_avatar" :src="orderData.userAvataUrl">
            <div class="top_block_right">
              <div class="order_msg1">
                <div class="experts_name">{{orderData.userNickName}}</div>
              </div>
              <div class="order_msg2">
                  <div class="experts_work_msg">
                   <span>{{orderData.userDesc}}</span>
                  </div>
              </div>
              <span class="cost_amount">{{orderData.amount}}元</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题详情：</span>{{orderData.questionRemark}}
          </div>
        
          <div class="order_time">提问时间：{{orderData.creationTime}}</div>
        </div>

      <div class="panle_block nb">
        <div class="block_title">作答内容</div>
        <div class="problem_content">
          <textarea  maxlength="2000" placeholder="请输入作答内容" v-model="answer"></textarea>
        </div>
      </div>
      <!-- <div class="panle_block npb">
        <div class="block_title">图片附件</div>
        <div class="problem_content">
          <div class="files_group">
              <div class="title">图片</div>
              <div class="img_file_item"  v-for="(item,index) in photosList" :key="index">
                <img class="img_file" :src="item">
                <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePhoto(index)">
              </div>
              <img class="add_files_icon" src="../../../static/img/add_files_icon.png"  v-show="photosList.length < 5" @click="upLoadPhoto">
          </div>
        </div>
      </div> -->
    </div>

    <div class="btn_block">
      <!-- <div class="btn green plain">保存</div> -->
      <div class="btn green" @click="submitAnswer">提交作答</div>
    </div>
     <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Dialog from '../../../static/vant/dialog/dialog';
import {API, BASE_URL} from  '../../http/api.js';
export default {
  data(){
    return{
      orderId:0,
      answer:'',
      amount:'',
      photosList:[],
      orderNo:'',
      orderData:''
     
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
    upLoadPhoto(){
      let that = this;
      wx.chooseImage({
        count: 5 - that.photosList.length,
        success(res) {
          wx.showLoading({
            title: '图片上传中',
            mask: true
          })

          let tempFilePaths = res.tempFilePaths;
          let dataList = [];

          for(let i = 0;i < tempFilePaths.length; i++){
            let dotSplit = tempFilePaths[i].split('.');
            let l = dotSplit.length;
            let suffix = dotSplit[l-1];
            let fileName = (+new Date()) + (Math.random()*1000).toFixed(0) + '.'+ suffix;
            //同步方法
            let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], 'base64');
            dataList.push({ type: "image",filename: fileName,base64String: base64 })
          }
 
          that.$http.request({
            url:'UploadFile',
            data:dataList,
            flyConfig:{
              method: 'post'
            }
          }).then(result => {
            if(result.code == 1){
              let data = result.data;
              let imgList = [];
              for(let i = 0;i < data.length; i++){
                if(data[i].uploadCode == 1){
                   imgList.push(data[i].data.originalurl);
                }
              }
              that.photosList = [...that.photosList,...imgList];
            }
           
            wx.hideLoading();
          })
        }
      });
    },

    deletePhoto(index){
      this.photosList.splice(index,1);
    },
    submitAnswer(){
      if(!this.answer){
        this.showToast('请填写作答内容');
        return;
      };
      let userFiles  = [];

      if(this.photosList.length > 0){
        this.photosList.forEach((item)=>{
          userFiles.push({userId:this.userData.userId,fileUrl:item,orderId:this.orderId})
        })
      };

      Dialog.confirm({
        title: '确认提交',
        message: '确认提交作答内容',
      }).then(() => {
        this.$http.request({
          url:'ExpertAnswer',
          data: {
            orderId: this.orderId,
            questionAnswerText:this.answer,
            answerFiles:userFiles
          },
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
           this.chooseIfFreeOrder()
        })
      });
    },

    chooseIfFreeOrder(){
      Dialog.confirm({
        title: '谢谢作答！',
        message: '本次咨询费'+ this.amount +'元',
        confirmButtonText:'去收款',
        cancelButtonText:'给免单'
      }).then(() => {
         this.noFreeOrder();
      }).catch(() => {
        Dialog.confirm({
          title: '提示',
          message: '确认免除本次咨询费'+ this.amount +'元',
          cancelButtonText:'取消',
          confirmButtonText:'确定'
        }).then(() => {
          this.freeOrder()
        });
      });
    },
    noFreeOrder(){
        let url = API['ExpertAskingForMoney'] + this.orderId;
        // 免单接口
        this.$http.request({
          url:url,
          flyConfig:{
            // method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            Dialog.alert({
              title: '提示',
              message: '已通知用户支付，请在24小时内查看微信收款确认到账',
              confirmButtonText:'我知道了'
            }).then(() => {
               this.$router.go(-1);
            });
          }
        });
    },
    freeOrder(){
      let url = API['ExpertFreeOrder'] + this.orderId;
      // 免单接口
      this.$http.request({
        url:url,
        flyConfig:{
          // method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          Dialog.alert({
            title: '免单成功！',
            message: '已通知客户',
            confirmButtonText:'我知道了'
          }).then(() => {
             this.$router.go(-1);
          });
        }
      });
    },


  },

  onLoad(options){
    this.orderId = options.orderId*1;
    this.amount = options.amount;
    this.answer = '';
    this.photosList = [];
    this.orderData = wx.getStorageSync('orderData');
    console.log(this.orderData)
 
  },
  onShow(){

 
  }
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
  justify-content: flex-end;
  padding-right: 15px;
  .btn{
    width: 80px;
    height: 32px;
    margin-left: 10px;
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
    // border-top: 0;
    margin-top: 10px;
  }
  .block_title{
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
    span{
      font-size: 12px;
      color: #666;
      margin-left: 10px;
    }
  }

  .problem_content{
    textarea{
      border:1px solid #eee;
      background-color: #fefefe;
      border-radius: 4px;
      width: 100%;
      height: 120px;
      padding:10px;
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
    }
  }
}
  .order_base_msg{
    padding:15px;
    background-color:#fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f5f7;
    .order_no{
      span{
        font-size: 14px;
      }
      font-size: 12px;
      color: #666;
    }
    .order_status{
       display: flex;
       align-items: center;
       .time_count{
         font-size: 14px;
         color: #333;
         margin-right: 10px;
       }
      .status{
        font-size: 14px;
        color:#1fb7b6;
      }
      .status.grey{
        color: #ccc;
      }
      .status.red{
        // color: #e96900;
        color: #fa3200;
      }
      .status.blue{
        color: #2d8cf0;
      }
    }
  }
  .btn_bottom_tips{
    font-size: 12px;
    color: #666;
    text-align: center;
  }
  .order_time{
    text-align: right;
    color: #999;
    margin-top: 5px;
    font-size: 12px;
    padding-right: 10px;
  }
</style>
