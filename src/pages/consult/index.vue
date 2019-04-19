<template>
  <div class="container">
    <div class="custom_tabs">
      <div class="tab_item" :class="{'active':currentTab == 0}" @click="changeTab(0)">我的咨询(2)</div>
      <div class="tab_item" :class="{'active':currentTab == 1}" @click="changeTab(1)">客户咨询(2)</div>
      <span class="active_bar active25" :class="{'active75':currentTab == 1}"></span>
    </div>
    <div style="height:45px;"></div>

    <div class="orders_list" v-show="currentTab == 0">
      <!-- 待接单 -->
      <div class="order_item" @click="toOrderDetail(1,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="time_count">00:05:45</span>
            <span class="status_text">待接单</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">预计作答时间：接单后确认</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

      <!-- 待重新确认 -->
      <div class="order_item"  @click="toOrderDetail(2,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">待重新确认</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">预计作答时间：接单后确认</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
       
      </div>

     <!-- 待作答 -->
      <div class="order_item" @click="toOrderDetail(3,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="time_count">00:05:45</span>
            <span class="status_text">待作答</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">预计作答时间：2019/04/13 20:30</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

      
    <!-- 待用户确认 -->
    <div class="order_item" @click="toOrderDetail(4,'u')">
      <div class="order_msg0">
        <span class="order_no">订单编号：2019041323w23212</span>
        <div class="order_status">
          <span class="status_text">已作答/待确认</span>  
        </div>
      </div>
      <div class="top_block">
        <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
        <div class="top_block_right">
          <div class="order_msg1">
            <span class="experts_name">朱两边</span>
            <span class="consult_msg">作答时间：2019/04/13 19:30</span>
          </div>
          <div class="order_msg2">
            <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
            <span class="consult_price">￥66</span>
          </div>
        </div>
      </div>
      <div class="bottom_block">
        <div class="question">
            <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
        </div>
        <div class="order_time">2018-12-14 00:00:00</div>
      </div>
      <div class="other_msg_block">
        <span class="other_msg">专家已作答，请确认是否满意作答~</span>
        <span class="action_btn">前往确认</span>
      </div>
    </div>

      

      <!-- 待支付 -->
      <div class="order_item" @click="toOrderDetail(5,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">已作答/待支付</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
        <div class="other_msg_block">
          <span class="other_msg">待支付80元</span>
          <span class="action_btn">前往支付</span>
        </div>
      </div>

      <!-- 待评价 -->
      <div class="order_item" @click="toOrderDetail(6,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">已作答/待评价</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
        <div class="other_msg_block">
          <span class="other_msg">订单已完成，可对专家进行评价</span>
          <span class="action_btn" @click="toComment">去评价</span>
        </div>
   
      </div>

      <!-- 已完成 -->
      <div class="order_item" @click="toOrderDetail(7,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text grey">已完成</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
    
      </div>

      <!-- 申诉中 -->
      <div class="order_item" @click="toOrderDetail(8,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text red">申诉中</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

      <!-- 已关闭 -->
      <div class="order_item" @click="toOrderDetail(9,'u')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text grey">已关闭</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="order_msg2">
              <span class="experts_position">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>
      
    </div>

    <div class="orders_list" v-show="currentTab == 1">
      <!-- 待接单 -->
      <div class="order_item" @click="toOrderDetail(1,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="time_count">00:05:45</span>
            <span class="status_text">待接单</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户1</span>
              <span class="consult_msg">预计作答时间：接单后确认</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户1相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

      <!-- 待重新确认 -->
      <div class="order_item"  @click="toOrderDetail(2,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">待重新确认</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户2</span>
              <span class="consult_msg">预计作答时间：接单后确认</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户2相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

     <!-- 待作答 -->
      <div class="order_item" @click="toOrderDetail(3,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="time_count">00:05:45</span>
            <span class="status_text">待作答</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户3</span>
              <span class="consult_msg">预计作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户3相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
       
      </div>

      <!-- 待客户确认 -->
      <div class="order_item" @click="toOrderDetail(4,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">已作答/待确认</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户4</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户4相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

      <!-- 待支付 -->
      <div class="order_item" @click="toOrderDetail(5,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">已作答/待支付</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户4</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户4相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>

      <!-- 待评价 -->
      <div class="order_item" @click="toOrderDetail(6,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text">已作答/待评价</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户5</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户5相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
     
      </div>

      <!-- 已完成 -->
      <div class="order_item" @click="toOrderDetail(7,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text grey">已完成</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户6</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户6相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
     
      </div>


      <!-- 申诉中 -->
      <div class="order_item" @click="toOrderDetail(8,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text red">申诉中</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">客户6</span>
              <span class="consult_msg">作答时间：2019/04/13 19:30</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">客户6相关自我介绍相关自我介绍相关自我介绍相关自我介绍相关自我介绍</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
     
      </div>

       <!-- 已关闭 -->
      <div class="order_item" @click="toOrderDetail(9,'e')">
        <div class="order_msg0">
          <span class="order_no">订单编号：2019041323w23212</span>
          <div class="order_status">
            <span class="status_text grey">已关闭</span>  
          </div>
        </div>
        <div class="top_block">
          <img class="experts_avatar" src="../../../static/img/avatar.jpeg">
          <div class="top_block_right">
            <div class="order_msg1">
              <span class="experts_name">朱两边</span>
            </div>
            <div class="order_msg2">
              <span class="customer_info">前所得税副处&nbsp;|&nbsp;杭州市税局大企业处</span>
              <span class="consult_price">￥66</span>
            </div>
          </div>
        </div>
        <div class="bottom_block">
          <div class="question">
              <span class="question_title">问题：</span>发票违法被处罚后再次出现同样的问题，是否还要进行处罚，再次处罚是否违反一事不二罚的原则？
          </div>
          <div class="order_time">2018-12-14 00:00:00</div>
        </div>
      </div>
      
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentTab:0,
    }
  },
  computed:{
    ...mapState({
      consultListTab: state => state.counter.consultListTab
    })
  },

  components: {
    
  },

  methods: {

    changeTab(num){
      if(this.currentTab == num){
        return;
      }
      this.currentTab = num;
    },
    toOrderDetail(status,id){
      this.$router.push({path:'/pages/consultDetail/index',query:{status:status,id:id}});
    },
    toComment(){
       this.$router.push({path:'/pages/comment/index',query:{orderId:1}});
    }
  },
  created () {
  
  },
  onLoad: function (options) {
     console.log(options)
     this.currentTab = this.consultListTab;
  },
}
</script>
<style lang="less" scoped>
  .custom_tabs{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
</style>