<template>
  <div class="container">
    <div class="tab_fix_wrap">
       <van-tabs color="#1fb7b6" :active="currentTab" @change="onTabChange">
          <van-tab title="已选择"></van-tab>
          <van-tab title="全部"></van-tab>

        </van-tabs>
    </div>
 
    <div class="experts_list">

      <div class="experts_item">
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="experts_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="experts_msg2">
              <span class="experts_position">高级财务专家</span>
            </div>
          </div>
         <img class="status_icon" src="../../../static/img/select_icon.png">
         <!-- <img class="status_icon" src="../../../static/img/delete_icon2.png"> -->
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
      currentTab:0,
      dialogShow: false,
      newTel:'',
      actionSheetShow:false,
      actions:[
        {
          targetId:1,
          name: '手机号添加'
        },
        {
          targetId:2,
          name: '邀请微信好友'
        }
      ]
    }
  },

  components: {
    
  },

  methods: {
    onTabChange(event){
      this.currentTab = event.target.index;
    },
    addFriend(){
      this.actionSheetShow = true;
    },
    onClose(event) {
      if (event.mp.detail === 'confirm') {
        // 异步关闭弹窗
        setTimeout(() => {
          this.dialogShow =  false;
        }, 1000);
      } else {
          this.dialogShow =  false;
      }
    },
    onCloseActionSheet(){
      console.log('close');
    },
    onSelectAction(data){
      if(data.mp.detail.targetId == 1){
         this.dialogShow = true;
      }else{
        Dialog.confirm({
          title: '邀请好友',
          message: '链接复制成功，前往微信粘贴',
          confirmButtonText: '前往'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
      };
      this.actionSheetShow = false;
    },
    deleteFriend(p){
      var that = this;
      Dialog.confirm({
        title: '确认解除关系？',
        message: '解除关系后，您将从对方的关系户中删除'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  },
  created () {
   
  },
  onShow(){
    console.log('onshow');
    console.log(this.$route.query);
  }
}
</script>

<style lang="less" scoped>
.container{
  
}
.tab_fix_wrap{
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  z-index: 2;
}




.experts_list{
  padding-top: 32px;
}
.experts_item{
    padding: 0 15px;
    font-size: 14px;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    .top_block{
       height: 98px;
       display: flex;
       align-items: center;
      .experts_avatar{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 3px solid #e6e8eb; 
        margin-right: 10px;
      }
      .top_block_right{
        flex: 1;
        .experts_msg1{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .experts_name{
            font-size: 16px;
            color: #333;
          }
        }
        .experts_msg2{
          margin-top: 10px;
          font-size: 14px;
          color: #333;
          display: flex;
          justify-content: space-between;
          .consult_price{
            color: #1fb7b6;
          }
        }
      }
    }
    .action_btn{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: 15px;
      height: 24px;
      display: flex;
      align-items: center;
      color: #fff;
      background-color: #1fb7b6;
      border-radius: 12px;
      padding:0 10px;
      font-size: 12px;
    }
  }
  .status_icon{
    width: 30px;
    height: 30px;
  }
</style>