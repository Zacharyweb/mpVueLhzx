<template>
  <div class="container">
    
    <div class="order_reject_panel show">
      <!-- <div class="panel_top">
        <span class="cancel_btn" @click="rejectPanelShow = false">取消</span>
        <span class="title">取消订单</span>
        <span class="submit_btn">提交</span>
      </div> -->
      <div class="quick_reson_list">
  
        <div class="reson_item"  @click="changeResonId(1)">
          <span class="custom_checkbox" :class="{'active': rejectResonId == 1}"></span>
          <span class="reson_text">不好意思，最近忙不过来，希望下次能再为你服务。</span>
        </div>

        <div class="reson_item"  @click="changeResonId(2)">
          <span class="custom_checkbox" :class="{'active': rejectResonId == 2}"></span>
          <span class="reson_text">不好意思，这个问题不在我的专业领域，希望下次能再为你服务。</span>
        </div>

        <div class="reson_item"  @click="changeResonId(3)">
          <span class="custom_checkbox" :class="{'active': rejectResonId == 3}"></span>
          <span class="reson_text">其他原因</span>
        </div>

      </div>

      <div class="input_block" v-if="rejectResonId == 3">
        <textarea class="text_area" placeholder="请输入其他原因" v-model="closeDesc"></textarea>
      </div>

      <div class="btn_block">
        <div class="btn large green" @click="submit">提交</div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      closeDesc:'',
      rejectResonId:1,
      orderId:0
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  methods: {
    showToast(txt){
      wx.showToast({
        title: txt,
        icon: 'none',
        duration: 1500
      })
    },
    changeResonId(flag){
      if(this.rejectResonId == flag) return;
      this.rejectResonId = flag;
    },
    submit(){
      let closeDesc;
      if(this.rejectResonId == 1){
        closeDesc = '';
      }else if(this.rejectResonId == 2){
        closeDesc = '';
      }else{
        if(!this.closeDesc){
           this.showToast('请填写其他原因');
           return;
        }else{
          closeDesc = this.closeDesc;
        }
      }
      this.$http.request({
        url:'ClosedOrder',
        data:{
          closeType: 2,
          closeDesc: closeDesc,
          closerId: this.userData.userId,
          orderId:this.orderId
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          this.showToast('订单已取消');
          setTimeout(()=>{
            this.$router.go(-1);
          },1500);
        }
      })
    }
  },
  created () {
   
  },
  onLoad: function (options) {
    this.orderId = options.orderId;
   
  },
  onShow(){

  },
}
</script>
<style lang="less" scoped>
  .order_reject_panel{
    position: fixed;
    transform: translateX(100%);
    transition: all 0.3s;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    &.show{
      transform: translateX(0);
    }
    .panel_top{
      display: flex;
      align-items: center;
      height: 40px;
      padding:0 10px;
      .cancel_btn{
        width: 60px;
        font-size: 13px;
        color: #333;
      }
      .title{
        flex: 1;
        font-size: 15px;
        text-align: center;
        color: #333;
      }
      .submit_btn{
        width: 60px;
        height: 24px;
        border-radius: 3px;
        font-size: 13px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #1fb7b6;
      }
    }
    .quick_reson_list{
      margin:0 20px;
      padding-top: 15px;
      .reson_item{
        display: flex;
        padding :10px 0;
        .custom_checkbox{
          padding-left: 20px;
          margin-right: 0;
        }
        .reson_text{
          font-size: 13px;
          line-height: 1.5;
        }
      }
    }
    .input_block{
      padding:0 20px;
      display: flex;
      .text_area{
        flex: 1;
        height: 80px;
        padding:10px;
        font-size: 14px;
        border:1px solid #eee;
        border-radius: 4px;
        background-color: #fafafa;
      }
    }
  }
  .btn_block{
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
</style>