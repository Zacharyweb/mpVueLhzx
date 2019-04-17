<template>
  <div>
    <ul class="router_list">
      <li class="router_item">
        <div class="item_left">服务状态</div>
        <div class="item_right" @click="actionSheetShow = true">
          <span class="status_text">{{statusText}}</span>
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
export default {
  data () {
    return {
      actionSheetShow:false,
      statusText:'营业中',
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
 
  },
  mounted(){

  },
  methods: {
    onCloseActionSheet(){
      this.actionSheetShow = false;
    },
    onSelectAction(data){
      if(data.mp.detail.targetId == 2){
        this.statusText = '休息至下次登入';
      }else if(data.mp.detail.targetId == 3){
        this.statusText = '休息至明早8:00';
      }else{
        this.statusText = '营业中';
      }
      this.actionSheetShow = false;
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
