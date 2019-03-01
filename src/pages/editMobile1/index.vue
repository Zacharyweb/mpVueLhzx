<template>
  <div class="container">
    <div class="base_msg_panel">
      <van-cell-group>
        <van-field
          :value="account"
          clearable
          label="原手机号"
          type="tel"
          placeholder="请输入原手机号"
          customStyle="background-color:#fff;"
        />
        <van-field
          :value="city"
          center
          clearable
          label="短信验证码"
          type="tel"
          placeholder="请输入短信验证码"
          :border="false"
          use-button-slot
          customStyle="background-color:#fff;"
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn_block">
        <div class="btn large green" @click="next">下一步</div>
      </div>
    </div>

  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
     cashAmount:0,
     account:'',
     bankCode:'',
     city:''
    }
  },

  components: {
    
  },

  methods: {
    next(){
      this.$router.push('/pages/editMobile2/index');
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
.base_msg_panel{
  background-color: #fff;
  padding: 0 15px;
}
.btn_block{
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

</style>