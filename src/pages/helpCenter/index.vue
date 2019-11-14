<template>
  <div>
    <ul class="router_list">

      <li class="router_item" @click="linkTo('/pages/useNotice/index')">
        <div class="router_top">
          <div class="item_left">使用说明</div>
          <div class="item_right">
            <img  src="../../../static/img/arrow_right.png">
          </div>
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/userHelp/index')">
        <div class="router_top">
          <div class="item_left">常见问题</div>
          <div class="item_right" >
            <img  src="../../../static/img/arrow_right.png">
          </div>
        </div>
      </li>

      <li class="router_item" @click="linkTo('/pages/userProtocol/index')">
        <div class="router_top">
          <div class="item_left">用户协议</div>
          <div class="item_right">
            <img  src="../../../static/img/arrow_right.png">
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
  
  },
  mounted(){
  
  },
  onShow(){
   
  },
  methods: {
    ...mapActions('counter', [
      'updateUserMsg',
      'updateLanguage'
    ]),
    
    linkTo(path){
      this.$router.push(path);
    }, 
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
    padding:8px 0;
    min-height: 30px;
    display: flex;
    align-items: center;
    .router_top{
      flex: 1;
      padding: 0 5px;
      font-size: 14px;
      color: #333;
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
          color: #333;
          margin-right: 10px;
        }
        img{
          width: 9px;
          height: 12px;
        }
      }
    }
   
  }
}
.log_out_btn{
  width: 195px;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fa3200;
  background-color: #fff;
  position: fixed;
  bottom: 50px;
  left: 90px;
}
</style>
