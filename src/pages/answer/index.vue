<template>
  <div class="container">
    <div class="order_form_panel">
      <div class="panle_block nb">
        <div class="block_title">作答内容</div>
        <div class="problem_content">
          <textarea  maxlength="2000" placeholder="请输入作答内容" v-model="answer"></textarea>
        </div>
      </div>
      <div class="panle_block npb">
        <div class="block_title">图片附件</div>
        <div class="problem_content">
          
          <div class="files_group">
              <div class="title">图片</div>
          
              <div class="img_file_item"  v-for="(item,index) in photosList" :key="index">
                <img class="img_file" :src="item">
                <img class="delete_icon" src="../../../static/img/delete_icon3.png" @click="deletePhoto(index)">
              </div>
              <img class="add_files_icon" src="../../../static/img/add_files_icon.png"  v-show="photosList.length < 5" @click="upLoadPhoto">
          </div>
        
        </div>
      </div>
    </div>

    <div class="btn_block">
      <div class="btn green plain">保存</div>
      <div class="btn green" @click="submitAnswer">提交作答</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      answer:'',
      photosList:[],
    }
  },
  computed: {
    ...mapState({
      
    })
  },
  mounted(){

  },
  methods: {
    upLoadPhoto(){
      let that = this;
      wx.chooseImage({
        count: 5 - that.photosList.length,
        success(res) {
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
      this.photosList.splice(index,1);
    },
    submitAnswer(){
      if(!this.answer){
        this.showToast('请填写作答内容');
        return;
      };
      let userFiles  = [];
      if(this.photosList.length > 0){
        this.photosList.forEach((item)=>{
          userFiles.push({userId:this.userData.userId,fileUrl:item})
        })
      };

      this.$http.request({
        url:'AnswerOrder',
        data: {
          answer:this.answer,
          userFiles:userFiles
        },
        flyConfig:{
          method: 'post'
        }
      }).then(res => {
        if(res.code == 1){
            this.showToast('提交成功，请等待用户确认');
            setTimeout(()=>{
              this.$router.go(-1);
            },1500)
        } 
      })

    },
  },
  onShow(){

 
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
  justify-content: flex-end;
  padding-right: 15px;
  .btn{
    width: 80px;
    height: 32px;
    margin-left: 10px;
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

  .problem_content{
    textarea{
      border:1px solid #eee;
      background-color: #fefefe;
      border-radius: 4px;
      width: 100%;
      height: 240px;
      padding:10px;
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
    }
  }
}

</style>
