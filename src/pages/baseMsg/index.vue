<template>
  <div class="container">
    <div class="user_avatar_panel">
        <img class="user_avatar" src="../../../static/img/avatar.jpeg">
        <span class="change_avatar_btn">更换头像</span>
    </div>
    <div class="base_msg_panel">

      <van-cell-group>
        <van-field
          :value="account"
          clearable
          label="昵称"
          placeholder="请输入昵称"
          bind:click-icon="onClickIcon"
          customStyle="background-color:#fff;"
        />
        <van-field
          :value="city"
          label="个人介绍"
          placeholder="请输入个人介绍"
          type="textarea"
          autosize
          customStyle="background-color:#fff;"
        />
      </van-cell-group>
      <div class="btn_block">
        <div class="btn large green">确认修改</div>
      </div>
    </div>
    


     
    <div class="change_mobile">
      <span @click="chageMobile">更换手机号</span>
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
    chageMobile(){
      this.$router.push('/pages/editMobile1/index');
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

.user_avatar_panel{
  height: 90px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .user_avatar{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #ebebeb;

  }
  .change_avatar_btn{
    position: absolute;
    font-size: 14px;
    color: #666;
    top:10px;
    right: 20px;

  }

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

.change_mobile{
  margin-top: 20px;
  padding:0 20px;
  text-align: right;
  color: #666;
  font-size: 14px;
}
  
</style>