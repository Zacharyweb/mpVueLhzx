<script>
import store from './store'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
  
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
    that.updateUserMsg({type:'e'});
  },
   methods: {
    ...mapActions('counter', [
      'updateIsX',
      'updateUserMsg'
    ]),
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
