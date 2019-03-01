<template>
  <div class="container">

    <div class="comment_item">
      <div class="comment_q">是否会推荐给好友？</div>
      <div class="comment_a">
        <span class="custom_checkbox active">是</span>
        <span class="custom_checkbox">否</span>
      </div>
    </div>

    <div class="comment_item">
      <div class="comment_q">下次是否还会咨询该专家？</div>
      <div class="comment_a">
        <span class="custom_checkbox active">是</span>
        <span class="custom_checkbox">否</span>
      </div>
    </div>

    <div class="comment_tags">
      <span class="tag_item active">专业</span>
      <span class="tag_item">详细</span>
      <span class="tag_item">有耐心</span>
    </div>

    <div class="comment_input">
      <textarea placeholder="请输入评价内容"></textarea>
    </div>

    <div class="visible_block"> 
        <span class="custom_checkbox active" style="margin-right:20px;">所有好友可见</span>
        <span class="custom_checkbox" style="margin-right:0;">部分好友可见</span>
    </div>
    <div class="submit_block">
       <div class="btn large green">提交</div>
    </div>

  </div>
</template>
<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  data () {
    return {
     cashAmount:0
    }
  },

  components: {
    
  },

  methods: {
    toBankCard(){
      this.$router.push('/pages/bankCard/index');
    }
    
  },
  created () {
   
  },
  onShow(){
 
  }
}
</script>

<style lang="less" scoped>
  .container{

    background-color: #fff;
    padding-top: 20px;
  
  }
  .comment_item{
    padding:0 15px;
    margin-bottom: 10px;
    font-size: 13px;
    color: #666;
    .comment_q{

      margin-bottom: 5px;
    }
    .comment_a{
      display: flex;
    }
  }
  .comment_tags{
    display: flex;
    padding: 0 15px;
    flex-wrap: wrap;
    margin-top: 10px;

    .tag_item{
      height: 20px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      border:1px solid #1fb7b6;
      background-color: #f3fbfb;
      border-radius: 11px;
      padding:0 10px;
      color: #1fb7b6;
      font-size: 12px;
    }
    .tag_item.active{
      background-color :#1fb7b6;
      color: #fff;
    }
  }
  .comment_input{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    textarea{
      width: 315px;
      border:1px solid #e6e6e6;
      height: 150px;
      border-radius: 8px;
      font-size: 13px;
      padding:15px;

    }
  }
  .visible_block{
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding:0 15px;
  }
  .submit_block{
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }

</style>