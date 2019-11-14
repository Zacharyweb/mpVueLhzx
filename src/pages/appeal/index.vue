<template>
  <div class="container">
    <div class="order_form_panel">
      <div class="panle_block nb">
        <div class="block_title">申诉内容</div>
        <div class="problem_content">
          <textarea  maxlength="200" v-model="complainingDesc" placeholder="请输入申诉内容"></textarea>
        </div>
      </div>

      <!-- <div class="panle_block npb">
        <div class="block_title">图片附件</div>
        <div class="problem_content">
          <div class="files_group">
              <span class="title">图片</span>

              <div class="img_file_item">
               <img class="img_file" src="../../../static/img/avatar.jpeg" alt="">
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" alt="">
              </div>
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png">
          </div>
        
        </div>
      </div> -->
        <div class="appeal_tips">需要申诉的，请说明情况和原因。平台在收到申诉后的48小时内将作出处理。</div>
    </div>
    <div class="btn_block">
      <!-- <div class="btn green plain">保存</div> -->
      <div class="btn green" @click="submit">提交申诉</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      orderId:'',
      complainingDesc:''
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
  methods: {
    submit(){
      if(!this.complainingDesc){
        this.showToast('请输入申诉内容');
        return;
      };
      this.$http.request({
        url:'UserComplaining',
        data:{
          orderId: this.orderId,
          complainingUserId: this.userData.userId,
          complainingDesc: this.complainingDesc
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          this.showToast('申诉已提交，请等待平台处理');
          setTimeout(()=>{
              this.$router.go(-1);
          },1500)
         
        }
      })
    }
  },
  onLoad(options){
    this.orderId = options.orderId;
   
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
.appeal_tips{
  font-size: 12px;
  color: #666;
  line-height: 20px;
}
.btn_block{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  .btn{
    width: 80px;
    height: 32px;
    margin-left: 10px;
  }
}

.order_form_panel{
    padding:0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  .panle_block{
    padding:10px 5px;
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

  .problem_content{
    textarea{
      border:1px solid #eee;
      background-color: #fefefe;
      border-radius: 4px;
      width: 100%;
      height: 240px;
      padding:10px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    .files_group{
      padding-left: 36px;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .title{
        position: absolute;
        font-size: 14px;
        color: #666;
        left: 0;
        top:12px;
      }
      .add_files_icon{
        width: 54px;
        height: 54px;
        margin-top: 10px;
      }
      .img_file_item{
        height: 54px;
        width: 54px;
        margin-right: 15px;
        margin-top: 10px;
        position: relative;
        .img_file{
          height: 54px;
          width: 54px;
        }
        .delete_icon{
          position: absolute;
          width: 14px;
          height: 14px;
          right: -9px;
          top:-9px;
        }
      }
    }
  }
}

</style>
