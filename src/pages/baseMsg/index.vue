<template>
  <div class="container">
    <div class="user_avatar_panel">
        <img class="user_avatar" v-if="avatarImg" :src="avatarImg">
        <img class="user_avatar" v-else src="../../../static/img/df_avatar.jpg">
        <span class="change_avatar_btn" @click="upLoadAvatar">更换头像</span>
    </div>
    <div class="base_msg_panel">

      <ul class="form_list">
        <li class="form_item">
          <div class="item_name">昵称</div>
          <div class="item_content">
            <input type="text" placeholder="请输入昵称，用于平台展示" v-model="nickName">
          </div>
        </li>
        <li class="form_item textarea_item">
          <div class="item_name">自我介绍</div>
          <div class="item_content">
            <textarea class="more_height" placeholder="请输入自我介绍信息"  maxlength='-1' v-model="introduce"></textarea>
          </div>
        </li>
      </ul>
  
      <div class="btn_block">
        <div class="btn large green">确认修改</div>
      </div>
    </div>
    
    <!-- <div class="change_mobile">
      <span @click="chageMobile">更换手机号</span>
    </div> -->

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
       avatarImg:'',
       nickName:'',
       introduce:''
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },

  methods: {
    // chageMobile(){
    //   this.$router.push('/pages/editMobile1/index');
    // },
    upLoadAvatar(){
      let that = this;
      wx.chooseImage({
        count: 1,
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          that.avatarImg = res.tempFilePaths[0];
        }
      })
    },
  },
  mounted(){
    this.avatarImg = this.userData? this.userData.avatarUrl:'';
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


.form_list{
  background-color: #fff;
  .form_item{
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 14px;
    display: flex;
    border-bottom: 1px solid #ebedf0;
    line-height: 24px;
    .item_name{
       width: 90px;
       position: relative;
       input{
         width: 75px;
       }
    }

    &.required > .item_name::before {
      content: '*';
      position: absolute;
      left: -10px;
      top:0;
      font-size: 14px;
      color: #f44;
    }
    .item_content{
      flex: 1;
      input{
        width: 100%;
      }
    }
    &.textarea_item{
      flex-direction: column;
      .item_name{
        width: 100%;
      }
      .item_content{
        padding-top: 5px;
        textarea{
          width: 100%;
          height: 72px; 
          background-color: #fbfbfb;
          border: #ebedf0;
          border-radius: 4px;
          padding:10px;
        }
        textarea.more_height{
           height: 120px; 
        }
      }
    }
  }

}
  
</style>