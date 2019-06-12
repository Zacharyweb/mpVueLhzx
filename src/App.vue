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
    let systemInfo = wx.getSystemInfoSync();
    let modelmes = systemInfo.model;
    if (modelmes.search('iPhone X') != -1) {
      that.updateIsX(true);
    }

    // zh_CN 中文简体
    // zh_HK 香港繁体
    // zh_TW 台湾繁体
    // en 英文

    let systemLang = 'cn_j';
    if(systemInfo.language == 'zh_HK' || systemInfo.language == 'zh_TW '){
      systemLang = 'cn_f';
    }
    if(systemInfo.language == 'en'){
      systemLang = 'en';
    }

    let defaultLang = wx.getStorageSync('langFlag');
    if(!defaultLang){
      wx.setStorage({key: 'langFlag', data: systemLang});
    }

    this.$t.setLocale( defaultLang || systemLang || 'cn_j');
    let lang = this.$t.getLanguage();
    that.updateLanguage(lang)

    // wx.getSystemInfo({
    //   success:  res=>{
    //     let modelmes = res.model;
    //     if (modelmes.search('iPhone X') != -1) {
    //       that.updateIsX(true);
    //     }
    //   }
    // });
    
    let userDataStr = wx.getStorageSync('userData');
    if (userDataStr) {
      let userData = JSON.parse(userDataStr);
      that.updateUserMsg(userData);
    }else{
      // that.getSetting();
    }
    
  },
   methods: {
    ...mapActions('counter', [
      'updateIsX',
      'updateUserMsg',
      'updateLanguage'
    ]),
    
    // 检测用户是否已授权
    // getSetting(){
    //   let that = this;
    //   wx.getSetting({
    //     success: function(res){
    //       if (res.authSetting['scope.userInfo']) {
    //         wx.getUserInfo({
    //           success: function(res) {
    //             let data = that.userData || {};
    //             that.updateUserMsg({...data,...res.userInfo});
    //           }
    //         })
    //       }
    //     }
    //   })
    // },
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
