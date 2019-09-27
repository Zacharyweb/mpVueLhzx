<template>
  <div class="container">

    <div class="top_tips">
      <img src="../../../static/img/notice_icon.png">请在24小时内完成支付，逾期专家可打您电话查询。
    </div>

    <div class="order_form_panel">
      <div class="panle_block nb">
        <div class="block_title">结算信息</div>
        <div class="pay_detail">
          <div class="tips1">专家已为您完成作答，订单结算如下：</div>
          <ul class="detail_list">
            <li class="detail_item">
              <span class="item_name">费用：</span>
              <span class="item_content">{{amount}}元/次</span>
            </li>
            <li class="detail_item">
              <span class="item_name">次数：</span>
              <span class="item_content">{{quantity}}次</span>
            </li>
            <li class="detail_item">
              <span class="item_name">合计：</span>
              <span class="item_content">{{amount}}元</span>
            </li>
          </ul>
          <div class="tips2">咨询费将由用户通过二维码直接支付给专家。</div>
        </div>
      </div>
    
      <div class="panle_block npb">
        <div class="block_title">支付操作如下</div>
        <!-- <div class="problem_content">
          <div class="files_group">
            <span class="title">转账截图</span>
            <div class="img_file_item"  v-for="(item,index) in photosList" :key="index">
              <img class="img_file" :src="item">
              <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePhoto(index)">
            </div>
            <img class="add_files_icon" src="../../../static/img/add_files_icon.png"  v-show="photosList.length < 1" @click="upLoadPhoto">

          </div>
        </div> -->
        <div class="pay_step">
          <div class="step_text">1、点击下面“获取付款二维码”按钮</div>
          <div class="step_sub_tetx">二维码将通过平台的公众号发送给您</div>
          

          <div class="step_text">2、从公众号消息打开二维码</div>
          <div class="step_sub_tetx">上面注有专家的昵称和咨询费金额</div>

          <div class="step_text">3、长按二维码选择“识别图中二维码”</div>
          <div class="step_sub_tetx"> </div>

          <div class="step_text">4、支付</div>
          <div class="step_sub_tetx">请在作答后24小时内支付，逾时的专家可打您电话查询</div>
        </div>
        <div class="pay_step_imgs">
          <img src="../../../static/img/pay_step1.jpg" alt="">
          <img src="../../../static/img/pay_step2.jpg" alt="">
          <img src="../../../static/img/pay_step3.jpg" alt="">
        </div>
      </div>
    </div>

    <div class="btn_block">
      <div class="btn green large" @click="postPayMsg">获取付款二维码</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      orderId:0,
      amount:0,
      price:'',
      quantity:'',
      photosList:[]
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  mounted(){
       
  },
  onLoad(options){
    this.orderId = options.orderId;
    this.price = options.price;
    this.amount = options.amount;
    this.quantity = options.quantity || 1;
    // this.postPayMsg();
  },
  methods: {
    postPayMsg(){
      this.$http.request({
        url:'UserPaying',
        data:this.orderId,
        flyConfig:{
          method: 'post'
        }
      }).then(result => {
        if(res.code == 1){
          Dialog.alert({
            title: '提示',
            message: '收款码已发送，请通过公众号查收',
            confirmButtonText:'我知道了'
          }).then(() => {
             this.$router.go(-1);
          });
        }
      })
    },
    upLoadPhoto(){
      let that = this;
      wx.chooseImage({
        count: 1 - that.photosList.length,
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

    submitPhoto(){
      if(this.photosList.length == 0){
        this.showToast('请上传支付凭证');
        return;
      };
      let userFiles  = [];
      if(this.photosList.length > 0){
         this.photosList.forEach((item)=>{
           userFiles.push({userId:this.userData.userId,orderId: this.orderId,fileUrl:item})
         })
      }


      this.$http.request({
        url:'PaymentVoucher',
        data:  {
          userId: this.userData.userId,
          orderId: this.orderId,
          fileUrl: userFiles
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
            this.showToast('提交成功，请等待专家确认');
            setTimeout(()=>{
              this.$router.go(-1);
            },1500)
        } 
      })

    },
   
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
  justify-content: center;
  .btn{
    width: 345px;
    height: 45px;
  }
}

.top_tips{
  background-color: #f3fbfb;
  height: 28px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding:0 15px;
  color: #1fb7b6;
  img{
    margin-right: 10px;
    width: 16px;
    height: 16px;
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
    span{
      font-size: 12px;
      color: #666;
      margin-left: 10px;
    }
  }
  .pay_detail{
    font-size: 14px;
    color: #333;
    .tips1{
      margin-bottom: 10px;

    }
    .detail_list{
      .detail_item{
        display: flex;
         margin-bottom: 8px;
      
        .item_name{
         width: 45px;
        }
        .item_content{
          margin-left: 5px;

        }

      }
    }
    .tips2{
      margin-top: 10px;
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
      padding:15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    .files_group{
      padding-left: 65px;
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
.pay_step{
  
  .step_text{
    font-size: 13px;
    color: #333;
    margin-bottom: 2px;
  }
  .step_sub_tetx{
    font-size: 12px;
    color: #999;
    margin-bottom: 15px;
    padding-left: 19px;
  }
}
.pay_step_imgs{
  display: flex;
  justify-content: space-between;
  img{
    width: 100px;
    height: 177px;
  }
}

</style>
