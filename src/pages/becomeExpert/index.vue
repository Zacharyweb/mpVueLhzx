<template>
  <div class="container">
    <div class="order_form_panel">
      <div class="panle_block">
        <div class="block_title">基础信息</div>
        <ul class="form_list">
          <li class="form_item required">
            <div class="item_name">昵称(平台上用)</div>
            <div class="item_content">
              <input type="text" placeholder="请输入昵称" :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item required">
            <div class="item_name">姓名</div>
            <div class="item_content">
              <input type="text" placeholder="请输入姓名" :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item required">
            <div class="item_name">手机号</div>
            <div class="item_content">
              <input type="tel" placeholder="请输入手机号"  :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item required">
            <div class="item_name">电子邮箱</div>
            <div class="item_content">
              <input type="text" placeholder="请输入电子邮箱" :disabled="isChecked == 'Y'" >
            </div>
          </li>
          <li class="form_item required tags_item">
            <div class="item_name">语言(可多选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item">汉语</span>
                <span class="tag_item">英语</span>
              </div>
            </div>
          </li>
          <li class="form_item required">
            <div class="item_name">所在地区</div>
            <div class="item_content"  @click="areaSelectPanelShow = true">
              <span class="select_tips"  v-show="!provice">请选择地区</span>
              <span class="select_content" v-show="provice">{{provice}}{{city?'-' + city:''}}{{areaBlock?'-' + areaBlock:''}}</span>
            </div>
          </li>

        
          <li class="form_item required">
            <div class="item_name">工作单位</div>
            <div class="item_content">
              <input type="text" placeholder="请输入工作单位" :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item required">
            <div class="item_name">职务</div>
            <div class="item_content">
              <input type="text" placeholder="请输入职务" :disabled="isChecked == 'Y'">
            </div>
          </li>
       
         
        </ul>
      </div>

      <div class="panle_block">
        <div class="block_title">专业信息</div>
        <ul class="form_list">

          <li class="form_item required tags_item">
            <div class="item_name">专业(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item">税务</span>
                <span class="tag_item">财务</span>
                <span class="tag_item">法务</span>
                <span class="tag_item active">海关</span>
                <span class="tag_item">外汇</span>
                <span class="tag_item">工商</span>
              </div>
            </div>
          </li>
          
          

          <li class="form_item required tags_item">
            <div class="item_name">从事年限(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item">5年以下</span>
                <span class="tag_item">5-10年</span>
                <span class="tag_item">10-20年</span>
                <span class="tag_item active">20年以上</span>
              </div>
            </div>
          </li>

  
          <li class="form_item required textarea_item">
            <div class="item_name">一句话说专业</div>
            <div class="item_content">
              <textarea placeholder="20字以内。例：税务检查，攻守有道"  maxlength='20' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">领域</div>
            <div class="item_content">
              <textarea placeholder="150字以内。例：个人所得税、房产税收..." maxlength='150' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">细分</div>
            <div class="item_content">
              <textarea placeholder="150字以内。例：运输企业、房地产、互联网..." maxlength='150' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">擅长业务</div>
            <div class="item_content">
              <textarea placeholder="150字以内。例：申请高新企业税收优惠... " maxlength='150' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">心得解读</div>
            <div class="item_content">
              <textarea class="more_height" placeholder="例：7号公告对美元基金的影响..." maxlength='-1' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">关于专家</div>
            <div class="item_content">
              <textarea class="more_height" placeholder="请输入自我介绍信息"  maxlength='-1' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

        </ul>
      </div>
      
      <div class="panle_block hb">
        <div class="block_title">
          <span>相关链接</span>
          <div class="more_explain">
            <p>作品链接等</p>
          </div>
        </div>
        <ul class="link_list">
          <!-- <li class="link_item">
            <div class="item_left">
               <span>链接名称</span> 
               <input placeholder="请输入链接名称">
            </div>
            <div class="item_right">
               <span>链接地址</span> 
               <input placeholder="请输入链接地址">
            </div>
            <img class="delete_icon" src="../../../static/img/delete_icon.png">
          </li> -->
          
          <li class="add_item">
            <img src="../../../static/img/add_icon.png">
          </li>
        </ul>
      </div>

      <div class="panle_block hb">
        <div class="block_title">
          <span>上传照片</span>
          <div class="more_explain">
            <p>专业证照、单位合影等</p>
          </div>
        </div>
        <div class="problem_content">
          <div class="files_group">
              <div class="title">相关照片</div>
              <div class="img_file_item" v-for="(item,index) in photosList" :key="index">
               <img class="img_file" :src="item">
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePhoto(index)">
              </div>
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png" v-show="photosList.length < 5" @click="upLoadPhoto">
          </div>
        </div>
      </div>

      <div class="panle_block">
        <div class="block_title">实名信息</div>
        <ul class="form_list">
          <li class="form_item required tags_item">
            <div class="item_name">证件类型</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item">省份证</span>
                <span class="tag_item">护照</span>
                <span class="tag_item">通行证</span>
              </div>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">证件号</div>
            <div class="item_content">
              <input type="text" placeholder="请输入证件号"  :disabled="isChecked == 'Y'">
            </div>
          </li>
        </ul>
      </div>

      <div class="panle_block">
        <div class="block_title">咨询费用信息</div>
        <ul class="form_list">
          <li class="form_item required">
            <div class="item_name">每节(15分钟)收费金额</div>
            <div class="item_content">
              <input type="text" placeholder="请输入每节收费金额，单位(元/节)"  :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item">
            <div class="item_name">支付方式</div>
            <div class="item_content">
              <span>咨询结束后，用户不经平台，直接扫描您的微信收款码转账支付。</span>
            </div>
          </li>
          <li class="form_item">
            <div class="item_name">免单优惠</div>
            <div class="item_content">
              <span>咨询结束后，如果您认为有需要，可在结算前免除咨询费，作为优待客户的一种方式。</span>
            </div>
          </li>
        </ul>
      </div>


      <div class="panle_block hb">
        <div class="block_title">微信收款码</div>
        <div class="problem_content">
          <div class="files_group">
              <span class="title required">收款码</span>
            
              <div class="img_file_item" v-for="(item,index) in paymentCodeList" :key="index">
               <img class="img_file" :src="item">
               <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePaymentCode(index)">
              </div>
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png" v-show="paymentCodeList.length < 1" @click="upLoadPaymentCode">
          </div>
        </div>
      </div>

      <div class="panle_block">
        <div class="block_title">
          <span>咨询承诺</span>
          <div class="more_explain">
            <p>接单承诺：在收到订单后回应是否接单的时间。</p>
            <p>作答承诺：在接单后能交付作答的时间。</p>
          </div>
        </div>
        <ul class="form_list">
           <li class="form_item required tags_item">
            <div class="item_name">接单承诺(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item">1分钟</span>
                <span class="tag_item">5分钟</span>
                <span class="tag_item">15分钟</span>
                <span class="tag_item">30分钟</span>
                <span class="tag_item">1小时</span>
                <span class="tag_item">2小时</span>
                <span class="tag_item">4小时</span>

              </div>
            </div>
          </li>
          <li class="form_item required tags_item">
            <div class="item_name">作答承诺(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item">30分钟</span>
                <span class="tag_item">1小时</span>
                <span class="tag_item">2小时</span>
                <span class="tag_item">4小时</span>
                <span class="tag_item">8小时</span>
                <span class="tag_item">12小时</span>
                <span class="tag_item">24小时</span>
                <span class="tag_item">48小时</span>
              </div>
            </div>
          </li>
          <li class="explain_item">在接到订单看到问题后，需要更多时间作答的，可修改订单信息发送给客户，用户同意修改后的订单后，将按修改后的时间作答。</li>
        </ul>
      </div>

       
      <div class="panle_block">
        <div class="block_title">
          <span>营业状态</span>
          <div class="more_explain">
            <p>营业中：接收和按时回应。</p>
            <p>休息中：不接收任何咨询。</p>
          </div>
        </div>
        <ul class="form_list">
          
          <li class="explain_item">除20:00 - 8:00默认为休息状态外，其他时间均默认为营业状态。专家可随时登入切换状态。</li>
        </ul>
      </div>

    </div>

    <div class="btn_block">
      <div class="btn green large">提交审核</div>
    </div>
    <div class="area_select_block">
      <div class="mask" @click="areaSelectPanelShow = false" v-show="areaSelectPanelShow"></div>
      <div class="area_select_panel" :class="{'show':areaSelectPanelShow}">
        <van-area :area-list="areaList" @confirm="confirmArea" @cancel="areaSelectPanelShow = false"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AreaList from '../../../static/js/area.js';
export default {
  data(){
    return{
      provice:'',
      city:'',
      areaBlock:'',
      areaList:AreaList,
      areaSelectPanelShow:false,
      isChecked:'N', // 当前是否是超级管理员审核状态
      photosList:[],

      paymentCodeList:[]
    }
  },
  computed: {
    ...mapState({

    })
  },
  mounted(){

  },
  methods: {
  
    linkTo(path){
      this.$router.push(path);
    },
  
    confirmArea(e){
      let result = e.mp.detail.values;
      this.provice = result[0].name;
      this.city = result[1].name;
      this.areaBlock = result[2].name;
      this.areaSelectPanelShow = false;
    },
    upLoadPhoto(){
      let that = this;
      wx.chooseImage({
        count: 5 - that.photosList.length,
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          that.photosList = [...that.photosList,...res.tempFilePaths];
          console.log(res);
          // wx.uploadFile({
          //   url: 'https://example.weixin.qq.com/upload',
          //   filePath: tempFilePaths[0],
          //   name: 'file',
          //   formData: {
          //     user: 'test'
          //   },
          //   success(res) {
          //     const data = res.data
          //   }
          // })
        }
      })
    },
    deletePhoto(index){
      this.photosList.splice(index,1);
    },
    upLoadPaymentCode(){
      let that = this;
      wx.chooseImage({
        count: 1 - that.paymentCodeList.length,
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          that.paymentCodeList = [...that.paymentCodeList,...res.tempFilePaths];
        }
      })
    },
    deletePaymentCode(){
      this.paymentCodeList = [];
    }
  },
  
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

.order_form_panel{
    padding:0 15px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 14px;
  .panle_block{
    padding:15px 5px 0px 5px;
    &.hb{
      padding-bottom: 15px;
      border-bottom:1px solid #ebedf0;
    }
  }

  .block_title{
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
    display: flex;
    .more_explain{
      font-size: 12px;
      color: #666;
      margin-left: 10px;
      font-weight: normal;
      padding-top: 2px;
    }
  }

  .problem_content{
    .files_group{
      padding-left: 85px;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .title{
        position: absolute;
        font-size: 14px;
        left: 15px;
        top:12px;
        &.required::before{
          content: '*';
          position: absolute;
          left: -10px;
          top:0;
          font-size: 14px;
          color: #f44;
        }
        .sub_text{
          font-size: 12px;
          color: #999;
        }
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
    &.tags_item{
      padding-bottom: 0;
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
     
      .item_tags{
        display: flex;
        flex-wrap: wrap;
        .tag_item{
          display: flex;
          align-items: center;
          height: 22px;
          padding:0 8px;
          border:1px solid #ccc;
          color: #ccc;
          border-radius: 4px;
          font-size: 13px;
          margin-right: 8px;
          margin-bottom: 10px;
          &.active{
            border-color: #1fb7b6;
            background-color: #1fb7b6;
            color: #fff;
          }
        }
      }
      .select_tips{
        color: #888;
      }
    }
    &.textarea_item{
      flex-direction: column;
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
  .explain_item{
    padding: 10px 15px;
    font-size: 12px;
    border-bottom: 1px solid #ebedf0;
    line-height: 18px;
  }
}

.area_select_block{
  .mask{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);

  }
  .area_select_panel{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    transition: all 0.3s;
    z-index: 2;
  }
  .area_select_panel.show{
    transform: translateY(0);
  }
}

.link_list{
  .link_item{
    margin-top: 10px;
    padding:10px 15px;
    font-size: 14px;
    line-height: 24px;
    background-color: #fbfbfb;
    position: relative;
    .delete_icon{
      position: absolute;
      top:10px;
      right: 10px;
      width: 20px;
      height: 20px;
    }
  }
  .add_item{
     margin-top: 10px;
     background-color: #fbfbfb;
     height: 60px;
     display: flex;
     align-items: center;
     justify-content: center;
     img{
       width: 40px;
       height: 40px;

     }
  }
  .item_left{
    height: 30px;
    display: flex;
    align-items: center;
    span{

    }
    input{
      margin-left: 10px;
      width: 100px;
    }
  }
  .item_right{
    height: 30px;
    display: flex;
    align-items: center;
    span{
     
    }
    input{
      margin-left: 10px;
      flex: 1;
    }
  }

}
</style>
