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
        <div class="block_title">基础信息</div>

        <ul class="form_list">
          <li class="form_item required">
            <div class="item_name">真实姓名</div>
            <div class="item_content">
              <input v-model="realName" type="text" placeholder="请输入真实姓名"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">证件类型</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in certType" :key="index" :class="{'active':item.flag}" @click="singleChange('certType',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">证件号</div>
            <div class="item_content">
              <input v-model="certNum" type="text" placeholder="请输入证件号"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item">
            <div class="item_name">昵称</div>
            <div class="item_content">
              <input type="text" v-model="nickName" placeholder="请输入昵称，用于平台展示" :disabled="isChecked == 'Y'">
            </div>
          </li>
    
          <li class="form_item required">
            <div class="item_name">手机号</div>
            <div class="item_content">
              <input type="number" v-model="workPhoneNumber" placeholder="请输入手机号"  :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">电子邮箱</div>
            <div class="item_content">
              <input type="text" v-model="emailAddress" placeholder="请输入电子邮箱" :disabled="isChecked == 'Y'" >
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">语言(可多选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in language" :key="index" :class="{'active':item.flag}" @click="multipleChange('language',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">所在地区</div>
            <div class="item_content"  @click="showAreaSelectPanel">
              <span class="select_tips"  v-show="!provice">请选择地区</span>
              <span class="select_content" v-show="provice">{{provice}}{{city?'-' + city:''}}</span>
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">工作单位</div>
            <div class="item_content">
              <input type="text" v-model="companyName" placeholder="请输入工作单位" :disabled="isChecked == 'Y'">
            </div>
          </li>

          <li class="form_item required">
            <div class="item_name">职务</div>
            <div class="item_content">
              <input v-model="companyPosition" type="text" placeholder="请输入职务" :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="form_item no_border required textarea_item">
            <div class="item_name">工作介绍</div>
            <div class="item_content">
              <textarea class="more_height" v-model="workDesc" placeholder="介绍一下与专业工作相关的方方面面，比如：专业的培训、在单位部门的贡献、解决税务争议的窍门、处理涉税问题的心得等" maxlength='-1' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>
        </ul>

        <div class="btn_block" v-show="stepFlag == 0">
          <div class="btn green large" @click="toNextStep(1)">下一步</div>
        </div>

      </div>

      <div class="panle_block" v-show="stepFlag == 1 || stepFlag == 3">
        <div class="block_title">专业信息</div>
        <ul class="form_list">
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">专业(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in major" :key="index" :class="{'active':item.flag}" @click="singleChange('major',index)">{{item.name}}</span>
              </div>
            </div>
          </li>
          
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">从事年限(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in majorYearsDesc" :key="index" :class="{'active':item.flag}" @click="singleChange('majorYearsDesc',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">行业(单选)</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in businessArea" :key="index" :class="{'active':item.flag}" @click="singleChange('businessArea',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required tags_item textarea_item">
            <div class="item_name">科室(单选)</div>
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
              <textarea v-model="lifeAndFeelDesc" class="more_height" placeholder="关于您最擅长的业务或最强的优势，比如，专攻股票税收"  maxlength='30' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">政策解读</div>
            <div class="item_content">
              <textarea class="more_height" v-model="policyInterpretation" placeholder="分享您对个别税收问题的解读，比如，政策出台的背景、对业务的的影响和应对的方法等" maxlength='-1' :disabled="isChecked == 'Y'"></textarea>
            </div>
          </li>

          <div class="panle_block hb">
            <div class="block_title">
              <span>外部链接</span>
              <div class="more_explain">
                <p>作品链接等</p>
              </div>
            </div>
            <ul class="link_list">
              <li class="link_item" v-for="(item,index) in outLink" :key="index">
                <div class="item_left">
                   <span>链接名称</span> 
                   <input v-model="item.name" placeholder="请输入链接名称" :disabled="isChecked == 'Y'">
                </div>
                <div class="item_right">
                   <span>链接地址</span> 
                   <input v-model="item.link" placeholder="请输入链接地址" :disabled="isChecked == 'Y'">
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
        </ul>
        <div class="btn_block" v-show="stepFlag == 1">
          <div class="btn green large plain" @click="toNextStep(0)">上一步</div>
          <div class="btn green large" @click="toNextStep(2)">下一步</div>
        </div>
      </div>
      
     
    <div v-show="stepFlag == 2 || stepFlag == 3">
      <div class="extend_panel">
        <div class="panel_top">
          <span class="panel_title" @click="openConsultExplain = !openConsultExplain">咨询概述</span>
          <img class="extend_icon" @click="openConsultExplain = !openConsultExplain" src="../../../static/img/extend_icon.png" :class="{'open':openConsultExplain}">
        </div>

        <div class="panle_block" v-show="openConsultExplain">
          <ul class="form_list">
            <li class="form_item textarea_item no_paddingtop">
              <div class="item_name">咨询:</div>
              <div class="item_content">
                <span>作为专家，您将通过本平台为用户提供有偿的提问作答服务。</span>
              </div>
            </li>

            <li class="form_item textarea_item">
              <div class="item_name">接单:</div>
              <div class="item_content">
                <div> 
                  <span>在服务时间内，您可收到用户提问的订单。</span>
                </div>
                <div> 
                  <span>您将在接单时间内决定是否接单，您也可提出订单修改。（见注一）</span>
                </div>
              </div>
            </li>

            <li class="form_item textarea_item">
              <div class="item_name">作答:</div>
              <div class="item_content">
                <div> 
                  <span>当您同意接单时，您将在设定的作答时间内未用户的提问作答。</span>
                </div>
                <div> 
                  <span>逾时不作答的，进黑名单。</span>
                </div>
              </div>
            </li>

            <li class="form_item textarea_item">
              <div class="item_name">支付:</div>
              <div class="item_content">
                <div> 
                  <span>作答后，用户将在24小时内通过微信向您直接支付咨询费。用户还可评价您的服务。</span>
                </div>
                <div> 
                  <span>逾时不支付的，进黑名单。</span>
                </div>
              </div>
            </li>

            <li class="form_item textarea_item">
              <div class="item_name">服务时间:</div>
              <div class="item_content">
                <span>平台默认的服务时间为每天早上8:00点至晚上8:00点。您可随时在我的状态里更改。</span>
              </div>
            </li>

            <li class="form_item textarea_item">
              <div class="item_name">介绍问候:</div>
              <div class="item_content">
                <span>在正式提问前，用户可向您发出不计费的即时聊天，方便相互介绍和问候。</span>
              </div>
            </li>

            <li class="other_explain">
              <div class="mt5">注一：</div>
              <div>在看到问题后，如您觉得有需要调整作答时间或费用的，可向用户提出修改订单。在征得用户同意调整后，按修改后订单作答。</div>
              <div class="mt5">注二：</div>
              <div>面单优惠</div>
              <div>这是您向用户提供优惠的一种方式。如果您认为有需要，可在确认收费前免除用户该次咨询收费。</div>
            </li>
          </ul>
        </div>

      </div>

      <div class="panle_block">
        <div class="block_title">咨询设置</div>
        <ul class="form_list">
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">接单时间</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in responseTime" :key="index" :class="{'active':item.flag}" @click="singleChange('responseTime',index)">{{item.name}}</span>
              </div>
            </div>
          </li>
          <li class="form_item required tags_item textarea_item">
            <div class="item_name">作答时间</div>
            <div class="item_content">
              <div class="item_tags">
                <span class="tag_item" v-for="(item,index) in answeringTime" :key="index" :class="{'active':item.flag}" @click="singleChange('answeringTime',index)">{{item.name}}</span>
              </div>
            </div>
          </li>

          <li class="form_item required textarea_item">
            <div class="item_name">每次收费人民币(元)</div>
            <div class="item_content">
              <input v-model="oneOfCost" type="digit" placeholder="请输入每节收费金额"  :disabled="isChecked == 'Y'">
            </div>
          </li>
          <li class="explain_item">咨询按此收费。每次所需时间由您自行决定，建议不超过30分钟。</li>
        </ul>
      </div>

      <div class="panle_block hb nb">
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
        <div class="explain_item">我>支付>收付款>二维码收款>保存收款码>打开相册>截图>上传</div>
      </div>

      <div class="panle_block" v-show="stepFlag == 3">
        <div class="block_title">
          <span>郑重声明：</span>
        </div>
        <ul class="form_list">
           <li class="form_item tags_item all_text_item">
              <p>平台与您不存在任何雇佣或劳务关系。</p>
              <p>您通过平台给予的作答或意见，只作户参考之用。</p>
              <p>平台对您的一切作答或意见均不承担任何责任。</p>
              <p>任何用户因采用了您的作答或意见而产生的后果一律与平台无关。</p>
              <p>如用户需要您发表监（见）证意见，请另行与用户商议。</p>
              <p>不得通过平台进行任何有违国家法律法规的操作，包括但不限于各种在平台上的非法违规问答和支付。</p>
              <p>如有发现违法违规行为，请及时举报。</p>
              <p>申诉和举报的电邮地址：xxxxxxxx</p>
          </li>
        </ul>
      </div>
        
      <div class="agree_bar"  v-show="stepFlag == 3">
        <span class="custom_checkbox" :class="{'active':isReadSelect}" @click="isReadSelect = !isReadSelect" style="margin-right:20px;">阅读并同意专家的使用规则</span>
      </div>
     
      <div class="btn_block">
        <div class="btn green large plain" v-show="stepFlag == 2" @click="toNextStep(1)">上一步</div>
        <div class="btn green large" v-show="stepFlag == 2"  @click="toNextStep(3)">下一步</div>
        <div class="btn grey large" v-show="stepFlag == 3 && isChecked == 'Y'" >审核中,请等待</div>
        <div class="btn green large plain" v-show="stepFlag == 3" @click="toNextStep(2)">上一步</div>
        <div class="btn green large" v-show="stepFlag == 3 && isChecked != 'Y'" @click="submitMsg">确认提交</div>
      </div>
      <div class="check_time_tips"  v-show="stepFlag == 3">提交信息后平台将在24小时内完成验证。</div>
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
      language:[
        {name:'汉语',type:'cn',flag:false},
        {name:'英语',type:'en',flag:false}
      ],
      provice:'',
      city:'',
      companyName:'',
      companyPosition:'',
      workDesc:'',
      major:[],
      majorYearsDesc:[
        {name:'5-10年',type:'1',flag:false},
        {name:'10-15年',type:'2',flag:false},
        {name:'15-20年',type:'3',flag:false},
        {name:'20年以上',type:'4',flag:false},
      ],
      businessArea:[ ],
      gootAtList:['','','','',''],
      goodAtBusiness:[{name:'内科',type:'nk',flag:false},{name:'外科',type:'wk',flag:false}],
      lifeAndFeelDesc:'',
      policyInterpretation:'',
      outLink:[],
    
      photosList:[],
      realName:'',
      certType:[
        {name:'身份证',type:'1',flag:false},
        {name:'护照',type:'2',flag:false},
        {name:'通行证',type:'3',flag:false},
      ],
      certNum:'',
      oneOfCost:'',
      paymentCodeList:[],
      responseTime:[
        {name:'1分钟',type:'1',flag:false},
        {name:'5分钟',type:'5',flag:false},
        {name:'15分钟',type:'15',flag:false},
        {name:'30分钟',type:'30',flag:false},
        {name:'1小时',type:'60',flag:false},
        {name:'2小时',type:'120',flag:false},
        {name:'4小时',type:'240',flag:false}
      ],
      answeringTime:[
        {name:'30分钟',type:'30',flag:false},
        {name:'1小时',type:'60',flag:false},
        {name:'2小时',type:'120',flag:false},
        {name:'4小时',type:'240',flag:false},
        {name:'8小时',type:'480',flag:false},
        {name:'12小时',type:'720',flag:false},
        {name:'24小时',type:'1440',flag:false},
        {name:'48小时',type:'2880',flag:false}
      ],
      isReadSelect:true,
      areaList:AreaList,
      areaSelectPanelShow:false,
      isChecked:'N', // 当前是否是超级管理员审核状态
      isUploadingFile:false,
      fillSteps:[
        {
          text: '基础信息'
        },
        {
          text: '专业信息'
        },
        {
          text: '咨询设置'
        },
        {
          text: '确认提交'
        }
      ],
      stepFlag:0,
      openConsultExplain:false
    }
  },
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  mounted(){
  
  },
  onLoad(){
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
            title: '审核状态不可更改信息',
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
              title: '最多只能选' + max + '项',
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
            title: '图片上传中',
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
            title: '图片上传中',
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
                this.showToast('图片上传失败');
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
        this.oneOfCost = result.oneOfCost;
        this.paymentCodeList = [result.paymentCode];
 
        let photosList = [];
        result.userFiles.forEach((item)=>{
          photosList.push(item.fileUrl);
        })
        this.photosList = photosList;

        let language = result.language.split('|zxt|');
        this.language.forEach((item)=>{
          language.forEach((item2)=>{
            if(item.name == item2){
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
          if(item.name == majorYearsDesc){
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
          if(item.name == certType){
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
        this.showToast('请填写真实姓名');
        return false;
      }

      let certType = this.certType.filter((item)=>{
        return item.flag;
      });
      if(certType.length > 0){
        certType = certType[0].name;
      }else{
        this.showToast('请选择证件类型');
        return false;
      }

      if(!this.certNum){
        this.showToast('请填写证件号');
        return false;
      }


      if(!this.workPhoneNumber){
        this.showToast('请输入手机号');
        return false;
      }
      let mobileReg = /^(1[345789]\d{9})$/;
      if(!mobileReg.test(this.workPhoneNumber)){
        this.showToast('手机号格式错误');
        return false;
      }

      if(!this.emailAddress){
        this.showToast('请输入电子邮箱');
        return false;
      }

      let emailReg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if(!emailReg.test(this.emailAddress)){
        this.showToast('电子邮箱格式错误');
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
        this.showToast('请选择语言');
        return false;
      }

      if(!this.provice || !this.city ){
        this.showToast('请选择所在地区');
        return false;
      }
      let address = this.provice + '-' + this.city;

      if(!this.companyName){
        this.showToast('请输入工作单位');
        return false;
      }

      if(!this.companyPosition){
        this.showToast('请输入职务');
        return false;
      }



      let major = this.major.filter((item)=>{
        return item.flag;
      });

      if(major.length > 0){
        major = major[0].name;
      }else{
        this.showToast('请选择专业');
        return false;
      }

      let majorYearsDesc = this.majorYearsDesc.filter((item)=>{
        return item.flag;
      });

      if(majorYearsDesc.length > 0){
        majorYearsDesc = majorYearsDesc[0].name;
      }else{
        this.showToast('请选择从事专业年限');
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
        this.showToast('请选择行业');
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
        this.showToast('请选择科室');
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
          this.showToast('外部链接未填写完整');
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
        this.showToast('请选择接单时间');
        return false;
      }

      
      let answeringTime = this.answeringTime.filter((item)=>{
        return item.flag;
      });
      if(answeringTime.length > 0){
        answeringTime = answeringTime[0].type;
      }else{
        this.showToast('请选择作答时间');
        return false;
      }

     
      if(!this.oneOfCost){
        this.showToast('请填写咨询费用');
        return false;
      }
      if(this.oneOfCost*1 > 999){
        this.showToast('咨询费用不能大于999元');
        return false;
      }

      let paymentCode = '';
      if(this.paymentCodeList.length > 0){
        paymentCode = this.paymentCodeList[0];
      }else{
        this.showToast('请上传收款二维码');
      }

     
      if(!this.isReadSelect){
        this.showToast('请先阅读并同意专家的使用规则');
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
            this.showToast('提交成功，请等待审核~');
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
        this.showToast('请再次确认填写的信息~');
      }
    },

    backTop(){
      wx.pageScrollTo({
        scrollTop: 0
      })
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
      padding: 10px;
      padding-bottom: 20px;
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
