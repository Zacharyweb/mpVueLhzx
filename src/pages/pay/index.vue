<template>
  <div class="container">
    <div class="top_tips">
       <img src="../../../static/img/notice_icon.png">请在24小时内上传转账截图，逾期将不能再使用平台服务。
    </div>
    <div class="order_form_panel">
      <div class="panle_block nb">
        <div class="block_title">结算信息</div>
        <div class="pay_detail">
          <div class="tips1">专家已为您完成作答，订单结算如下：</div>
          <ul class="detail_list">
            <li class="detail_item">
              <span class="item_name">费率：</span>
              <span class="item_content">40元/节</span>
            </li>
            <li class="detail_item">
              <span class="item_name">节数：</span>
              <span class="item_content">2节</span>
            </li>
            <li class="detail_item">
              <span class="item_name">合计：</span>
              <span class="item_content">80元</span>
            </li>
          </ul>
          <div class="tips2">专家的收款二维码已通过公众号发送给您，请先将付款码保存至手机相册，再用微信扫码完成转账支付。</div>
       
        </div>
      </div>
    
      <div class="panle_block npb">
        <div class="block_title">上传转账截图</div>
        <div class="problem_content">
          <div class="files_group">
              <span class="title">转账截图</span>

              <div class="img_file_item">
               <img class="img_file" src="../../../static/img/avatar.jpeg" alt="">
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" alt="">
              </div>
             
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png">
          </div>
         
        </div>
      </div>
    </div>

    <div class="btn_block">
      <div class="btn green large">提交凭证</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      classNum:1,
      currentTab:0,
      collected:false,
      actionSheetShow:false,
      actions:[
        {
          targetId:1,
          name: '在线问答',
          subname: '￥40',
        },
        {
          targetId:2,
          name: '电话约谈',
          subname: '￥40/15分钟',
        },
        {
          targetId:3,
          name: '咨询疑问'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      count: state => state.counter.count
    })
  },
  mounted(){

  },
  methods: {
    ...mapActions('counter', [
      'increment',
      'decrement',
      'getProvince'
    ]),
    onClassNumChange(e){
      console.log(e.mp.detail);

    },
    linkTo(path){
      this.$router.push(path);
    },
    changeTab(num){
      if(this.currentTab == num){
        return;
      }
      this.currentTab = num;
    },
    toContact(){
      this.actionSheetShow = true;
    },
    onCloseActionSheet(){
       this.actionSheetShow = false;
    },
    onSelectAction(data){
      if(data.mp.detail.targetId == 1){
        
      }else if(data.mp.detail.targetId == 2){
        
      }else{

      };
      this.actionSheetShow = false;
    },
  },
  onShow(){
    this.currentTab = 0;
  }
}
</script>

<style lang="less">
.container{
  background-color: #fff;
  padding-bottom: 20px;
}
.btn_block{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .btn{
    width: 345px;
    height: 45px;
  }
}

.top_tips{
  background-color: #f3fbfb;
  height: 28px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding:0 15px;
  color: #1fb7b6;
  img{
    margin-right: 10px;
    width: 16px;
    height: 16px;
  }
}
.order_form_panel{
    padding:0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  .panle_block{
    padding:10px 5px 20px 5px;
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
  .pay_detail{
    font-size: 14px;
    color: #333;
    .tips1{
      margin-bottom: 10px;

    }
    .detail_list{
      .detail_item{
        display: flex;
         margin-bottom: 8px;
      
        .item_name{
         width: 45px;
        }
        .item_content{
          margin-left: 5px;

        }

      }
    }
    .tips2{
      margin-top: 10px;
    }
  }


  .class_num_block{
    display: flex;
    align-items: flex-end;
    .cost_tips{
      font-size: 14px;
      margin-left: 10px;
      color: #666;
      span{
        color: #1fb7b6;
      }
    }
  }

  .problem_content{
    textarea{
      border:1px solid #eee;
      background-color: #fefefe;
      border-radius: 4px;
      width: 100%;
      height: 100px;
      padding:15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    .files_group{
      padding-left: 65px;
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
