<template>
  <div class="white_bg">
    <div class="action_bar">
      <img src="../../../static/img/delete_icon4.png" v-show="!isEditing" @click="toggleStatus"> 
      <img src="../../../static/img/delete_icon5.png" v-show="isEditing" @click="toggleStatus"> 
    </div>

    <ul class="msg_list">
      <li class="msg_item" v-for="(item,index) in  msgList" :key="index" @click="clickItem(item,index)">
        <div class="select_btn" v-if="isEditing">
          <span class="active_dot" v-show="item.flag"></span>
        </div>
        <div class="msg_left">
           <img src="../../../static/img/avatar.jpeg" alt=""> 
           <span class="new_msg_dot" v-if="item.isNew"></span>
        </div>
        <div class="msg_right">
          <div class="msg_right_top">
            <span class="user_name">朱两边</span>
            <span class="msg_time">2019/09/30 11:25</span>
          </div>
          <div class="msg_right_bottom">
            <span class="msg_content">我说的话我说的话我说的话我说的话我说的话我说的话我说的话我说的话</span>
          </div>
        </div>
      </li>
 
    </ul>

    <!-- <div class="no_data_tips" v-if="customerOrders.length == 0 && !isLoading">
      <img class="no_data_img" src="../../../static/img/no_data_tips.png">
      <span>{{i18n.No_relevant_data}}</span>
    </div>    -->

    <van-dialog id="van-dialog"/>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import util from '../../utils/index.js';
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data(){
    return{
      userId:'',
      isEditing:false,
      msgList:[{flag:false,isNew:true},{flag:false,isNew:false},{flag:false,isNew:false},]
    }
  },
  computed: {
    ...mapState({
      isX: state => state.counter.isX,
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    selectedMsgList(){
      let list = this.msgList.filter((item)=>item.flag);
      return list;
    }
  },

  mounted(){

  },
  onLoad(options){


  },
  methods: {
    toggleStatus(){
      if(this.isEditing){
          if(this.selectedMsgList.length > 0){
            this.confirmDelete();
            return;
          }
      };
      this.isEditing = !this.isEditing;
    },
    confirmDelete(){
      Dialog.confirm({
        title: '确认删除',
        message: '确认后将删除选择的问候',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(() => {
        // this.$http.request({
        //   url:'UserNotSureOrderInfo',
        //   data:this.orderId*1,
        //   flyConfig:{
        //     method: 'post'
        //   }
        // }).then(res => {
        //   if(res.code == 1){
        //     this.getOrderDetail();
        //   }
        // })
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1500
        });
        this.isEditing = flase;
      }).catch(() => {
        this.cleanFlag();
        this.isEditing = false;
      });
    },
    cleanFlag(){
      this.msgList.forEach(item => {
        item.flag = false;
      });
    },
    clickItem(item,index){
      if(this.isEditing){
        this.changeSelected(item,index);
      }else{
        this.$router.push({path:'/pages/chatRoom/index',query:{
            userId:this.userData.userId,
            // expertId:this.expertId,
            // cost:this.expertData.oneOfCost
          }
        })
      }
    },
    changeSelected(item,index){
      this.msgList[index].flag = !this.msgList[index].flag;
    }

  },
  onHide(){
  
  }
}
</script>

<style lang="less">
.white_bg{
  min-height: 100%;
  background-color: #fff;
}
.action_bar{
  padding:0 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  img{
    width: 20px;
    height: 20px;;
  }
}

.msg_list{
  padding:0 20px;
  padding-bottom: 30px;
  .msg_item{
    height: 64px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    .select_btn{
      width: 12px;
      height: 12px;
      border-radius: 6px;
      border:1px solid #aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      .active_dot{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #1fb7b6;
      }
    }
    .msg_left{
      position: relative;
      margin-right: 10px;
      img{
        width: 40px;
        height: 40px;
        border-radius:50%;
      }
      .new_msg_dot{
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #F95454;
        top:-3px;
        right: -3px;
      }
    }
    .msg_right{
      flex: 1;
      .msg_right_top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        .user_name{
          font-size: 14px;
          line-height: 20px;
          color: #333;
        }
        .msg_time{
          font-size: 12px;
          line-height: 17px;
          color: #999;
        }

      }
      .msg_right_bottom{
        display: flex;
    
        .msg_content{
          color: #999;
          width: 220px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

    }

  }
}

</style>
