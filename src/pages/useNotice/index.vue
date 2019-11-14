<template>
  <div class="container">
      <div class="consult_notice">
        <h4 class="block_title"> 欢迎使用问税易！</h4>
      

        <h4 class="block_title">模式：</h4>
        <p>问税易采用的是先问答后付费模式。</p>

        <h4 class="block_title">问答：</h4>
        <p>你发起提问后，会生成订单，专家在预定的时间内回应是否接单。</p>
        <p>接单的，专家承诺在一定时间内作答回复你。</p>
        <p>逾时作答的，进黑名单不能使用服务。</p>
        <p>接单和作答的时间由每位专家自行设定。你可在专家详情页看到。</p>

        <h4 class="block_title">时间：</h4>
        <p>服务时间为每天早上8点至晚上8点，专家自行切换营业或休息时间的除外。</p>
        <p>只有专家在营业中，才可向他/她发起提问。</p>

        <h4 class="block_title">费用：</h4>
        <p>问答的收费统一在每次35元，约一杯咖啡的费用。</p>
        <p>寓意在喝一杯咖啡的时间内，即15-20分钟，聚焦快速解答你的问题。</p>
        <p>如果专家在看到问题后，需要更长的时间作答（或更多的费用），他/她会事先征得你的同意，才正式接单。</p>


        <h4 class="block_title">支付：</h4>
        <p>费用是通过微信二位码全额直接支付给专家的，我们不作任何扣除。</p>
        <p>专家交付作答后的24小时内须完成支付。</p>
        <p>逾时支付的，进黑名单不能使用服务。</p>

        <h4 class="block_title">点评：</h4>
        <p>你对专家的点评仅限于你允许过的关系才可见。</p>

        <h4 class="block_title">关系：</h4>
        <p>你可通过分享链接邀请微信通讯录的好友添加到你的关系列表来。</p>

        <h4 class="block_title">问候：</h4>
        <p>除了问答外，你可通过免费的问候功能给专家留言或聊天。专家按需回应。</p>

        <h4 class="block_title">投诉：</h4>
        <p>对专家作答不满的，请在点评时注明理由。专家电话联系你协商解决。解决前可暂不支付。</p>

        <h4 class="block_title">郑重声明：</h4>
        <p>《问税易》是由我们（杭州联询商务信息咨询有限公司）开发和运营的一款应用。这应用仅作为工具让你能联系到专家。</p>
        <p>我们与专家不存在任何雇佣或劳务关系。</p>
        <p>专家以个人身份为你提供服务。</p>
        <p>一切专家为你提供的服务与我们无关。</p>
        <p>专家通过《问税易》给你的作答或建意，只供参考之用。</p>
        <p>我们对专家所有的作答或表述均不承担任何责任。</p>
        <p>任何因采用了专家的作答或表述而产生的后果一律与我们无关。</p>
        <p>如除了作答外，你需要专家为你发表监证意见或提供更多的服务，请另行与专家商议。</p>
        <p>使用这款应用即代表你同意《问税易》用户协议，并承诺不通过《问税易》进行任何有违国家法律法规的操作，包括但不限于各种非法违规的问答或建议。</p>
        <p>如有发现违法违规行为，请及时举报。</p>
        <p>客服邮箱：advisorymadeeasy@163.com</p>

        <div class="user_protocol" @click="linkTo('/pages/userProtocol/index')">《问税易》用户协议</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    
    }
  },
  computed: {
    ...mapState({
      i18n: state => state.counter.i18n
    })
  },

  components: {
    
  },

  methods: {
    linkTo(path){
      this.$router.push(path);
    }
  },
  created () {
   
  },
  onShow(){
 
  }
}
</script>

<style lang="less" scoped>
.container{

}

.consult_notice{
  background-color: #fff;
  padding:15px;
  padding-bottom: 30px;
  padding-top: 0;
  margin-top: 5px;
}
.consult_notice p{
  color: #666;
  font-size: 13px;
  line-height: 1.5;
}
.consult_notice p+p{
 margin-top: 6px;
}

.block_title{
  padding-top: 15px;
  padding-bottom: 5px;
  font-size: 15px;
  color: #333;
  font-weight: bold;
}
.user_protocol{
  padding-top: 20px;
  font-size: 13px;
  color: #1fb7b6;
}
</style>