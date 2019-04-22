<script>
import store from './store'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  created () {
    // 调用API获取机型信息
    let that = this;
    wx.getSystemInfo({
      success:  res=>{
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.updateIsX(true);
        }
      }
    });
    that.getSetting();
  },
   methods: {
    ...mapActions('counter', [
      'updateIsX',
      'updateUserMsg'
    ]),

    // 检测用户是否已授权
    getSetting(){
      let that = this;
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                let data = that.userData || {};
                that.updateUserMsg({...data,...res.userInfo});
              }
            })
          }
        }
      })
    },
    
  }
}
</script>

<style>
/* this rule will be remove */
/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */
</style>
