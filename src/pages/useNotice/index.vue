<template>
  <div class="container">
      <div class="consult_notice">
        <h4 class="block_title"> 欢迎使用咨询堂！</h4>
        <p>专家坐堂为您解答财会、税收、法务、工商、海关和外汇等各类商务问题。</p>

        <h4 class="block_title">咨询方式：</h4>
        <p>咨询堂采用的是先问后答，先答后付费的形式。</p>

        <h4 class="block_title">咨询流程：</h4>
        <p>1、提交问题，生成订单</p>
        <p>2、在预设的时间内，专家回应是否接单</p>
        <p>3、接单的，在预设的时间内作答，不接单的，告知原因</p>
        <p>4、收到作答，点评反馈</p>
        <p>5、通过二维码直接支付专家</p>
        <p>6、订单完成</p>
        <p>注：预设时间由专家自行设置</p>

        <h4 class="block_title">服务时间：</h4>
        <p>每天早上8点至晚上8点，专家切换至休息的除外。</p>

        <h4 class="block_title">费用结算：</h4>
        <p>专家咨询按次收费，每次约占用专家15-30分钟的时间。收费标准由专家自行设置。</p>
        <p>注：如果专家看了您的问题后觉得需要增减收费的，他/她会事先与您联系，取得您的同意后，才开始咨询。</p>


        <h4 class="block_title">费用支付：</h4>
        <p>咨询费是通过微信二位码直接支付给专家的。平台不代专家收取任何费用，提出申诉的除外。</p>
        <p>专家交付作答后的24小时内需完成支付，逾时的进黑名单，不能使用平台服务。</p>

        <h4 class="block_title">点评：</h4>
        <p>你对专家的点评仅限于你允许过的关系户才可见。</p>

        <h4 class="block_title">关系户：</h4>
        <p>当您的朋友通过微信分享链接登入时，他/她们将会自动添加到您的关系户列表。</p>
        <h4 class="block_title">申诉处理：</h4>
        <p>要对咨询提出申诉的，需在专家交付作答后的24小时内提出，同时要把有关咨询费暂时转交平台；平台在收到申诉的48小时内作出全部、部分或不退回咨询费的处理决定。</p>

        <h4 class="block_title">郑重声明：</h4>
        <p>平台与专家不存在任何雇佣或劳务关系。</p>
        <p>专家通过平台给您的作答或意见，只能供您参考之用。</p>

        <p>平台对专家给您的一切作答或意见均不承担任何责任。</p>

        <p>任何因采用了专家的作答或意见而产生的后果一律与平台无关。</p>

        <p>如您需要专家对您的问题发表监（见）证意见，请另行与专家商议。</p>

        <p>不得通过平台进行任何有违国家法律法规的操作，包括但不限于各种在平台上的非法违规问答和支付。</p>

        <p>如有发现违法违规行为，请及时举报</p>
        <p>申诉和举报的电邮地址：xxxxxxxx</p>
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
</style>