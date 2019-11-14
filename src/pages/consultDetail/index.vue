<template>
  <div class="container">
    <div class="order_base_msg">
      <div class="order_no"><span>{{i18n.orderNo}}：</span>{{orderData.orderNo}}</div>
      <div class="order_status">
        <!-- <span class="time_count" v-show="showCount">{{hh}}:{{mm}}:{{ss}}</span> -->
        <span class="status" v-if="orderData.status == 0">{{i18n.to_be_confirmed}}</span>
        <span class="status" v-if="orderData.status == 1">{{i18n.to_be_reconfirmed}}</span>
        <span class="status" v-if="orderData.status == 2">{{i18n.to_be_answer}}</span>   
        <span class="status" v-if="orderData.status == 4">{{i18n.to_be_paid}}</span>
        <span class="status" v-if="orderData.status == 6">{{i18n.to_be_receipt}}</span> 
        <span class="status" v-if="orderData.status == 7">{{i18n.completed}}</span>
        <span class="status red" v-if="orderData.status == 8">{{i18n.to_be_resolved}}</span>   
        <span class="status grey" v-if="orderData.status == 9">{{i18n.closed}}</span> 
        <!-- <span class="status grey" v-if="orderData.status == -1">已取消</span> -->
      </div>
    </div>

    <div class="orders_list">
      <div class="order_item">
        <div class="top_block" v-if="userType == 'u'">
          <img class="experts_avatar" :src="orderData.expertAvataUrl || orderData.expertAvatarUrl">
          <div class="top_block_right">

            <div class="order_msg1">
              <div class="experts_name">{{orderData.expertNickName || orderData.expertName}}</div>
            </div>

            <div class="order_msg2">
                <div class="experts_work_msg">
                 <span>{{orderData.expertCompanyPosition || orderData.expergtCompanyPosition}}&nbsp;|&nbsp;{{orderData.expertCompanyName}}</span>
                </div>
            </div>
            <span class="cost_amount">￥{{orderData.amount}}</span>
          </div>
        </div>

        <div class="top_block" v-if="userType == 'e'">
          <img class="experts_avatar" :src="orderData.userAvataUrl || orderData.userAvatarUrl">
          <div class="top_block_right">
            <div class="order_msg1">
              <div class="experts_name">{{orderData.userNickName || orderData.userName}}</div>
            </div>
            <span class="cost_amount">￥{{orderData.amount}}</span>
          </div>
        </div>


        <div class="bottom_block">
          <div class="question"  v-if="orderData.userDesc">
              <span class="question_title">{{i18n.brief_introduction}}：</span>{{orderData.userDesc}}
          </div>
          <div class="question" :class="{mt5:orderData.userDesc}">
              <span class="question_title">{{i18n.Query}}：</span>{{orderData.questionRemark}}
          </div>
          <div class="question_files" v-if="questionImgs.length > 0">
             <div class="question_files_title">{{i18n.related_files}}：</div>
             <div class="img_block">
               <img v-for="(item,index) in questionImgs" :key="index" :src="item" alt="" @click="showQuestionImgsSwiper(index)">
             </div>
          </div>
          <!-- <div class="question" style="margin-top:5px" v-if="orderData.orderUserDesc">
              <span class="question_title">相关介绍：</span>{{orderData.orderUserDesc}}
          </div> -->
          <div class="order_time">{{i18n.Asked_at}}：{{orderData.creationTime}}</div>
        </div>

        <!-- 专家/用户取消订单 -->
        <div class="bottom_block" v-if="orderData.status == 9 && orderData.closeDesc && !orderData.otherExpertId">
          <div class="question">
              <span class="question_title">{{i18n.order_closed}}：</span>{{i18n.reason}}：{{orderData.closeDesc}}
          </div>
          <div class="order_time">{{i18n.Close_at}}：{{orderData.closerTime}}</div>
        </div>

        <!-- 专家拒绝并推荐其他专家 -->
        <div class="bottom_block" v-if="orderData.status == 9 && orderData.otherExpertId">
          <div class="question" v-if="i18n.LANGTYPE == 'cn_j'">
              <span class="question_title">{{i18n.order_closed}}：</span>专家取消订单，并推荐了相关专家&nbsp;<span class="link_text" @click="toOtherExpertDetail(orderData.otherExpertId)">{{orderData.recommendExpertName}}</span>&nbsp;,可转至其推荐专家详情页了解推荐专家并重新发起咨询。
          </div>
          <div class="question" v-else>
              <span class="question_title">{{i18n.order_closed}}：</span>专家取消订单，并推荐了相关专家&nbsp;<span class="link_text" @click="toOtherExpertDetail(orderData.otherExpertId)">{{orderData.recommendExpertName}}</span>&nbsp;,可转至其推荐专家详情页了解推荐专家并重新发起咨询。
          </div>
          <div class="order_time">{{i18n.Close_at}}：{{orderData.closerTime}}</div>
        </div>

        <!-- 专家修改订单-->
        <div class="bottom_block" v-if="orderData.status == 1">
          <div class="question">
            <div>
              <span class="question_title">{{i18n.order_changed}}：</span>
            </div>
            <div>
              {{i18n.fee_required}}：<span class="colorful_text">￥{{orderData.modifyAmount}}</span>
            </div>
            <div>
              {{i18n.time_required}}：<span class="colorful_text">{{orderData.modifyLastAnswerTime}}</span>
            </div>
            <div>
              {{i18n.change_reason}}：<span class="colorful_text">{{orderData.modifyDesc}}</span>
            </div>
          </div>
          <div class="order_time">{{i18n.change_at}}：{{orderData.lastModificationTime}}</div>
        </div>

  
        <div class="bottom_block" v-if="orderData.status == 4 || orderData.status == 6 || orderData.status == 7 || orderData.status == 8">
          <div class="question">
              <span class="question_title">{{i18n.answer_content}}：</span>{{orderData.questionAnswerText}}
          </div>
          <div class="question_files" v-if="questionImgs.length > 0">
             <div class="question_files_title">{{i18n.related_files}}：</div>
             <div class="img_block">
               <img v-for="(item,index) in answerImgs" :key="index" :src="item" alt="" @click="showAnswerImgsSwiper(index)">
             </div>
          </div>
          <div class="order_time">{{i18n.replied_at}}：{{orderData.actualAnswerTime}}</div>
        </div>

        <div class="bottom_block" v-if="(orderData.status == 4 || orderData.status == 6 || orderData.status == 7 || orderData.status == 8 ) && orderData.satisfactionDegreeDesc">
          <div class="question" style="padding-bottom:6px;">
              <span class="question_title">{{i18n.rating}}：</span>
              <span class="satisfaction_degree" v-if="orderData.satisfactionDegree=='满意'">{{i18n.good}}</span>
              <span class="satisfaction_degree" v-if="orderData.satisfactionDegree=='一般'">{{i18n.so_so}}</span>
              <span class="satisfaction_degree" v-if="orderData.satisfactionDegree=='不满意'">{{i18n.no_good}}</span>
          </div>          
          <div class="question">
              <span class="question_title">{{i18n.comment}}：</span>{{orderData.satisfactionDegreeDesc}}
          </div>
          <div class="order_time">{{i18n.comment_at}}：{{orderData.satisfactionDegreeTime}}</div>
        </div>

        <div class="bottom_block" v-if="orderData.status == 5 && '免单'">
          <div class="question">
            <span class="question_title">{{i18n.fee_required}}：￥0</span>
          </div>
          <div class="order_time">{{i18n.waived_at}}：{{orderData.lastModificationTime}}</div>
        </div>
        
        <div v-if="userType == 'u'">
           <!-- 待接单时客户的操作 -->
           <div class="other_msg_block" v-if="orderData.status == 0">
             <div class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">
               <div>专家将在{{orderData.responseTime}}分钟内接单</div>
               <div>在专家接单前，您可取消订单哦</div>
             </div>
             <div class="other_msg" v-else>
               <div>advisor will response in {{orderData.responseTime}} minutes</div>
               <div>Your can cancel this order any time before confirm ation.</div>
             </div>
             <span class="action_btn2" @click="userCloseOrder">{{i18n.Cancel_Order}}</span>
           </div>
   
           <!-- 专家修改订单信息后客户的操作 -->
           <div class="other_msg_block" v-if="orderData.status == 1">
             <div class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">
               <div>超过24小时未接受的</div>
               <div>订单将自动关闭</div>
             </div>

             <div class="other_msg" v-else>
               <div>Order will be closed in 24 hours</div>
               <div>if change is not accepted</div>
             </div>

             <div class="inner_block">
                <span class="action_btn2" @click="userNotSureOrderInfo">{{i18n.Decline}}</span>
                <span class="action_btn" @click="userResureOrder">{{i18n.Accept}}</span>
             </div>
           </div>

           <div class="other_msg_block" v-if="orderData.status == 2">
             <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">专家将在{{orderData.answeringTime/60}}小时内作答，请等待~</span>
             <span class="other_msg" v-else>advisor will answer in {{orderData.answeringTime/60}} hours</span>
           </div>
   

           <!-- 专家回答后用户可进行的操作 -->
           <div class="other_msg_block" v-if="orderData.status == 4 && !orderData.satisfactionDegreeDesc">
              <div class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">
                <div>请评价服务并在24小时内支付费用</div>
                <div>逾期未支付专家将直接联系您</div>
              </div>
              <div class="other_msg" v-else>
                <div>Please make payment in 24 hours following the reply.</div>
                <div>If not,the advisor may call to inquire.</div>
              </div>
             <div class="inner_block">
                <span class="action_btn" @click="toComment">{{i18n.review}}</span>
                <span class="action_btn2" @click="toPay">{{i18n.To_pay}}</span>
             </div>
           </div>

           <!-- 专家回答后用户可进行的操作 -->
           <div class="other_msg_block" v-if="orderData.status == 4  && orderData.satisfactionDegreeDesc">
              <div class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">
                <div>请24小时内完成本次费用支付</div>
                <div>逾期未支付专家将直接联系您</div>
              </div>
              <div class="other_msg" v-else>
                <div>Please make payment in 24 hours following the reply.</div>
                <div>If not,the advisor may call to inquire.</div>
              </div>
              <div class="inner_block">
                  <span class="action_btn2" @click="toAskMore(1)">{{i18n.follow_on}}</span>
                  <span class="action_btn" @click="toPay">{{i18n.To_pay}}</span>
              </div>
           </div>
   
            <!-- 用户支付中时的提示 -->
           <div class="other_msg_block" v-if="orderData.status == 6">
             <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">您已提交支付，请等待专家确认。专家确认后您可继续追问~</span>
             <span class="other_msg" v-else>Please wait the advisor check and confirm receipt in WeChat Pay</span>
           </div>
   
           <!-- 用户支付完成后可进行的操作 -->
           <div class="other_msg_block" v-if="orderData.status == 7">
             <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">您已完成支付，可进行追问~</span>
             <span class="other_msg" v-else>You have completed the payment and can be follow on</span>

             <div class="action_btn_bar">
                 <span class="action_btn2" @click="toAskMore(2)">{{i18n.follow_on}}</span>
             </div>
           </div>

          <!-- 用户申诉待协商 -->
          <div class="other_msg_block" v-if="orderData.status == 8 && orderData.satisfactionDegree == '不满意'">
            <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">您不满此次作答并拒绝支付费用，专家可能会联系您进行协商处理~</span>
            <span class="other_msg" v-else>User dissatisfied.Advisor may contact you to address your concerns</span>

          </div>

          <div class="other_msg_block" v-if="orderData.status == 8 && '专家未到账'">
            <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">专家未收到您支付的费用，可能会联系您进行协商处理~</span>
            <span class="other_msg" v-else>No payment confirmation.Advisor may contact you to address your concerns</span>
          </div>
        </div>


        <div v-if="userType == 'e'">

          <!-- 待接单时专家的操作 -->
          <div class="other_msg_block" v-if="orderData.status == 0">

              <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">请在<span class="other_msg_text">{{orderData.lastReceiptTimeOfMinute}}</span>分钟内接单</span>
              <span class="other_msg" v-else>please respond in <span class="other_msg_text">{{orderData.lastReceiptTimeOfMinute}}</span> minutes</span>

              <div class="action_btn_bar">
                <span class="action_btn2"  @click="toEditOrder">{{i18n.Change}}</span>
                <span class="action_btn2" @click="toRejectOrder">{{i18n.Decline}}</span>
                <span class="action_btn" @click="receiptOrder">{{i18n.Accept}}</span>
              </div>
           </div>
  
          <!-- 修改订单后等待用户确认 -->
          <div class="other_msg_block" v-if="orderData.status == 1">
            <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">您已修改订单信息，请等待用户确认~</span>
            <span class="other_msg" v-else>awaiting user to confirm the change order</span>
          </div>
  
          <!-- 已接单时专家的操作 -->
          <div class="other_msg_block" v-if="orderData.status == 2">
            <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">请在{{orderData.answeringTime/60}}小时内作答</span>
            <span class="other_msg" v-else>please answer in {{orderData.answeringTime/60}} hours</span>
            <span class="action_btn" @click="toAnswerPage">{{i18n.Answer}}</span>
          </div>

          <!-- 已作答等待用户支付 -->
          <div class="ex_action_block" v-if="orderData.status == 4">
            <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">已作答，请等待用户审阅并为本次服务点评和支付</span>
            <span class="other_msg" v-else>query has been answered,please wait user to review and pay</span>
          </div>

          <!-- 用户支付完成后专家可进行的操作 -->
          <div class="other_msg_block" v-if="orderData.status == 6">
            <span class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">用户已提交支付，请及时确认~</span>
            <span class="other_msg" v-else>please confirm receipt after checking your WeChat payment record</span>
            <div class="action_btn_bar">
                <span class="action_btn2" @click="toPayAppeal">{{i18n.Unpaid}}</span>
                <span class="action_btn" @click="expertPaySure">{{i18n.Paid}}</span>
            </div>
          </div>

          <!-- 用户申诉待协商 -->
          <div class="other_msg_block" v-if="orderData.status == 8 && orderData.satisfactionDegree == '不满意'">
              <div class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">
               <div>用户不满此次作答并拒绝支付费用</div>
               <div>您可联系用户进行协商</div>
              </div>
              <div class="other_msg" v-else>
               <div>user dissatisfied and refuse to pay</div>
               <div>contact the user to resolve his/her concerns</div>
              </div>
             <div class="inner_block">
                <span class="action_btn" @click="showUserMoblie">{{i18n.Contact}}</span>
             </div>
          </div>

          <div class="other_msg_block" v-if="orderData.status == 8 && '专家未到账'">
              <div class="other_msg" v-if="i18n.LANGTYPE == 'cn_j'">
                  <div>您未收到用户支付的费用</div>
                  <div>可联系用户进行协商</div>
              </div>
               <div class="other_msg" v-else>
                  <div>no payment confirmation</div>
                  <div>contact the user to resolve</div>
              </div>
             <div class="inner_block">
                <span class="action_btn" @click="showUserMoblie">{{i18n.Contact}}</span>
             </div>
          </div>

        </div>
      </div>
    </div>

    <swiper class="imgs_swiper"
      v-if="questionImgsSwiperShow"
      :indicator-dots="true"
      :current="questionImgsswiperCurrent"
      :autoplay="false"
      :duration="300"
      indicator-color="rgba(255,255,255,0.6)"
      indicator-active-color="#fff"
    >
      <block v-for="(item,index) in questionImgs" :key="index">
        <swiper-item class="img_item" @click="questionImgsSwiperShow = false">
          <image :src="item" mode="widthFix" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>


    <swiper class="imgs_swiper"
      v-if="answerImgsSwiperShow"
      :indicator-dots="true"
      :current="answerImgsswiperCurrent"
      :autoplay="false"
      :duration="300"
      indicator-color="rgba(255,255,255,0.6)"
      indicator-active-color="#fff"
    >
      <block v-for="(item,index) in answerImgs" :key="index">
        <swiper-item class="img_item" @click="answerImgsSwiperShow = false">
          <image :src="item" mode="widthFix" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <van-dialog id="van-dialog"/>

  </div>
</template>
<script>

import util from '../../utils/index.js'
import Dialog from '../../../static/vant/dialog/dialog';
import { mapState, mapActions } from 'vuex'
import {API, BASE_URL} from  '../../http/api.js'
export default {
  data () {
    return {
      orderId:'',
      userType:'',
      questionImgs: [],
      questionImgsSwiperShow: false,
      questionImgsswiperCurrent:2,
      answerImgs:[],
      answerImgsSwiperShow: false,
      answerImgsswiperCurrent:2,
      orderData:{
    
      },
      userName:'',
      userPhoneNum:'',
      timer:null,
      showCount:false,
      hh:'00',
      mm:'mm',
      ss:'ss',
      orderStatus:-1
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },

  methods: {
    // 专家修改订单
    toEditOrder(){
      this.$router.push({path:'/pages/editOrder/index',query:{
        orderId:this.orderId,
      }})
    },
    // 专家拒绝订单
    toRejectOrder(){
      this.$router.push({path:'/pages/cancelOrder/index',query:{
          orderId:this.orderId,    
          amount:this.orderData.amount || '0',
          lastAnswerTime:this.orderData.lastAnswerTime,
        }
      })
    },
    // 专家接单
    receiptOrder(){
      Dialog.confirm({
        title: this.i18n.Once_confirmed,
        message: this.i18n.LANGTYPE == 'cn_j'?'请在'+ (this.orderData.answeringTime / 60).toFixed(1) +'小时内作答':
                                              'please answer in '+ (this.orderData.answeringTime / 60).toFixed(1) +' hours',
      }).then(() => {
        this.$http.request({
          url:'ExpertReceiptOrder',
          data:{
            expertId:this.userData.userId,
            orderId:this.orderId*1
          },
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.showToast(this.i18n.LANGTYPE == 'cn_j'?'接单成功':'successful');
            this.getOrderDetail();
          }
        })
      }).catch(() => {
        
      });
    },


    // 专家去作答
    toAnswerPage(){
      this.$router.push({path:'/pages/answer/index',query:{
        orderId:this.orderId,
        amount:this.orderData.amount
      }})
    },
    
    // 专家未收款到账申诉
    toPayAppeal(){
      // this.$router.push({path:'/pages/appeal/index',query:{orderId:this.orderId}})
      Dialog.confirm({
        title: this.i18n.Tips,
        message: this.i18n.LANGTYPE == 'cn_j'?'已查看微信记录，确实没收到咨询费用？':'Fee remains unpaid after reviewing WeChat payment records?',
        confirmButtonText:this.i18n.Yes,
        cancelButtonText: this.i18n.Back,
      }).then(() => {
        Dialog.confirm({
          title: this.i18n.Tips,
          message: this.i18n.LANGTYPE == 'cn_j'?'需要联系用户查询吗':'Do you want to contact the user to inquire',
          confirmButtonText:this.i18n.Yes,
          cancelButtonText: this.i18n.Cancel,
        }).then(() => {
           this.showUserMoblie();
        })
      })

    },

    // 专家确认收款
    expertPaySure(){
      let url = API['ExpertReceived'] + this.orderId;
      Dialog.confirm({
        title: this.i18n.Payment_confirmed,
        message: this.i18n.LANGTYPE == 'cn_j'?'请确认用户已支付到账？':'Confirm the user has paied?',
        confirmButtonText:this.i18n.Confirm,
        cancelButtonText: this.i18n.Cancel,
      }).then(() => {
        this.$http.request({
          url,
          // data:this.orderId,
          flyConfig:{
            // method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.getOrderDetail();
          }
        })
      }).catch(() => {
        
      });
    },

    // 用户取消订单
    userCloseOrder(){
      Dialog.confirm({
        title: this.i18n.LANGTYPE == 'cn_j'?'确认关闭订单？':'Close order?',
        message: this.i18n.LANGTYPE == 'cn_j'?'点击确认后将关闭订单 ':'Order will be closed if click Confirm',
        confirmButtonText:this.i18n.Confirm,
        cancelButtonText: this.i18n.Cancel,
      }).then(() => {
        this.$http.request({
          url:'UserClosed',
          data:{
            orderId:this.orderId*1,
            closeType: 1,
            closeDesc: this.i18n.order_cancelled_by_user,
            closerId: this.userData.userId,
          },
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.getOrderDetail();
          }
        })
      }).catch(() => {
        
      });
    },
    userNotSureOrderInfo(){
      Dialog.confirm({
        title: this.i18n.Decline_change_order,
        message: this.i18n.LANGTYPE == 'cn_j'?'点击确认后将关闭订单 ':'Order will be closed if click Confirm',
        confirmButtonText:this.i18n.Confirm,
        cancelButtonText: this.i18n.Cancel,
      }).then(() => {
        this.$http.request({
          url:'UserNotSureOrderInfo',
          data:this.orderId*1,
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.getOrderDetail();
          }
        })
      }).catch(() => {
        
      });
    },
    // 用户重新确认订单信息
    userResureOrder(){
      Dialog.confirm({
        title: this.i18n.Accept_change_order,
        message: this.i18n.LANGTYPE == 'cn_j'?'确认后专家将按订单修改后作答。':'Advisor will reply as per the change order.'
      }).then(() => {
        this.$http.request({
          url:'UserDoSureOrderInfo',
          data:this.orderId*1,
          flyConfig:{
            method: 'post'
          }
        }).then(res => {
          if(res.code == 1){
            this.getOrderDetail();
          }
        });
      }).catch(() => {
        
      });
    },

    // 不满意去申诉
    toAppeal(){
      this.$router.push({path:'/pages/appeal/index',query:{orderId:this.orderId}})
    },

    // 用户去支付
    toPay(){
      if(!this.orderData.satisfactionDegree){
        Dialog.confirm({
          title: this.i18n.Tips,
          message: this.i18n.LANGTYPE == 'cn_j'?'不写点评，直接去支付吗？':'making payment without giving any comments?'
        }).then(() => {
           this.toPayPage();
        })
      }else{
         this.toPayPage();
      }
    },
    toPayPage(){
        this.$router.push({
          path:'/pages/pay/index',
          query:{
            orderId:this.orderId*1,
            amount:this.orderData.amount,
            price:this.orderData.price,
            quantity:this.orderData.quantity
        }})
    },

    // 用户去评论
    toComment(){
      this.$router.push({path:'/pages/comment/index',query:{orderId:this.orderId,expertId:this.orderData.expertId}})
    },
    // 用户去追问
    toAskMore(flag){
      if(flag == 1){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请先完成支付~':'please pay for the answer first');
        return;
      }
      this.$router.push({path:'/pages/startConsult/index',query:{expertId:this.orderData.expertId,parentOrderId:this.orderData.id}});
    },
    showQuestionImgsSwiper(index){
      this.questionImgsSwiperShow = true;
      this.questionImgsswiperCurrent = index;
    },
    showAnswerImgsSwiper(index){
      this.answerImgsSwiperShow= true;
      this.answerImgsswiperCurrent = index;
    },

    getDetailUer(){
      let url = '';
      if(this.userType == 'e'){
        if(this.orderStatus == 1){
          url = API['ExpertGetModifyDetail'] + this.orderId;
        }else if(this.orderStatus*1 > 3 &&  this.orderStatus != 9){
          url = API['ExpertGetAnswerDetail'] + this.orderId;
        }else{
          url = API['ExpertOrderListDetail'] + this.orderId;
        }
      }else{
        if(this.orderStatus == 1){
          url = API['UserGetModifyDetail'] + this.orderId;
        }else if(this.orderStatus*1 > 3 &&  this.orderStatus != 9){
          url = API['UserGetAnswerDetail'] + this.orderId;
        }else{
          url = API['UserOrderListDetail'] + this.orderId;
        }
      };
      return url;

    },
    // 获取订单
    getOrderDetail(loadingFlag){
      if(loadingFlag){
        wx.showLoading({
          title: this.i18n.loading,
          mask: false
        });
      }
      let url = this.getDetailUer();
      this.$http.request({
        url:url,
      }).then(res => {
        wx.hideLoading();
        if(res.code == 1){
          if(res.data.status != this.orderStatus){
            wx.showLoading({
              title: this.i18n.loading,
              mask: false
            });
            this.orderStatus = res.data.status;
            this.getOrderDetail(true);
            return;
          }
          let result = res.data;
          let questionImgs = [];
          // result.userOrderFiles.forEach((item)=>{
          //   questionImgs.push(item.fileUrl);
          // })
          this.questionImgs = questionImgs;

          let answerImgs = [];
          // result.answerOrderFiles.forEach((item)=>{
          //   answerImgs.push(item.fileUrl);
          // });
          this.answerImgs = answerImgs;

          // result.creationTime = util.formatTime(new Date(result.creationTime));
          // result.lastReceiptTime = util.formatTime(new Date(result.lastReceiptTime));
          // result.closerTime = util.formatTime(new Date(result.closerTime));

          // result.lastModificationTime = util.formatTime(new Date(result.lastModificationTime));
          // result.leaveReceiptTime = Math.ceil(((+new Date(result.lastReceiptTime)) - (+new Date()))  / 1000);
         
          // if(!result.lastAnswerTime){
          //    result.lastAnswerTime = util.formatTime(new Date());
          // }
          // result.leaveAnswerTime = Math.ceil(((+new Date(result.lastAnswerTime)) - (+new Date())) / 1000);
          // result.lastAnswerTime = util.formatTime(new Date(result.lastAnswerTime));

          // if(result.actualAnswerTime){
          //   result.actualAnswerTime = util.formatTime(new Date(result.actualAnswerTime));
          // }

          if(result.modifyLastAnswerTime){
            result.modifyLastAnswerTime = util.formatTime(new Date(result.modifyLastAnswerTime));
          }

          this.orderData = result;

          wx.setStorageSync('orderData',result);

          this.initCount();
        }
      })
    },

    showUserMoblie(){
      let url = API['ExpertGetUserPhoneNum'] + this.orderId;
      this.$http.request({
        url:url,
        flyConfig:{
          // method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          this.userName=res.data.nickName;
          this.userPhoneNum=res.data.phoneNumber;
          Dialog.confirm({
            title: this.i18n.LANGTYPE == 'cn_j'?'用户信息':'User information',
            message: this.i18n.LANGTYPE == 'cn_j'?'用户昵称：'+ this.userName+'； 手机号：'+this.userPhoneNum:'User nickname：'+ this.userName+'； Mobile no.：'+this.userPhoneNum,
            cancelButtonText: this.i18n.Close,
            confirmButtonText: this.i18n.LANGTYPE == 'cn_j'?'复制手机号':'Copy'
          }).then(() => {
            wx.setClipboardData({
              data: this.userPhoneNum,
              success (res) {
                wx.showToast({
                  title: this.i18n.LANGTYPE == 'cn_j'?'已复制手机号':'Copy successful',
                  icon: 'none',
                  duration: 1500
                });
               
              }
            })
          });
        }
      });
    },

    initCount(){
      clearInterval(this.timer);
      this.showCount = false;
      if(this.orderData.status == 0 && this.orderData.leaveReceiptTime >=0){
        if(this.orderData.leaveReceiptTime <=300){
          this.countDown(this.orderData.leaveReceiptTime);
        }
      }else if(this.orderData.status == 2 && this.orderData.leaveAnswerTime >=0){
        if(this.orderData.leaveReceiptTime <= 3600){
          this.countDown(this.orderData.leaveAnswerTime);
        }
      }
    },

    countDown(leaveTime){
      let counts = leaveTime;
      this.timer = setInterval(()=>{
        let hh = Math.floor(counts / 3600);
        this.hh = hh < 10 ? '0' + hh : hh;
        let mm = Math.floor(counts % 3600 / 60);
        this.mm = mm < 10 ? '0' + mm : mm;
        let ss = counts % 60;
        this.ss = ss < 10 ? '0' + ss : ss;
        if(!this.showCount){
          this.showCount = true;
        };
        counts--;
        if(counts < 0){
          this.showCount = false;
          clearInterval(this.timer);
        }
      },1000)
    },

    toOtherExpertDetail(id){
      this.$router.push({path:'/pages/expertDetail/index',query:{id:id}});
    }

  },
  created () {
   
  },
  onLoad: function (options) {
    this.orderId = options.orderId;
    this.userType = options.userType || 'e';
    this.orderStatus = options.orderStatus;
  },
  onShow(){
    this.getOrderDetail(true);
  },
  onHide(){
    clearInterval(this.timer);
    this.showCount = false;
  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
  }
}
</script>
<style lang="less" scoped>
  .order_item .top_block {
    min-height: 80px;
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

  .orders_list .order_item .bottom_block{
    font-size: 14px;
  }

   .action_btn_bar{
    display: flex;
    align-items: center;
  }
  .action_btn{
    height: 28px;
    padding:0 10px;
    border-radius: 4px;
    color: #1fb7b6;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-left: 10px;
    border: 1px solid #1fb7b6;
  }
  .action_btn.active{
    color: #fff;
    background-color: #1fb7b6;
  }
</style>