<template>
  <div>
    <ul class="router_list">
      <li class="router_item">
        <div class="item_left">服务状态</div>
        <div class="item_right" @click="actionSheetShow = true">
          <span class="status_text" v-if="workStatus == 1">营业中</span>
          <span class="status_text" v-else-if="workStatus == 2">休息至下次登入</span>
          <span class="status_text" v-else-if="workStatus == 3">休息至明早8:00</span>
          <span class="status_text" v-else>获取中</span>
          
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

    </ul>

     <van-action-sheet
      :show="actionSheetShow"
      :actions="actions"
      @close="onCloseActionSheet"
      @select="onSelectAction"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      actionSheetShow:false,
      workStatus:0,
      // statusText:'营业中',
      actions:[
        {
          targetId:1,
          name: '营业中',
        },
        {
          targetId:2,
          name: '休息中',
          subname: '休息至下次登入',
        },
        {
          targetId:3,
          name: '休息中',
          subname: '休息至明早8:00',
        }
      ]

    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  mounted(){

  },
  methods: {
    onCloseActionSheet(){
      this.actionSheetShow = false;
    },
    onSelectAction(data){
      let statusText,workStatus;
      if(data.mp.detail.targetId == 2){
        statusText = '休息至下次登入';
        workStatus = 2;
      }else if(data.mp.detail.targetId == 3){
        statusText = '休息至明早8:00';
        workStatus = 3;
      }else{
        statusText = '营业中';
        workStatus = 1;
      }
      this.setWorkStatus(workStatus,statusText);
      this.actionSheetShow = false;
    },
    setWorkStatus(workStatus,statusText){
      if(this.workStatus == workStatus){
        return;
      }
      this.$http.request({
        url:'SetWorkStatus',
        data:{
          id: this.userData.userId,
          workStatus: workStatus
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          this.workStatus = workStatus;
          this.statusText = statusText;
          wx.showToast({
            title: '服务状态切换成功',
            icon: 'none',
            duration: 1500
          });
        }
      })
    },
 
    linkTo(path){
      this.$router.push(path);
    }
  }
}
</script>

<style lang="less">

.router_list{
  background-color: #fff;
  padding:0 15px;
  margin-top: 10px;
  .router_item + .router_item{
     border-top: 1px solid #e3e5e7;
  }
  .router_item{
    padding: 0 5px;
    font-size: 14px;
    color: #333;
    height: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item_left{
      display: flex;
      align-items: center;
      img{
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
    .item_right{
      display: flex;
      align-items: center;
      .status_text{
        font-size: 14px;
        color: #999;
        margin-right: 10px;
      }
      img{
        width: 9px;
        height: 12px;
      }
    }
  }
}
</style>
