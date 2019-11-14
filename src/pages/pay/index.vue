<template>
  <div class="container">

    <div class="top_tips">
      <img src="../../../static/img/notice_icon.png">{{i18n.LANGTYPE == 'cn_j'?'请在24小时内完成支付，逾期专家可打您电话查询。':'please make payment in 24 hours following the reply.If not,the advisor may call to inquire'}}
    </div>

    <div class="order_form_panel">
      <div class="panle_block nb">
        <div class="pay_detail">
          <div class="tips1">{{i18n.LANGTYPE == 'cn_j'?'长按下方图片保存专家收款二维码直接付款给专家。':'Fee shall be paid to advisor directly via his/her WeChat QR Code'}}</div>
        </div>
        <div class="pay_QRcode_img">
            <img src="../../../static/img/pay_step1.jpg" @longtap='saveImg' mode="widthFix">
        </div>
      </div>
    
      <div class="panle_block npb">
        <div class="block_title">{{i18n.LANGTYPE == 'cn_j'?'支付操作如下':'Steps'}}</div>
       
        <div class="pay_step" v-if="i18n.LANGTYPE == 'cn_j'">
          <div class="step_text">1、保存收款二维码图片</div>
          <div class="step_sub_tetx">长按上方收款二维码图片并保存图片到相册,如需授权请点击允许</div>
          

          <div class="step_text">2、识别收款二维码</div>
          <div class="step_sub_tetx">打开微信"扫一扫"功能，从相册中选中保存的收款二维码图片</div>

          <div class="step_text">3、输入支付金额，完成支付</div>
          <div class="step_sub_tetx">在金额中输入本次咨询所需的费用金额，点击付款完成支付</div>

          <div class="step_text">4、专家确认收款</div>
          <div class="step_sub_tetx">请在作答后24小时内支付，逾时的专家可打您电话查询</div>
        </div>

        <div class="pay_step" v-else>
          <div class="step_text">1.Click below to send QR Code</div>
          <div class="step_sub_tetx">QR Code will be sent to you via our Official Account</div>
          

          <div class="step_text">2.Tab on the QR Code from our Official Account</div>
          <div class="step_sub_tetx">It contains the advisor's username and the fee amount</div>

          <div class="step_text">3.Tab (long) on the QR Code to recognize”</div>
          <div class="step_sub_tetx"> </div>

          <div class="step_text">4.Pay</div>
          <div class="step_sub_tetx">please pay in 24 hours following the reply.  If not, the advisor may call to inquire.</div>
        </div>
        <div class="pay_step_imgs">
          <img src="../../../static/img/pay_step1.jpg" alt="">
          <img src="../../../static/img/pay_step2.jpg" alt="">
          <img src="../../../static/img/pay_step3.jpg" alt="">
        </div>
      </div>
    </div>

    <!-- <div class="btn_block">
      <div class="btn green large" @click="postPayMsg">{{i18n.send_QR_Code}}</div>
    </div> -->
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
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
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

    /****长按保存图片 */
    saveImg: function () {
      let that=this
      wx.getSetting({
        success(res) {
          //未授权 先授权 然后保存
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success(re) {
                that.saveToBlum();
              }
            })
          }else{
           //已授 直接调用保存到相册方法
            that.saveToBlum();
          }
        }
      })  
    },

    //保存到相册方法
    //  saveToBlum:function(){
    //    let imgUrl = '非网络图片';
    //    wx.getImageInfo({
    //      src: imgUrl,
    //      success: function (ret) {
    //        var path = ret.path;
    //        wx.saveImageToPhotosAlbum({
    //          filePath: path,
    //          success(result) {
    //            wx.showToast({
    //              title: '保存成功',
    //              icon: 'success'
    //            })
    //          },
    //        })
    //      }
    //    })
    // },

    //保存网络图片到相册方法
    saveToBlum:function(){
      wx.downloadFile({
        url: 'https://xianchaosectrade.oss-cn-hangzhou.aliyuncs.com/online/bf7d421f5c4d4014.jpeg',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(result) {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              })
            }
          })
        }
      })
    },

  },
  onShow(){
   
  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
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
  }
  .pay_QRcode_img{
    display: flex;
    justify-content: center;
    img{
      width: 700px;

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
