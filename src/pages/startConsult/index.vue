<template>
  <div class="container">
    <div class="experts_item">
      <div class="top_block">
        <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
        <div class="top_block_right">
          <div class="experts_msg1">
            <div class="experts_name">朱两边<span>(高级财务专家)</span></div>
            <span class="consult_msg"><img class="query_icon" src="../../../static/img/query_icon.png">咨询流程</span>
          </div>
          <div class="experts_msg2">
            <span class="respond_time"><span>5</span>分钟内回应，最快<span>12</span>小时作答</span>
          </div>
          <div class="experts_msg3">
            <div class="experts_location">
              <img src="../../../static/img/location_icon.png">杭州
            </div>
            <span class="devide_line"></span>
            <div class="experts_experience">
              <img src="../../../static/img/time_icon.png">3-5年工作经验
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="order_form_panel">
      <div class="panle_block">
        <div class="block_title">选择节数<span>(首次咨询建议选择1节)</span></div>
        <div class="class_num_block">
          <van-stepper
            :value="classNum"
            integer
            min="1"
            max="99"
            step="1"
            @change="onClassNumChange"
          />
          <div class="cost_tips">
            预计费用<span>{{40*classNum}}</span>元
          </div>
        </div>
      </div>
      <div class="panle_block">
        <div class="block_title">问题内容</div>
        <div class="problem_content">
          <textarea  cols="30" rows="10" placeholder="请输入咨询问题内容"></textarea>
        </div>
      </div>
      <div class="panle_block">
        <div class="block_title">其他备注</div>
        <div class="problem_content">
          <textarea  cols="30" rows="10" placeholder="请输入相关备注，帮助专家理解问题"></textarea>
        </div>
      </div>
      <div class="panle_block npb">
        <div class="block_title">问题附件</div>
        <div class="problem_content">
          <div class="files_group">
              <span class="title">图片</span>

              <div class="img_file_item">
               <img class="img_file" src="../../../static/img/avatar.jpeg" alt="">
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" alt="">
              </div>
             
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png">
          </div>
          <div class="files_group" style="padding-top: 15px;">
             <span class="title" style="top:22px;">文件</span>

              <div class="pdf_file_item">
               <img class="pdf_icon" src="../../../static/img/pdf_icon.png" alt="">
               <div class="pdf_name">文件名称文件名称文件名称文件名称</div>
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" alt="">
              </div>
          
             <img  class="add_files_icon" src="../../../static/img/add_files_icon.png">
          </div>
        </div>
      </div>
    </div>

    <div class="btn_block">
      <div class="btn green large">提交订单</div>
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

// 专家
.experts_name{
  font-size: 16px;
  color: #333;
  span{
    font-size: 13px;
    margin-left: 5px;
    color: #666;
  }
}

.experts_msg2{
  .respond_time{
    font-size: 13px;
    color: #444;
    span{
      font-weight: bold;
    }
  }
}

.experts_item{
  margin-bottom: 0;
  .top_block{
    align-items: flex-start;
    height: 95px;
    .experts_avatar{
      width: 60px;
      height: 60px;
    }
    .top_block_right{
      .experts_msg1{
        .consult_msg{
          display: flex;
          align-items: center;
          .query_icon{
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
      }
    }
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
      .pdf_file_item{
        width: 44px;
        padding:4px;
        border:1px dashed #c6c6c6;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        margin-top: 10px;
        position: relative;
        .pdf_icon{
          height: 25px;
          width: 25px;
        }
        .pdf_name{
          width: 44px;
          font-size: 12px;
          color: #999;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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

.bottom_fixed{
  justify-content: space-between;
  .icon_btns{
    margin-left: 20px;
    display: flex;
    align-items: center;
    .icon_btn{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      img{
        width: 24px;
        height: 24px;
      }
      span{
        font-size: 12px;
        margin-top: 2px;
      }
    }
    

  }
  .action_btn1{
    background-color: #f3fbfb;

  }

}


</style>
