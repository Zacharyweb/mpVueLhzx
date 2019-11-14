<template>
  <div class="container">
    <div class="steps_block">
      <van-steps
        :steps="fillSteps"
        :active="stepFlag"
        :active-color="'#1fb7b6'"
      />
    </div>

    <div class="order_form_panel">
      <div class="panle_block" v-show="stepFlag == 0 || stepFlag == 3">
        <div class="block_title">{{i18n.general}}</div>

        <ul class="form_list">
          <li class="form_item required">
            <div class="item_name">{{i18n.Real_Name}}</div>
            <div class="item_content">
              <input v-model="realName" type="text" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入真实姓名':'please enter'"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.ID_Type}}</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in certType" :key="index" :class="{'active':item.flag}" @click="singleChange('certType',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">{{i18n.ID_number}}</div>
            <div class="item_content">
              <input v-model="certNum" type="text" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入证件号':'please enter'"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item">
            <div class="item_name">{{i18n.alias}}</div>
            <div class="item_content">
              <input type="text" v-model="nickName" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入昵称，用于平台展示':'please enter'" :disabled="isChecked == 'Y'">
            </div>
          </li>
    
          <li class="form_item required">
            <div class="item_name">{{i18n.Mobile_no}}</div>
            <div class="item_content">
              <input type="number" v-model="workPhoneNumber" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入手机号':'please enter'"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">{{i18n.Email}}</div>
            <div class="item_content">
              <input type="text" v-model="emailAddress" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入电子邮箱':'please enter'" :disabled="isChecked == 'Y'" >
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.Language}}({{i18n.multiSelect}})</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in language" :key="index" :class="{'active':item.flag}" @click="multipleChange('language',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">{{i18n.Location}}</div>
            <div class="item_content"  @click="showAreaSelectPanel">
              <span class="select_tips"  v-show="!provice">{{i18n.LANGTYPE == 'cn_j'?'请选择地区':'please select'}}</span>
              <span class="select_content" v-show="provice">{{provice}}{{city?'-' + city:''}}</span>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">{{i18n.Employer}}</div>
            <div class="item_content">
              <input type="text" v-model="companyName" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入工作单位':'please enter'"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">职位</div>
            <div class="item_content">
              <input v-model="companyPosition" type="text" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入职位':'please enter'" :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item no_border required textarea_item">
            <div class="item_name">专业背景</div>
            <div class="item_content">
              <textarea class="more_height" v-model="workDesc" :placeholder="i18n.LANGTYPE == 'cn_j'?'请介绍一下你的专业背景情况，比如教育培训、资质考试、职责职务、专业方面的贡献等':'please enter'" maxlength='-1' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>
        </ul>

        <div class="btn_block" v-show="stepFlag == 0">
          <div class="btn green large" @click="toNextStep(1)">{{i18n.Next}}</div>
        </div>

      </div>

      <div class="panle_block" v-show="stepFlag == 1 || stepFlag == 3">
        <div class="block_title">{{i18n.Professional}}</div>
        <ul class="form_list">
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.Profession}}({{i18n.singleSelect}})</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in major" :key="index" :class="{'active':item.flag}" @click="singleChange('major',index)">{{item.name}}</span>
              </div>
            </div>
          </li>
          
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.Years_of_experience}}({{i18n.singleSelect}})</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in majorYearsDesc" :key="index" :class="{'active':item.flag}" @click="singleChange('majorYearsDesc',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.Industry}}({{i18n.singleSelect}})</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in businessArea" :key="index" :class="{'active':item.flag}" @click="singleChange('businessArea',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.Speciality}}({{i18n.singleSelect}})</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in goodAtBusiness" :key="index" :class="{'active':item.flag}" @click="singleChange('goodAtBusiness',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <!-- <li class="form_item required textarea_item">
            <div class="item_name">领域(可多选，最多5项，最少选一项)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in businessArea" :key="index" :class="{'active':item.flag}" @click="multipleChange('businessArea',index,5)">{{item.name}}</span>
              </div>
            </div>
          </li> -->

          <!-- <li class="form_item required textarea_item textarea_item">
            <div class="item_name">擅长业务(最多填五项，最少填一项)</div>
            <div class="item_content input_group_item">
              <span class="input_index">1、</span> <input v-model="gootAtList[0]" placeholder="例：申请高新企业税收优惠... " maxlength='150' :disabled="isChecked == 'Y'"></input>
            </div>
            <div class="item_content input_group_item">
              <span class="input_index">2、</span> <input v-model="gootAtList[1]" placeholder="例：税收检查攻略，... " maxlength='150' :disabled="isChecked == 'Y'"></input>
            </div>
            <div class="item_content input_group_item">
              <span class="input_index">3、</span> <input v-model="gootAtList[2]" placeholder="例：VIE结构，..." maxlength='150' :disabled="isChecked == 'Y'"></input>
            </div>
            <div class="item_content input_group_item">
              <span class="input_index">4、</span> <input v-model="gootAtList[3]" placeholder="例：总部费用分摊税收，... " maxlength='150' :disabled="isChecked == 'Y'"></input>
            </div>
            <div class="item_content input_group_item">
              <span class="input_index">5、</span> <input v-model="gootAtList[4]" placeholder="例：股权激励规划，... " maxlength='150' :disabled="isChecked == 'Y'"></input>
            </div>
          </li> -->

          <li class="form_item required textarea_item">
            <div class="item_name">一句话</div>
            <div class="item_content">
              <textarea v-model="lifeAndFeelDesc" class="more_height" :placeholder="i18n.LANGTYPE == 'cn_j'?'请用一句话告诉用户你最擅长的业务、你最强的能力或你最大的优势，以便用户能快速找到他们需要最好的资源。（限24个字）':'please enter'"  maxlength='24' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">服务特长</div>
            <div class="item_content">
              <textarea class="more_height" v-model="policyInterpretation" :placeholder="i18n.LANGTYPE == 'cn_j'?'请描述你最拿手的业务或你最希望提供的服务，比如申请税收优惠':'please enter'" maxlength='-1' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <div class="panle_block hb">
            <div class="block_title">
              <span>{{i18n.external_links}}</span>
              <div class="more_explain">
                <p>{{i18n.as_works_link}}</p>
              </div>
            </div>
            <ul class="link_list">
              <li class="link_item" v-for="(item,index) in outLink" :key="index">
                <div class="item_left">
                   <span>{{i18n.link_name}}</span> 
                   <input v-model="item.name" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入链接名称':'please enter'" :disabled="isChecked == 'Y'">
                </div>
                <div class="item_right">
                   <span>{{i18n.link_url}}</span> 
                   <input v-model="item.link" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入链接地址':'please enter'" :disabled="isChecked == 'Y'">
                </div>
                <img class="delete_icon" src="../../../static/img/delete_icon.png" @click="deleteOutLinkItem(index)">
              </li>
              
              <li class="add_item" @click="addOutLinkItem" v-if="outLink.length < 5">
                <img src="../../../static/img/add_icon.png">
              </li>
            </ul>
          </div>

          <div class="panle_block hb nb">
            <div class="block_title">
              <span>{{i18n.upload_photos}}</span>
              <div class="more_explain">
                <p>{{i18n.LANGTYPE == 'cn_j'?'专业证照、行业合影等与你专业有关的照片':'such as professional license'}}</p>
              </div>
            </div>
            <div class="problem_content">
              <div class="files_group">
                  <div class="title">{{i18n.Photos}}</div>
                  <div class="img_file_item" v-for="(item,index) in photosList" :key="index">
                    <img class="img_file" :src="item">
                    <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePhoto(index)">
                  </div>
                  <img  class="add_files_icon" src="../../../static/img/add_files_icon.png" v-show="photosList.length < 5" @click="upLoadPhoto">
              </div>
            </div>
          </div>
        </ul>
        <div class="btn_block" v-show="stepFlag == 1">
          <div class="btn green large plain" @click="toNextStep(0)">{{i18n.Prev}}</div>
          <div class="btn green large" @click="toNextStep(2)">{{i18n.Next}}</div>
        </div>
      </div>
      
     
    <div v-show="stepFlag == 2 || stepFlag == 3">
      <div class="panle_block">
        <div class="block_title">
          <span>{{i18n.advisory_settings}}</span>
          
        </div>
        <ul class="form_list">
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.response_time}}<span>(收到订单后到回复是否接单的时间)</span></div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in responseTime" :key="index" :class="{'active':item.flag}" @click="singleChange('responseTime',index)">{{item.name}}</span>
              </div>
            </div>
          </li>
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">{{i18n.answer_time}}<span>(接单后直至回复作答的时间)</span></div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in answeringTime" :key="index" :class="{'active':item.flag}" @click="singleChange('answeringTime',index)">{{item.name}}</span>
              </div>
            </div>
          </li>
          <li class="form_item required textarea_item">
            <div class="item_name">每次收费人民币：{{oneOfCost}}元</div>
            <!-- <div class="item_content">
              <input v-model="oneOfCost" type="digit" :placeholder="i18n.LANGTYPE == 'cn_j'?'请输入每节收费金额':'please enter'" :disabled="isChecked == 'Y'">
            </div> -->
          </li>
          <li class="explain_item">看到提问订单后，需要提价的，可要求修改订单，征得用户同意后生效。</li>
        </ul>
      </div>

      <div class="panle_block hb nb">
        <div class="block_title">上传二维码</div>
        <div class="problem_content">
          <div class="files_group">
              <span class="title required">{{i18n.QR_Code}}</span>
              <div class="img_file_item" v-for="(item,index) in paymentCodeList" :key="index">
                <img class="img_file" :src="item">
                <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePaymentCode(index)">
              </div>
              <img  class="add_files_icon" src="../../../static/img/add_files_icon.png" v-show="paymentCodeList.length < 1" @click="upLoadPaymentCode">
          </div>
        </div>
        <div class="explain_item">
          <p>打开微信后，请按下面操作：</p>
          <p>我 -> 支付 -> 收付款 -> 二维码收款 -> </p>
          <p>保存收款码 -> 打开相册 -> WeChat 相簿 -> 上传二维码</p>
        </div>
      </div>

      <div class="panle_block" v-show="stepFlag == 3">
        <div class="block_title">
          <span>{{i18n.Acknowledge}}：</span>
        </div>
        <ul class="form_list" v-if="i18n.LANGTYPE == 'cn_j'">
           <li class="form_item tags_item all_text_item">
              <p>《问税易》是由我们（杭州联询商务信息咨询有限公司）开发和运营的一款应用。这应用仅作为工具让你能联系到用户。</p>

              <p class="mt5">我们与你不存在任何雇佣或劳务关系。</p>
              <p>你以个人身份为用户提供服务。</p>
              <p>一切你为用户提供的服务与我们无关。</p>

              <p class="mt5">你通过《问税易》给用户的作答或建意，只供参考之用。</p>
              <p>我们对你所有的作答或表述均不承担任何责任。</p>
              <p>任何用户因采用了你的作答或表述而产生的后果一律与我们无关。</p>
              <p>如除了作答外，用户需要你为他们发表监证意见或提供更多的服务，请另行与用户商议。</p>

              <p class="mt5">使用这款应用即代表你同意《问税易》用户协议，并承诺不通过《问税易》进行任何有违国家法律法规的操作，包括但不限于各种非法违规的问答或建议。</p>
            
              <p class="mt5">如有发现违法违规行为，请及时举报。</p>
              <p>客服邮箱：advisorymadeeasy@163.com</p>
          </li>
        </ul>
        <ul class="form_list" v-else>
           <li class="form_item tags_item all_text_item">
              <p>Using this app does not constitute any employment or labor relationship whatsoever between you and us.。</p>
              <p>We are not responsible for any liabilities arising from any of the answers or opinions given by you.</p>
              <p>We shall not be responsible for any consequences as a result of user's act following your answer or opinion.</p>
              <p>We shall not be responsible for any debts arising from other users as a result your usage of this app.  You shall resolve the debt issues yourself.</p>
              <p>If you are asked to provide any verification or testimony, please do not use this app.</p>
              <p>You must not conduct any activities, including but not limited to unlawful answers and payments, that are in violation of the State laws and regulations.</p>
              <p>Please report as soon as any unlawful acts are noticed.</p>
              <p>Compliant and report email:xxxxxxxx</p>
          </li>
        </ul>
      </div>
        
      <div class="agree_bar"  v-show="stepFlag == 3">
        <span class="custom_checkbox" :class="{'active':isReadSelect}" @click="isReadSelect = !isReadSelect" style="margin-right:20px;">
          {{i18n.LANGTYPE == 'cn_j'?'阅读并同意专家的使用规则':'I have read and agreed to the requirements of being registered as an advisor'}}
        </span>
      </div>
     
      <div class="btn_block">
        <div class="btn green large plain" v-show="stepFlag == 2" @click="toNextStep(1)">{{i18n.Prev}}</div>
        <div class="btn green large" v-show="stepFlag == 2"  @click="toNextStep(3)">{{i18n.Next}}</div>
        <div class="btn grey large" v-show="stepFlag == 3 && isChecked == 'Y'" >{{i18n.LANGTYPE == 'cn_j'?'审核中,请等待':'please wait for auditing'}}</div>
        <div class="btn green large plain" v-show="stepFlag == 3 && userData.isExpert != 1" @click="toNextStep(2)">{{i18n.Prev}}</div>
        <div class="btn green large" v-show="stepFlag == 3 && isChecked != 'Y'" @click="submitMsg">{{userData.isExpert != 1?'确认提交':'确认更新'}}</div> 
      </div>
      <div class="check_time_tips"  v-show="stepFlag == 3">{{i18n.LANGTYPE == 'cn_j'?'提交信息后平台将在24小时内完成验证。':'The platform will be validated within 24 hours after submitting information.'}}</div>
    </div> 
  </div>  


  <!-- 地区选择组件 -->
  <div class="area_select_block">
    <div class="mask" @click="areaSelectPanelShow = false" v-show="areaSelectPanelShow"></div>
    <div class="area_select_panel" :class="{'show':areaSelectPanelShow}">
      <van-area :area-list="areaList" :columns-num="2" @confirm="confirmArea" @cancel="areaSelectPanelShow = false"/>
    </div>
  </div>
 

  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import {API, BASE_URL} from  '../../http/api.js'
import AreaList from '../../../static/js/area.js';
export default {
  data(){
    return{
      nickName:'',
      workPhoneNumber:'',
      emailAddress:'',
     
      provice:'',
      city:'',
      companyName:'',
      companyPosition:'',
      workDesc:'',
      major:[],
    
      businessArea:[ ],
      gootAtList:['','','','',''],
      goodAtBusiness:[],
      lifeAndFeelDesc:'',
      policyInterpretation:'',
      outLink:[],
    
      photosList:[],
      realName:'',
    
      certNum:'',
      oneOfCost:35,
      paymentCodeList:[],
     
      isReadSelect:true,
      areaList:AreaList,
      areaSelectPanelShow:false,
      isChecked:'N', // 当前是否是超级管理员审核状态
      isUploadingFile:false,
 
      stepFlag:0,
      openConsultExplain:false
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData,
      i18n: state => state.counter.i18n
    }),
    language:function(){
      if(this.i18n.LANGTYPE == 'cn_j'){
        return [
          {name:'汉语',name2:'Chinese',type:'cn',flag:false},
          {name:'英语',name2:'English',type:'en',flag:false}
        ]
      }else{
        return [
          {name:'Chinese',name2:'汉语',type:'cn',flag:false},
          {name:'English',name2:'英语',type:'en',flag:false}
        ]
      }
    },

    majorYearsDesc:function(){
      if(this.i18n.LANGTYPE == 'cn_j'){
        return [
          {name:'5-10年',name2:'5-10 years',type:'1',flag:false},
          {name:'10-15年',name2:'10-15 years',type:'2',flag:false},
          {name:'15-20年',name2:'15-20 years',type:'3',flag:false},
          {name:'20年以上',name2:'more than 20 years',type:'4',flag:false},
        ]  
      }else{
        return [
          {name:'5-10 years',name2:'5-10年',type:'1',flag:false},
          {name:'10-15 years',name2:'10-15年',type:'2',flag:false},
          {name:'15-20 years',name2:'15-20年',type:'3',flag:false},
          {name:'more than 20 years',name2:'20年以上',type:'4',flag:false},
        ]  
      }
    },

    certType:function(){
      if(this.i18n.LANGTYPE == 'cn_j'){
        return [
          {name:'身份证',name2:'Identity Card',type:'1',flag:false},
          {name:'护照',name2:'Passport',type:'2',flag:false},
          {name:'通行证',name2:'Permit',type:'3',flag:false},
        ]  
      }else{
        return [
          {name:'Identity Card',name2:'身份证',type:'1',flag:false},
          {name:'Passport',name2:'护照',type:'2',flag:false},
          {name:'Permit',name2:'通行证',type:'3',flag:false},
        ]  
      }
    },
    responseTime:function(){
      if(this.i18n.LANGTYPE == 'cn_j'){
        return [
          {name:'5分钟',type:'5',flag:false},
          {name:'15分钟',type:'15',flag:false},
          {name:'30分钟',type:'30',flag:false},
          {name:'1小时',type:'60',flag:false}
        ]  
      }else{
        return [
          {name:'5 minutes',type:'5',flag:false},
          {name:'15 minutes',type:'15',flag:false},
          {name:'30 minutes',type:'30',flag:false},
          {name:'1 hour',type:'60',flag:false}
        ]  
      }
      
    },
    answeringTime:function(){
      if(this.i18n.LANGTYPE == 'cn_j'){
        return [
          {name:'1小时',type:'60',flag:false},
          {name:'4小时',type:'240',flag:false},
          {name:'12小时',type:'720',flag:false},
          {name:'24小时',type:'1440',flag:false},
        ]  
      }else{
        return [
          {name:'1 hour',type:'60',flag:false},
          {name:'4 hours',type:'240',flag:false},
          {name:'12 hours',type:'720',flag:false},
          {name:'24 hours',type:'1440',flag:false}
        ] 
      }
    },

    fillSteps:function(){
        return [
          {
            text: '基础信息'
          },
          {
            text: '业务信息'
          },
          {
            text: '营业设置'
          },
          {
            text: '确认提交'
          }
        ]  
    },
  },
  mounted(){
  
  },
  onLoad(){
    if(this.userData &&  this.userData.isExpert == 1){
      this.stepFlag = 3;
    }
    this.major = [];
    this.businessArea = [];
    this.getAllMajor();
    this.getLhzxBusinessAreas();
    this.getLhzxGoodAtBusiness();
  },
  methods: {
    checkedStatus(){
       if(this.isChecked == 'Y'){
          wx.showToast({
            title: this.i18n.LANGTYPE == 'cn_j'?'审核状态不可更改信息':'information cannot be changed in auditing status',
            icon: 'none',
            duration: 1500
          })
          return false;
      }else{
        return true;
      }
    },
    // 多选项变动
    multipleChange(itemName,index,max){
      if(!this.checkedStatus()) return;
    
      if(!max){
         this[itemName][index].flag =  !this[itemName][index].flag;
      }else{
        let count = 0;
        this[itemName].forEach(item => {
          if(item.flag){
            count++;
          }
        });
        if(count >= max){
          if(this[itemName][index].flag){
            this[itemName][index].flag = false;
          }else{
            wx.showToast({
              title: this.i18n.LANGTYPE == 'cn_j'?'最多只能选' + max + '项':'You can only choose ' + max +  ' items at most',
              icon: 'none',
              duration: 1500
            })
          }
        }else{
          this[itemName][index].flag =  !this[itemName][index].flag;
        }
      }
    },
    // 单选变动
    singleChange(itemName,index){
      if(!this.checkedStatus()) return;
      if(this[itemName][index].flag) return;
      this[itemName].forEach(item => {
        item.flag = false;
      });
      this[itemName][index].flag =  true;
    },

    showAreaSelectPanel(){
      if(!this.checkedStatus()) return;
      this.areaSelectPanelShow = true;
    },
    confirmArea(e){
      let result = e.mp.detail.values;
      this.provice = result[0].name;
      this.city = result[1].name;
      this.areaSelectPanelShow = false;
    },
    upLoadPhoto(){
      if(!this.checkedStatus()) return;
      let that = this;
      this.isUploadingFile = true;
      wx.chooseImage({
        count: 5 - that.photosList.length,
        success(res) {
          that.isUploadingFile = false;
          wx.showLoading({
            title: this.i18n.uploading,
            mask: true
          })

          let tempFilePaths = res.tempFilePaths;
          let dataList = [];

          for(let i = 0;i < tempFilePaths.length; i++){
            let dotSplit = tempFilePaths[i].split('.');
            let l = dotSplit.length;
            let suffix = dotSplit[l-1];
            let fileName = (+new Date()) + (Math.random()*1000).toFixed(0) + '.'+ suffix;
            //同步方法
            let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], 'base64');
            dataList.push({ type: "image",filename: fileName,base64String: base64 })
          }
 
          that.$http.request({
            url:'UploadFile',
            data:dataList,
            flyConfig:{
              method: 'post'
            }
          }).then(result => {
            if(result.code == 1){
              let data = result.data;
              let imgList = [];
              for(let i = 0;i < data.length; i++){
                if(data[i].uploadCode == 1){
                   imgList.push(data[i].data.originalurl);
                }
              }
              that.photosList = [...that.photosList,...imgList];
            }
           
            wx.hideLoading();
          })
        }
      });
    },

    deletePhoto(index){
      if(!this.checkedStatus()) return;
      this.photosList.splice(index,1);
    },
    upLoadPaymentCode(){
      if(!this.checkedStatus()) return;
      let that = this;

      wx.chooseImage({
        count: 1,
        success(res) {
          that.isUploadingFile = false;
          wx.showLoading({
            title: this.i18n.uploading,
            mask: true
          })
          let tempFilePaths = res.tempFilePaths;
          let dotSplit = tempFilePaths[0].split('.');
          let l = dotSplit.length;
          let suffix = dotSplit[l-1];
          let fileName = (+new Date()) + (Math.random()*1000).toFixed(0) + '.'+ suffix;
          //同步方法
          let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
          that.$http.request({
            url:'UploadFile',
            data:[{
              type: "image",
              filename: fileName,
              base64String: base64 
            }],
            flyConfig:{
              method: 'post'
            }
          }).then(result => {
            if(result.code == 1){
              let data = result.data;
              if(data[0].uploadCode == 1){
                that.paymentCodeList = [data[0].data.originalurl];
              }else{
                this.showToast(this.i18n.upload_failed);
              }
            }
            wx.hideLoading();
          })
        }
      });

    },
    deletePaymentCode(){
      if(!this.checkedStatus()) return;
      this.paymentCodeList = [];
    },
    deleteOutLinkItem(index){
      if(!this.checkedStatus()) return;
      this.outLink.splice(index,1);
    },
    addOutLinkItem(){
      if(!this.checkedStatus()) return;
      this.outLink.push({name:'',link:''});
    },
    getAllMajor(){
      this.major = [];
      this.$http.request({
        url:'GetAllMajor',
      }).then(res => {
        res.data.forEach((item)=>{
         this.major.push({name:item,flag:false});
        })
        if(this.businessArea.length && this.goodAtBusiness.length){
          this.getInitData();
        }
      })
    },

    getLhzxBusinessAreas(){
      this.businessArea = [];
      this.$http.request({
        url:'GetLhzxBusinessAreas',
      }).then(res => {
        res.data.forEach((item)=>{
          this.businessArea.push({ name:item.businessAreaName,id:item.id, flag:false});
        })
        if(this.major.length && this.goodAtBusiness.length){
         this.getInitData();
        }
      })
    },
    getLhzxGoodAtBusiness(){
      this.goodAtBusiness = [];
      let that = this;
      that.$http.request({
        url:'GetLhzxGoodAtBusiness',
        flyConfig:{
          method: 'get'
        }
      }).then(res => {
        res.data.forEach(item => {
          this.goodAtBusiness.push({name:item.goodAtBusinessName,id:item.id, flag:false})
        }); 
        if(this.major.length && this.businessArea.length){
         this.getInitData();
        }
      })
    },

    getInitData(){
      let url = API['GetUserDetail'] + this.userData.userId;
      this.$http.request({
        url:url,
      }).then(res => {
        let result = res.data;
        this.nickName = result.nickName;
        this.workPhoneNumber = result.workPhoneNumber;
        this.emailAddress = result.emailAddress;

        let address = result.address.split('-');
        this.provice = address[0];
        this.city = address[1];

        this.companyName = result.companyName;
        this.companyPosition = result.companyPosition;
     
        this.lifeAndFeelDesc = result.lifeAndFeelDesc;
        this.policyInterpretation = result.policyInterpretation;
        this.workDesc = result.workDesc;
        this.realName = result.realName;
        this.certNum = result.certNum;
        // this.oneOfCost = result.oneOfCost;
        this.oneOfCost = 35;

        this.paymentCodeList = [result.paymentCode];
 
        let photosList = [];
        result.userFiles.forEach((item)=>{
          photosList.push(item.fileUrl);
        })
        this.photosList = photosList;

        let language = result.language.split('|zxt|');
        this.language.forEach((item)=>{
          language.forEach((item2)=>{
            if(item.name == item2 || item.name2 == item2){
              item.flag = true;
            }
          })
        });
       
        // this.gootAtList = result.goodAtBusiness.split('|zxt|');

        let outLink;
        if(result.outLink){
          outLink = result.outLink.split('|zxt|');
        }else{
          outLink =[];
        }
     
        this.outLink = outLink.map((item)=>{
          return JSON.parse(item);
        });

        let major = result.major;
        this.major.forEach((item)=>{
          if(item.name == major){
            item.flag = true;
          }
        });

        let majorYearsDesc = result.majorYearsDesc;
        this.majorYearsDesc.forEach((item)=>{
          if(item.name == majorYearsDesc || item.name2 == majorYearsDesc){
            item.flag = true;
          }
        });
        
        // let businessArea = result.businessArea.split('|zxt|');
        let businessArea = [result.businessArea];

        this.businessArea.forEach((item)=>{
          businessArea.forEach((item2)=>{
            if(item.name == item2){
              item.flag = true;
            }
          })
        });

        // let goodAtBusiness = result.goodAtBusiness.split('|zxt|');
        let goodAtBusiness = [result.goodAtBusiness];
        this.goodAtBusiness.forEach((item)=>{
          goodAtBusiness.forEach((item2)=>{
            if(item.name == item2){
              item.flag = true;
            }
          })
        });

        let certType = result.certType;
        this.certType.forEach((item)=>{
          if(item.name == certType || item.name2 == certType){
            item.flag = true;
          }
        });

        let responseTime = result.responseTime;
        this.responseTime.forEach((item)=>{
          if(item.type == responseTime){
            item.flag = true;
          }
        });

        let answeringTime = result.answeringTime;
        this.answeringTime.forEach((item)=>{
          if(item.type == answeringTime){
            item.flag = true;
          }
        });
        this.isReadSelect = true;
      })
    },
    checkData(){
      if(!this.realName){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请填写真实姓名':'please enter Real Name');
        return false;
      }

      let certType = this.certType.filter((item)=>{
        return item.flag;
      });
      if(certType.length > 0){
        certType = certType[0].name;
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择证件类型':'please enter ID Type');
        return false;
      }

      if(!this.certNum){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请填写证件号':'please enter ID number');
        return false;
      }


      if(!this.workPhoneNumber){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请输入手机号':'please enter Mobile no.');
        return false;
      }
      let mobileReg = /^(1[345789]\d{9})$/;
      if(!mobileReg.test(this.workPhoneNumber)){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'手机号格式错误':'Mobile no. format error');
        return false;
      }

      if(!this.emailAddress){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请输入电子邮箱':'please enter Email');
        return false;
      }

      let emailReg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if(!emailReg.test(this.emailAddress)){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'电子邮箱格式错误':'Email format error');
        return false;
      }

      let language = this.language.filter((item)=>{
        return item.flag;
      });

      if(language.length > 0){
        language = language.map((item)=>{
         return item.name; 
        });
        language = language.join('|zxt|')
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择语言':'please select Language');
        return false;
      }

      if(!this.provice || !this.city ){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择所在地区':'please select Location');
        return false;
      }
      let address = this.provice + '-' + this.city;

      if(!this.companyName){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请输入工作单位':'please enter Employer');
        return false;
      }

      if(!this.companyPosition){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请输入职务':'please enter position');
        return false;
      }



      let major = this.major.filter((item)=>{
        return item.flag;
      });

      if(major.length > 0){
        major = major[0].name;
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择专业':'please select Profession');
        return false;
      }

      let majorYearsDesc = this.majorYearsDesc.filter((item)=>{
        return item.flag;
      });

      if(majorYearsDesc.length > 0){
        majorYearsDesc = majorYearsDesc[0].name;
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择从事专业年限':'please select Years of experience');
        return false;
      }

      let businessArea = this.businessArea.filter((item)=>{
        return item.flag;
      });

      if(businessArea.length > 0){
        businessArea = businessArea.map((item)=>{
         return item.name; 
        });
        // businessArea = businessArea.join('|zxt|');
        businessArea = businessArea.join('');
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择行业':'please select Industry');
        return false;
      }


      let goodAtBusiness = this.goodAtBusiness.filter((item)=>{
        return item.flag;
      });

      if(goodAtBusiness.length > 0){
        goodAtBusiness = goodAtBusiness.map((item)=>{
          return item.name; 
        });
        // goodAtBusiness = goodAtBusiness.join('|zxt|');
        goodAtBusiness = goodAtBusiness.join('');

      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择科室':'please select Speciality');
        return false;
      }

      // let goodAtBusiness = this.gootAtList.filter((item)=>{
      //   return item;
      // });
      // if(goodAtBusiness.length > 0){
      //   goodAtBusiness = goodAtBusiness.join('|zxt|');
      // }else{
      //   this.showToast('请至少填写一项擅长业务');
      //   return false;
      // }

      let outLink;
      if(this.outLink.length > 0){
        let outLinkFlag = this.outLink.every((item)=>{
          return item.name && item.link;
        });
        if(!outLinkFlag){
          this.showToast(this.i18n.LANGTYPE == 'cn_j'?'外部链接未填写完整':'external links unfinished');
          return false;
        }
        outLink = this.outLink.map((item)=>{
         return JSON.stringify(item); 
        });
        outLink = outLink.join('|zxt|');
      }else{
        outLink = '';
      }

     
      
      let userFiles  = [];
      if(this.photosList.length > 0){
         this.photosList.forEach((item)=>{
           userFiles.push({userId:this.userData.userId,fileUrl:item})
         })
      }

      let responseTime = this.responseTime.filter((item)=>{
        return item.flag;
      });
      if(responseTime.length > 0){
        responseTime = responseTime[0].type;
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择接单时间':'please select response time');
        return false;
      }

      
      let answeringTime = this.answeringTime.filter((item)=>{
        return item.flag;
      });
      if(answeringTime.length > 0){
        answeringTime = answeringTime[0].type;
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请选择作答时间':'please select answer time');
        return false;
      }

     
      if(!this.oneOfCost){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请填写咨询费用':'please enter consultancy fees');
        return false;
      }
      if(this.oneOfCost*1 > 999){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'咨询费用不能大于999元':'consultancy fees should not exceed ￥999');
        return false;
      }

      let paymentCode = '';
      if(this.paymentCodeList.length > 0){
        paymentCode = this.paymentCodeList[0];
      }else{
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请上传收款二维码':'please upload QR_Code');
      }

     
      if(!this.isReadSelect){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请先阅读并同意专家的使用规则':"please read and agree to the expert's rules of use first");
        return false;
      }
      return {
        language,
        address,
        major,
        majorYearsDesc,
        businessArea,
        goodAtBusiness,
        outLink,
        certType,
        paymentCode,
        responseTime,
        answeringTime,
        userFiles,
      }
    },
    submitMsg(){
      let flag = this.checkData();
      if(!flag){
        return;
      }
      this.$http.request({
        url:'PutCurrentUser',
        data: {
          realName: this.realName,
          certType: flag.certType,
          certNum: this.certNum,
          nickName: this.nickName,
          workPhoneNumber: this.workPhoneNumber,
          emailAddress: this.emailAddress,
          language: flag.language,
          address: flag.address,
          companyName: this.companyName,
          companyPosition: this.companyPosition,
          workDesc:this.workDesc,
          major:flag.major,
          majorYearsDesc: flag.majorYearsDesc,
          businessArea: flag.businessArea,
          goodAtBusiness: flag.goodAtBusiness,
          lifeAndFeelDesc: this.lifeAndFeelDesc,
          policyInterpretation: this.policyInterpretation,
          outLink:flag.outLink,
          userFiles:flag.userFiles,
          responseTime: flag.responseTime*1,
          answeringTime: flag.answeringTime*1,
          oneOfCost: this.oneOfCost *1,
          paymentCode: flag.paymentCode,
          isReadSelect: this.isReadSelect?1:0,
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
            this.showToast(this.i18n.LANGTYPE == 'cn_j'?'提交成功，请等待审核~':'submit successfully');
            setTimeout(()=>{
              wx.switchTab({
                url: '/pages/mine/index'
              });
            },1500)
        } 
      })
    },

    toNextStep(flag){
      this.backTop();
      this.stepFlag = flag;
      if(this.stepFlag == 3){
        this.showToast(this.i18n.LANGTYPE == 'cn_j'?'请再次确认填写的信息~':'please reconfirm information');
      }
    },

    backTop(){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
   ,
  onPullDownRefresh() {
  //to do
  wx.stopPullDownRefresh();
  } 
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
    width: 160px;
    height: 45px;
    margin-left: 7px;
  }
}
.check_time_tips{
  padding:10px;
  font-size: 12px;
  text-align: center;
  color: #999;
}
.steps_block{
  padding:5px 10px;

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
    &.nb{
      border-bottom:0;
    }
    .explain_item{
      padding: 10px 15px;
      font-size: 13px;
      border-bottom: 1px solid #ebedf0;
      line-height: 18px;
      color: #666;
    }
  }

  .block_title{
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
    display: flex;
    white-space: nowrap;
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
      padding-bottom: 20px;
      border-bottom: 1px solid #ebedf0;
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
    padding: 12px 15px;
    box-sizing: border-box;
    font-size: 15px;
    display: flex;
    border-bottom: 1px solid #ebedf0;
    line-height: 28px;
    .item_name{
       width: 110px;
       position: relative;
       input{
         width: 75px;
       }
       span{
          font-size: 12px;
          color: #666;
          margin-left: 10px;
          font-weight: normal;
          padding-top: 2px;
       }
    }
    &.no_border{
      border-bottom: 0;
    }
    &.no_paddingtop{
      padding-top: 0;
    }
    &.tags_item{
      padding-bottom: 0;
    }
    &.required > .item_name::before {
      content: '*';
      position: absolute;
      left: -10px;
      top:0;
      font-size: 15px;
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
          height: 30px;
          padding:0 12px;
          border:1px solid #ccc;
          color: #ccc;
          border-radius: 4px;
          font-size: 13px;
          margin-right: 10px;
          margin-bottom: 12px;
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
      &.input_group_item{
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        .input_index{
          font-size: 13px;
        }
        input{
          //  background-color: #fbfbfb;
           background-color: #fff;
           border:1px solid #ccc;
           padding: 10px;
           border-radius: 3px;
        }
      }
    }
    &.textarea_item{
      flex-direction: column;
      .item_name{
        width: 100%;
      }
      .item_content{
        padding-top: 10px;
        textarea{
          box-sizing: border-box;
          width: 100%;
          height: 72px; 
          // background-color: #fbfbfb;
          background-color: #fff;
          border:1px solid #ccc;
          border-radius: 4px;
          padding:10px;
        }
        textarea.more_height{
           height: 120px; 
        }
      }
    }
    &.all_text_item{
      flex-direction: column;
      padding: 10px 0;
      padding-bottom: 20px;
      p{
        font-size: 13px;
        color: #666;
        &.mt5{
          margin-top: 5px;
        }
      }
    }
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
    height: 44px;
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
    height: 44px;
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
.agree_bar{
  padding-left: 10px;
  margin-top: 10px;
}
.extend_panel{
   padding:5px 5px 0px 5px;
  .panel_top{
    display: flex;
    align-items: center;
    .panel_title{
      font-size: 14px;
      color: #333;
      font-weight: bold;
      display: flex;
      white-space: nowrap;
    }
    .extend_icon{
      width: 10px;
      height: 10px;
      margin-left: 10px;
      transform: rotate(0deg);
      transition: all 0.3s;
      &.open{
        transform: rotate(180deg);
      }
    }
  }
  .form_list{
    .form_item{
      padding: 10px 0;
      font-size: 14px;
      &.no_paddingtop{
        padding-top: 0;
      }
    }
  }
}
.other_explain{
  font-size: 12px;
  color: #666;
  font-weight: normal;
  line-height: 1.5;
  .mt5{
    margin-top: 8px;
  }
}
</style>
