<template>
  <div class="container">
    <ul class="text_list" v-if="i18n.LANGTYPE == 'cn_j'">
      <li class="text_item" :class="{'active':radioList[0].flag}" @click="toggleRadio(0)">
        <div class="item_name"><span class="item_radio"></span>专家</div>
        <div class="item_content">
            <p>在你自身的专业领域拥有5年或以上工作经验，同时拥有国家规定相关专业资质的，均欢迎成为专家! 为自己的用户服务！</p>
        </div>
      </li>
      <li class="text_item" :class="{'active':radioList[1].flag}" @click="toggleRadio(1)">
        <div class="item_name"><span class="item_radio"></span>问答</div>
        <div class="item_content">
            <p>作为专家，你可为用户提供有偿问答服务。</p>
            <p>作为一款工具类产品，我们不对你的服务负责，一切因此而产生的问题和责任（包括但不限于，服务投诉、追收费用等）均需由你自行解决。</p>
        </div>
      </li>
      <li class="text_item" :class="{'active':radioList[2].flag}" @click="toggleRadio(2)">
        <div class="item_name"><span class="item_radio"></span>接单</div>
        <div class="item_content">
            <p>在营业状态的，你可收到来自用户提问的订单。
            <p>你将在接单时间内决定是否接单，你也可对订单提出修改。</p>
            <p>接单时间由你自行设置。</p>
            <p>需要修改订单的，在用户同意后，订单才生效。</p>
        </div>
      </li>

      <li class="text_item" :class="{'active':radioList[3].flag}" @click="toggleRadio(3)">
        <div class="item_name"><span class="item_radio"></span>作答</div>
        <div class="item_content">
            <p>同意接单的，你需在设定的时间内为用户作答。</p>
            <p>作答时间由你自行设置。</p>
            <p>逾时不作答的，进黑名单，不能再使用【问税】。</p>
        </div>
      </li>

      <li class="text_item" :class="{'active':radioList[4].flag}" @click="toggleRadio(4)">
        <div class="item_name"><span class="item_radio"></span>费用</div>
        <div class="item_content">
            <p>费用按次计费。</p>
            <p>收费由你自行设定。在30分钟内能完成作答的工作量，可作为厘定收费的基础。</p>
            <p>需更多时间和费用的，须事先征得用户同意。</p>
        </div>
      </li>

      <li class="text_item" :class="{'active':radioList[5].flag}" @click="toggleRadio(5)">
        <div class="item_name"><span class="item_radio"></span>支付</div>
        <div class="item_content">
            <p>用户在作答后的24小时内支付费用。</p>
            <p>用户将通过你的微信收款二维码向你直接支付，不经过我们，也不扣除第三方费用。</p>
            <p>作答后24小时内未支付的，你可在往后的24小时内打用户电话追讨。</p>
            <p>追讨不成的，用户进黑名单，不能再使用【问税】。</p>
        </div>
      </li>

      <li class="text_item" :class="{'active':radioList[6].flag}" @click="toggleRadio(6)">
        <div class="item_name"><span class="item_radio"></span>评价</div>
        <div class="item_content">
            <p>作答后，用户可给你点评。点评只对用户允许的关系户公开。</p>
            <p>用户点评“不满”的，可不支付，但需填写理由。你可在作答后的48小时内打电话给用户磋商解决。逾时的订单关闭，不再处理。</p>
        </div>
      </li>

      <li class="text_item" :class="{'active':radioList[7].flag}" @click="toggleRadio(7)">
        <div class="item_name"><span class="item_radio"></span>模式</div>
        <div class="item_content">
            <p>经营模式分为“定时”和“自由”两种。</p>
            <p>你可按每天早上8:00点至晚上8:00点定时营业。</p>
            <p>你也可使用自由模式，随时切换营业休息状态。</p>
            <p>营业状态的，用户可向你发起提问。</p>
            <p>休息状态的，用户不可向你发起提问。</p>
        </div>
      </li>

      <li class="text_item" :class="{'active':radioList[8].flag}" @click="toggleRadio(8)">
        <div class="item_name"><span class="item_radio"></span>问候</div>
        <div class="item_content">
            <p>用户可随时向你发出不计费的即时/留言聊天，方便相互介绍认识。</p>
        </div>
      </li>
    </ul>
   
    <ul class="text_list" v-if="i18n.LANGTYPE == 'en'">
      <li class="text_item no_paddingtop">
        <div class="item_name">Advisory:</div>
        <div class="item_content">
            <p>Upon completion of registration, you would be able to offer services of answering questions of users for pay.</p>
            <p>We shall not be responsible for any matters in relation to your services (including service fee).  All issues (including but not limited complaints, outstanding fees) arising from your services shall be accountable by yourself.</p>
        </div>
      </li>
      <li class="text_item">
        <div class="item_name">Order:</div>
        <div class="item_content">
            <p>During service hours, you may receive orders of query from users.</p>
            <p>You shall response within your preset time whether you will accept the order.  You can also revert with change order (see note 1).</p>
        </div>
      </li>
      <li class="text_item">
        <div class="item_name">Answer:</div>
        <div class="item_content">
            <p>When you agree to accept the order, you shall answer the query within your preset time.</p>
            <p>You shall be blacklisted and not be able to use this app, if you cannot answer within your preset time.</p>
        </div>
      </li>
      <li class="text_item">
        <div class="item_name">Review:</div>
        <div class="item_content">
            <p>After user receives your answer, he/she can give rating of  “good”, “so-so” or ”not good” in his/her review.  He/she can also give written comments and share them with his/her friends and you.</p>
            <p>Reasons shall be given if the user rates “not good”.  You can call the user to mitigate the issues within 48 hours after giving your answer.</p>
        </div>
      </li>
      <li class="text_item">
        <div class="item_name">Payment:</div>
        <div class="item_content">
            <p>User shall pay you the fee within 24 hours after sending the answer.</p>
            <p>If not, you can call the user for payment within 48 hours of sending the answer.</p>
            <p>User shall pay you through your WeChat QR receipt code, not via this app.</p>
        </div>
      </li>
      <li class="text_item">
        <div class="item_name">Service Hour:</div>
        <div class="item_content">
          <p>The default service hour is 8:00am to 8:00pm each day.  You can switch your service status at anytime.</p>
        </div>
      </li>
      <li class="text_item">
        <div class="item_name">Chat:</div>
        <div class="item_content">
          <p>Before the user submits an order of query, he/she can introduce himself/herself and chat with you for free.</p>
        </div>
      </li>
    
    </ul>
      
    <div class="btn_block">
      <div class="btn green large" :class="{'disabled':btnDisabled}" @click="toBecomeExpert">{{userData && userData.isExpert == 1?'填写专家资料':'更新专家资料'}}</div>
    </div>
    <div class="to_know_more" @click="linkTo('/pages/userHelp/index')">需要了解更多的</div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import {API, BASE_URL} from  '../../http/api.js'
export default {
  data(){
    return{
        radioList:[
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
        ]
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    btnDisabled(){
      return this.radioList.some(item => item.flag == false);
    }

  },

  onShow(){
    if(this.userData && this.userData.isExpert == 1){
      this.radioList = [
          {flag:true},
          {flag:true},
          {flag:true},
          {flag:true},
          {flag:true},
          {flag:true},
          {flag:true},
          {flag:true},
          {flag:true}
      ]
    }else{
      this.radioList = [
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false},
          {flag:false}
      ]
    }
  },
  methods: {
    toBecomeExpert(){
      if(this.btnDisabled){
        wx.showToast({
          title: '请先阅读并同意上方各条目',
          icon: 'none',
          duration: 1500
        })
      }else{
        this.$router.push('/pages/becomeExpert/index');
      }
    },
    toggleRadio(index){
      this.radioList[index].flag =  !this.radioList[index].flag;
    },
    linkTo(path){
      this.$router.push({
        path:path,
        query:{
          flag:1
        }
      });
    }, 
  },
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
  }
}
</script>

<style lang="less" scoped>
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
    &.disabled{
      background-color:#ccc;
      border:1px solid #ccc;
    }
  }
}
.to_know_more{
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  text-align: center;
  text-decoration: underline;
}
.text_list{
  padding: 0 15px;
  .text_item{
     padding:5px 0;
     padding-left: 20px;
     margin-bottom: 10px;
     line-height: 1.5;
     &.no_paddingtop{

     }
     .item_name{
       font-size: 16px;
       color: #999;
       position: relative;
       .item_radio{
        position: absolute;
        top:6px;
        left: -20px;
        width: 12px;
        height: 12px;
        border-radius: 6px;
        border:1px solid #aaa;
        display: flex;
        align-items: center;
        justify-content: center;
       }
     };

      .item_content{
        p{
         font-size: 14px;
         color: #999;
        }
      }


     &.active{
        .item_name{
          color: #333;
          .item_radio{
           &::after{
             content:'';
             width: 8px;
             height: 8px;
             border-radius: 50%;
             background-color: #1fb7b6;
           }
          }
        }
        .item_content{
          p{
           font-size: 14px;
           color: #333;
          }
        }
     }
  }
}

</style>
