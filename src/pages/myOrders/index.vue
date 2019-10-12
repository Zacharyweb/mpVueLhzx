<template>
  <div class="container">
    <div class="order_list">

      <div class="order_item" @click="toOrderDetail">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">高级财务专家</span>
            </div>
            <div class="order_msg2">
              <span class="order_status">{{i18n.to_be_confirmed}}</span>
              <span class="consult_price">￥66/节</span>
            </div>
          </div>
        </div>
        <div class="other_msg_block">
          <span class="other_msg">3次问答，合计120元，待支付80元</span>
          <span class="action_btn">前往支付</span>
        </div>
      </div>

      <div class="order_item" @click="toOrderDetail">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">高级财务专家</span>
            </div>
            <div class="order_msg2">
              <span class="order_status">{{i18n.to_be_confirmed}}</span>
              <span class="consult_price">￥66/节</span>
            </div>
          </div>
        </div>
        <div class="other_msg_block">
          <span class="other_msg">3次问答，合计120元，待支付80元</span>
          <span class="action_btn">前往支付</span>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
  
    }
  },
  components: {

  },

  methods: {
    toOrderDetail(){
      this.$router.push({
        path:'/pages/orderDetail/index',
        query:{
          id:'1sb'
        }
      })
    }
  
  },
  created () {
  
  }
}
</script>
<style lang="less" scoped>

</style>