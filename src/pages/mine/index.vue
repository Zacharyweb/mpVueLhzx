<template>
  <div>
    <div class="mine_top_block">
      <div class="msg_icon_box" v-if="userData && userData.accessToken">
        <img class="msg_icon" src="../../../static/img/msg_icon.png" @click="toMsgList">
        <span class="new_msg_dot"></span>
      </div>
      
      <img class="bg_img" src="../../../static/img/center_bg2.png">
      <div class="mine_msg">
        <img class="mine_avatar" v-if="userData && userData.avatarUrl" :src="userData.avatarUrl">
        <img class="mine_avatar" v-else src="../../../static/img/df_avatar.jpg">
        <div class="login_block" v-if="!userData || !userData.accessToken">
          <div class="no_login_tip">{{i18n.not_logged_in}}</div>
          <div class="action_btn" @click="toLoginPage">{{i18n.login_or_register}}</div>
        </div>

        <div class="mine_txt_msg" v-if="userData && userData.accessToken">
          <div v-if="userData.isExpert == 1">
            <div class="mine_txt_line">
               <span class="mine_nick">{{userData.nickName}}</span>
            </div>
            <div class="mine_txt_line mt-10"  @click="linkTo('/pages/set/index')" v-show="userData.workStatus">
              <span class="mine_status" v-if="userData.workStatus == 1">{{i18n.Open}}</span>
              <span class="mine_status" v-else-if="userData.workStatus == 3">{{i18n.Rest_until_tomorrow}}</span>
              <span class="mine_status" v-else>{{i18n.Closed}}</span>
              <img class="arrow_icon" src="../../../static/img/arrow_down.png">
            </div>
          </div>

          <div v-else>
            <div class="mine_txt_line">
               <span class="mine_nick">{{userData.nickName}}</span>
            </div>
            <div class="mine_txt_line mt-10">
              <span class="mine_status">{{i18n.ordinary_users}}</span>
            </div>
          </div>
        </div>
      </div>

      <form  @submit="addUserFormId" :report-submit="true" v-if="userData && userData.accessToken">
        <div class="mine_account">
            <div class="mine_amount">
              <div class="item_name">{{i18n.LANGTYPE == 'cn_j'?'剩余推送消息通知次数':'Number of Remaining Push Message Notifications'}}<span class="amount">{{noticeNum}}</span></div>
            </div>
            <div class="action_btns">
              <button class="action_btn" form-type="submit">{{i18n.increase}}</button>
              <!-- <div class="action_btn" @click="linkTo('/pages/billList/index')">账单明细</div> -->
            </div>
        </div>
      </form>
    </div>

    <ul class="router_list">
      <li class="router_item" @click="linkTo('/pages/baseMsg/index',true)">
        <div class="item_left">
          <img src="../../../static/img/center_icon6.png">
          本人
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/myRelation/index',true)">
        <div class="item_left">
          <img src="../../../static/img/center_icon2.png">
          关系
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/myExpert/index',true)">
        <div class="item_left">
          <img src="../../../static/img/center_icon1.png">
          专家
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/myCustomer/index',true)" v-if="userData && userData.isExpert == 1">
        <div class="item_left">
          <img src="../../../static/img/center_icon2.png">
          客户
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>

  
      <li class="router_item" @click="linkTo('/pages/set/index',true)">
        <div class="item_left">
          <img src="../../../static/img/center_icon5.png">
          设置
        </div>
        <div class="item_right">
          <img  src="../../../static/img/arrow_right.png">
        </div>
      </li>
      
      <li class="router_item" @click="linkTo('/pages/helpCenter/index')">
        <div class="item_left">
          <img src="../../../static/img/center_icon7.png">
           帮助
        </div>
        <div class="item_right">
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
import {API, BASE_URL} from  '../../http/api.js'
import { setTimeout } from 'timers';
export default {
 data () {
    return {
      mineData:{},
      noticeNum:0
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    })
  },
  onShow(){
    this.getMineData();
    console.log(this.userData);
    // wx.showTabBarRedDot({
    //   index: 2,
    // })
  },
  methods: {
    ...mapActions('counter', [
      'updateUserMsg'
    ]),
    getMineData(){
      if(!this.userData){
        return;
      }
      let url = API['GetUserDetail'] + this.userData.userId;
      this.$http.request({
        url:url,
      }).then(res => {
        let result = res.data;
        this.mineData = res.data;
        this.noticeNum = result.noticeNum;
        let data = this.userData || {};
        this.updateUserMsg({
          ...data,
          workStatus:result.workStatus,
          nickName:result.nickName,
          avatarUrl:result.avatarUrl,
          isExpert: result.isExpert,
          aboutUserDesc:result.aboutUserDesc,
          openId:result.openId
        });
      })
    },

    linkTo(path,needLogin){
      if(needLogin){
        if(this.userData && this.userData.accessToken){
          this.$router.push(path);
        }else{
          wx.showToast({
            title: '请先完成登录',
            icon: 'none',
            duration: 1500
          })
        }
      }else{
        this.$router.push(path);
      }
    },
    toLoginPage(){
      this.$router.push({path:'/pages/login/index'});
    },
    toMsgList(){
      this.$router.push({path:'/pages/msgList/index'});
    },
    toLoginByWX(){
      let that = this;
       wx.login({
        success(res) {
          if (res.code) {
            that.$http.request({
              url:'AuthorizedLoginByWx',
              data: {
                Code: res.code,
                NickName: that.userData.nickName,
                AvatarUrl:that.userData.avatarUrl
              },
              flyConfig:{
                headers:{
                  'content-type': 'application/x-www-form-urlencoded',
                },
                method: 'post'
              }
            }).then(res => {
              that.$router.push({path:'/pages/login/index'});
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    addUserFormId(e){
      console.log(e);
      let that = this;
      that.$http.request({
        url:'AddUserFormId',
        data: [{
          userId: that.userData.userId,
          userOpenId: that.userData.openId,
          formId: e.mp.detail.formId,
        }],
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
          this.noticeNum = this.noticeNum +1;
        }
      })
    },

    onGotUserInfo(e){
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        let data = this.userData || {};
        this.updateUserMsg({...data,...e.mp.detail.userInfo});
        this.toLoginByWX();
      } else {
      
      }
    },
  }
}
</script>

<style lang="less">
.mine_top_block {
  // height: 126px;
  height: 180px;

  font-size: 14px;
  color: #fff;
  position: relative;
  .bg_img{
    width: 375px;
    // height: 126px;
    height: 180px;
  }

  .msg_icon_box{
    position: absolute;
    top:25px;
    right: 15px;
    z-index: 10;
    .msg_icon{
      width: 28px;
      height: 28px;
    }
    .new_msg_dot{
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #F95454;
      top:0px;
      right: -2px;
    }
  }
  .mine_msg{
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    padding:15px 20px;
    display: flex;
    align-items: center;
    height: 137px;
    .mine_avatar{
      width: 60px;
      height: 60px;
      border-radius: 33px;
      border:3px solid #e6e8eb; 
      margin-right: 15px;
    }
    .mine_txt_msg{
      flex: 1;
      .mine_txt_line{
        display: flex;
        align-items: center;
        .mine_nick{
          font-size: 16px;
          font-weight: bold;
          margin-right: 20px;
        }
        .mine_position{

        }
        .mine_status{
          margin-right: 5px;
        }
        .arrow_icon{
          width: 15px;
          height: 15px;
        }

      }
    }
    .right_arrow{
      width: 16px;
      height: 16px;
    }

    .login_block{

      .no_login_tip{
          font-size: 16px;
          font-weight: bold;
          margin-left: 5px;
      }
      .action_btn{
        height: 25px;
        display: flex;
        align-items: center;
        border: 1px solid #ffe288;
        color: #ffe288;
        padding: 0 8px;
        border-radius: 14px;
        font-size: 14px;
        margin-top: 12px;
      }
    } 
  }
  .mine_account{
      position: absolute;
      top: 100px;
      // top: 20px;
      left: 20px;
      right: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      // border-top: 1px solid #ffe288;
      .mine_amount{
        padding-left: 20px;
        .amount{
           font-size: 18px;
           font-weight: bold;
           margin-left:10px;
          span{
            font-size: 12px;
            font-weight: normal;
          }
        }
        .item_name{
          font-size: 12px;
          // text-align: center;
          // margin-top: 5px;
          width: 200px;
          
        }
      }
      .action_btns{
        display: flex;
      }
      .action_btn{
        height: 25px;
        display: flex;
        align-items: center;
        border: 1px solid #ffe288;
        color: #ffe288;
        padding: 0 8px;
        border-radius: 14px;
             font-size: 14px;
        margin-right: 15px;
      }
  }
}
.router_list{
  background-color: #fff;
  padding:0 15px;
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
      img{
        width: 9px;
        height: 12px;
      }
    }
  }
}
</style>
