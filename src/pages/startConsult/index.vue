<template>
  <div class="container">
    <form @submit="submitOrder" :report-submit="true">
      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" :src="expertData.avatarUrl" />
          <div class="top_block_right">
            <div class="experts_msg1">
              <div class="experts_name">
                <span class="experts_nickname">{{expertData.nickName}}</span>
              </div>
            </div>
          
            <div class="experts_msg3">
              <div class="experts_location">
                {{expertData.companyPosition}}&nbsp;|&nbsp;{{expertData.companyName}}
              </div>
            </div>
          </div>
        </div>
        <div class="cost_tips">
          <!-- <span class="cost_text">￥{{expertData.oneOfCost}}</span> -->
          <span class="cost_text">￥35</span>

        </div>
      </div>

      <div class="order_form_panel">
      
        <div class="panle_block">
          <div class="block_title">{{i18n.Introduction}}</div>
          <div class="problem_content">
            <textarea
              cols="30"
              rows="10"
              v-model="orderUserDesc"
              :placeholder="i18n.LANGTYPE == 'cn_j'?'请自我介绍一下，促进相互了解。':'please enter'"
            ></textarea>
          </div>
        </div>

        <div class="panle_block nb">
          <div class="block_title">
            <span class="require_icon">*</span>
            {{i18n.query}}
          </div>
          <div class="problem_content">
            <textarea
              cols="30"
              rows="10"
              v-model="questionRemark"
              :placeholder="i18n.LANGTYPE == 'cn_j'?'请先起一个标题，然后详细描述你的问题，使专家能更有针对性地为你作答。':'please enter'"
            ></textarea>
          </div>
        </div>

        <!-- <div class="panle_block npb">
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
        </div>
        </div>-->

        <div class="agreement_block">
          <div class="agreement_title">提问须知：</div>
          <div class="agreement_content">
            <p>你提问的专家只是我们《问税易》的一名用户，和我们不存在任何雇佣或劳务关系。</p>
            <p>专家以个人身份为你提供服务，我们不参与其中。费用也不经过我们，由你直接支付专家。</p>
            <p>专家给你的作答或建意，只供参考之用。</p>
            <p>我们对专家的作答或表述均不承担任何责任。</p>
            <p>任何因采用了专家的作答或表述而产生的后果一律与我们无关。</p>
            <p>如你需要专家出具鉴证意见或提供更多其他服务，请另行与专家商议。</p>
          </div>
        </div>
      </div>

      <div class="agree_bar">
        <span
          class="custom_checkbox"
          :class="{'active':agreeRule}"
          @click="agreeRule = !agreeRule"
          style="margin-right:5px;"
        ></span>
        <span class="agree_text" @click="agreeRule = !agreeRule">阅读并同意<i @click.stop="toProtocol">《用户使用协议》</i></span>
      </div>

      <div class="btn_block">
        <button class="btn green large" form-type="submit">{{i18n.submit}}</button>
      </div>
      <div
        class="respond_tips"
      >{{i18n.LANGTYPE == 'cn_j'?'专家将在' + expertData.responseTime + '分钟内回应':'The advisor will confirm this order in ' + expertData.responseTime + ' minutes'}}</div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { API, BASE_URL } from "../../http/api.js";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      classNum: 1,
      photosList: [],
      expertData: {},
      agreeRule: true,
      questionRemark: "",
      orderUserDesc: "",
      parentOrderId: 0
    };
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },
  methods: {
    ...mapActions("counter", ["updateConsultListTab"]),

    onClassNumChange(e) {
      console.log(e.mp.detail);
    },
    linkTo(path) {
      this.$router.push(path);
    },

    getExpertMsgData() {
      let url = API["GetUserDetail"] + this.expertId;
      this.$http
        .request({
          url: url
        })
        .then(res => {
          let result = res.data;
          // result.address = result.companyAddress.split('-')[1] || result.companyAddress.split('市')[0] + '市';
          this.expertData = result;
        });
    },

    submitOrder(e) {
      if (!this.agreeRule) {
        wx.showToast({
          title:
            this.i18n.LANGTYPE == "cn_j"
              ? "请先阅读并同意用户使用协议"
              : "please read and agree to the expert's rules of use first",
          icon: "none",
          duration: 1500
        });
        return;
      }
      if (!this.questionRemark) {
        wx.showToast({
          title:
            this.i18n.LANGTYPE == "cn_j"
              ? "请填写咨询的问题"
              : "please enter query",
          icon: "none",
          duration: 1500
        });
        return;
      }

      let userFiles = [];
      if (this.photosList.length > 0) {
        this.photosList.forEach(item => {
          userFiles.push({ userId: this.userData.userId, fileUrl: item });
        });
      }

      let that = this;
      that.$http
        .request({
          url: "UserPostOrder",
          data: {
            parentOrderId: this.parentOrderId,
            userId: this.userData.userId,
            expertId: this.expertId,
            userDesc: this.orderUserDesc,
            questionRemark: this.questionRemark,
            // price: this.expertData.oneOfCost,
            price: 35,
            formId: e.mp.detail.formId
            // quantity: 1,
            // orderUserDesc: this.orderUserDesc,
            // remark: '',
            // userOrderFiles: userFiles
          },
          flyConfig: {
            method: "post"
          }
        })
        .then(res => {
          if (res.code == 1) {
            wx.showToast({
              title:
                this.i18n.LANGTYPE == "cn_j"
                  ? "订单提交成功，请等待专家回应"
                  : "Successful order submission, please wait for expert's response",
              icon: "none",
              duration: 1500
            });
            setTimeout(() => {
              this.updateConsultListTab(1);
              wx.switchTab({
                url: "/pages/consult/index"
              });
            }, 1000);
          }
        });
    },

    upLoadPhoto() {
      let that = this;
      wx.chooseImage({
        count: 5 - that.photosList.length,
        success(res) {
          that.isUploadingFile = false;
          wx.showLoading({
            title: this.i18n.uploading,
            mask: true
          });

          let tempFilePaths = res.tempFilePaths;
          let dataList = [];

          for (let i = 0; i < tempFilePaths.length; i++) {
            let dotSplit = tempFilePaths[i].split(".");
            let l = dotSplit.length;
            let suffix = dotSplit[l - 1];
            let fileName =
              +new Date() + (Math.random() * 1000).toFixed(0) + "." + suffix;
            //同步方法
            let base64 = wx
              .getFileSystemManager()
              .readFileSync(res.tempFilePaths[i], "base64");
            dataList.push({
              type: "image",
              filename: fileName,
              base64String: base64
            });
          }

          that.$http
            .request({
              url: "UploadFile",
              data: dataList,
              flyConfig: {
                method: "post"
              }
            })
            .then(result => {
              if (result.code == 1) {
                let data = result.data;
                let imgList = [];
                for (let i = 0; i < data.length; i++) {
                  if (data[i].uploadCode == 1) {
                    imgList.push(data[i].data.originalurl);
                  }
                }
                that.photosList = [...that.photosList, ...imgList];
              }
              wx.hideLoading();
            });
        }
      });
    },

    deletePhoto(index) {
      this.photosList.splice(index, 1);
    },
    toProtocol(){
      this.$router.push('/pages/userProtocol/index');
    }
  },

  onLoad(options) {
     console.log(options);
    if (this.userData == null) {
      wx.redirectTo({
        url:"/pages/login/index"
      });
    } else {
      this.parentOrderId = options.parentOrderId || 0;
      this.expertId = options.expertId;
      this.questionRemark = "";
      this.orderUserDesc = this.userData.aboutUserDesc;
      this.photosList = [];
      this.getExpertMsgData();
    }
  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
  }
};
</script>

<style lang="less">
.container {
  background-color: #fff;
  padding-bottom: 20px;
}
.btn_block {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .btn {
    width: 345px;
    height: 45px;
  }
}
.respond_tips {
  font-size: 12px;
  padding-top: 15px;
  text-align: center;
  color: #999;
}
// 专家
.experts_name {
  font-size: 16px;
  color: #333;
  .sub_position_text {
    font-size: 13px;
    margin-left: 5px;
    color: #666;
  }
}

.experts_msg2 {
  .respond_time {
    font-size: 13px;
    color: #444;
    span {
      font-weight: bold;
    }
  }
}

.experts_item {
  margin-bottom: 0;
  position: relative;
  height: 80px;
  .top_block {
    align-items: flex-start;
    height: 95px;
    .experts_avatar {
      width: 60px;
      height: 60px;
    }
    .top_block_right {
      .experts_msg1 {
        .consult_msg {
          display: flex;
          align-items: center;
          .query_icon {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
      }
    }
  }
  .cost_tips {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 16px;
    .cost_text {
      color: #1fb7b6;
    }
  }
}

.order_form_panel {
  padding: 0 15px;
  padding-bottom: 20px;
  background-color: #fff;
  font-size: 14px;
  .panle_block {
    padding: 10px 5px 20px 5px;
    border-top: 1px solid #e6e8eb;
  }
  .panle_block.npb {
    padding-bottom: 0;
  }
  .panle_block.nb {
    border-top: 0;
  }
  .block_title {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
    &.mb0 {
      margin-bottom: 0px;
    }
    span {
      font-size: 12px;
      color: #666;
      margin-left: 10px;
    }
    span.require_icon {
      font-size: 16px;
      color: #f44;
      margin-left: 0px;
      margin-right: 5px;
    }
    span.cost_text {
      font-size: 16px;
      color: #1fb7b6;
      margin-left: 10px;
    }
    span.time_text {
      font-size: 14px;
      color: #999;
      margin-left: 10px;
    }
  }

  .class_num_block {
    display: flex;
    align-items: flex-end;
    .cost_tips {
      font-size: 14px;
      margin-left: 10px;
      color: #666;
      span {
        color: #1fb7b6;
      }
    }
  }

  .problem_content {
    textarea {
      border: 1px solid #eee;
      background-color: #fefefe;
      border-radius: 4px;
      width: 100%;
      height: 100px;
      padding: 5px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    .files_group {
      padding-left: 36px;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .title {
        position: absolute;
        font-size: 14px;
        color: #666;
        left: 0;
        top: 12px;
      }
      .add_files_icon {
        width: 54px;
        height: 54px;
        margin-top: 10px;
      }
      .img_file_item {
        height: 54px;
        width: 54px;
        margin-right: 15px;
        margin-top: 10px;
        position: relative;
        .img_file {
          height: 54px;
          width: 54px;
        }
        .delete_icon {
          position: absolute;
          width: 14px;
          height: 14px;
          right: -9px;
          top: -9px;
        }
      }
      .pdf_file_item {
        width: 44px;
        padding: 4px;
        border: 1px dashed #c6c6c6;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        margin-top: 10px;
        position: relative;
        .pdf_icon {
          height: 25px;
          width: 25px;
        }
        .pdf_name {
          width: 44px;
          font-size: 12px;
          color: #999;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .delete_icon {
          position: absolute;
          width: 14px;
          height: 14px;
          right: -9px;
          top: -9px;
        }
      }
    }
  }
}

.bottom_fixed {
  justify-content: space-between;
  .icon_btns {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .icon_btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      img {
        width: 24px;
        height: 24px;
      }
      span {
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }
  .action_btn1 {
    background-color: #f3fbfb;
  }
}

.agree_bar {
  padding: 0 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  .agree_text{
    display: flex;
    align-items: center;
  }

}

.agreement_block {
  padding: 0 5px;
  .agreement_title {
    font-size: 14px;
    color: #999;
    line-height: 1.5;
  }
  .agreement_content {
    p {
      font-size: 14px;
      color: #999;
      line-height: 1.5;
    }
  }
}
</style>
