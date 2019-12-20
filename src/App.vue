<script>
import store from "./store";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      userData: state => state.counter.userData
    })
  },
  onLaunch() {

  },
  created() {
    // 调用API获取机型信息
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    let modelmes = systemInfo.model;
    if (modelmes.search("iPhone X") != -1) {
      that.updateIsX(true);
    }

    // zh_CN 中文简体
    // zh_HK 香港繁体
    // zh_TW 台湾繁体
    // en 英文

    let systemLang = "cn_j";
    // if(systemInfo.language == 'zh_HK' || systemInfo.language == 'zh_TW '){
    //   systemLang = 'cn_f';
    // }
    if (systemInfo.language == "en") {
      systemLang = "en";
    }

    let defaultLang = wx.getStorageSync("langFlag");
    if (!defaultLang) {
      wx.setStorage({ key: "langFlag", data: systemLang });
    }

    // this.$t.setLocale( defaultLang || systemLang || 'cn_j');
    this.$t.setLocale("cn_j"); // 现在强制中文 后面需多语言解除上面注释即可

    let lang = this.$t.getLanguage();
    that.updateLanguage(lang);

    // wx.getSystemInfo({
    //   success:  res=>{
    //     let modelmes = res.model;
    //     if (modelmes.search('iPhone X') != -1) {
    //       that.updateIsX(true);
    //     }
    //   }
    // });

    let userDataStr = wx.getStorageSync("userData");
    if (userDataStr) {
      let userData = JSON.parse(userDataStr);
      that.updateUserMsg(userData);
    } else {
    }
  },
  methods: {
    ...mapActions("counter", ["updateIsX", "updateUserMsg", "updateLanguage"]),

  }
};
</script>