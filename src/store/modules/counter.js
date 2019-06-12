import Vue from 'vue'
const state = {
  count: 0,
  isX:false,
  userData:null,
  consultListTab:0,
  i18n:{}
}

const mutations = {
  INCREMENT: (state) => {
    const obj = state
    obj.count += 1
  },
  DECREMENT: (state) => {
    const obj = state
    obj.count -= 1
  },
  UPDATEISX: (state,flag) => {
    const obj = state
    obj.isX = flag;
  },
  UPDATEUSER: (state,data) => {
    const obj = state;
    obj.userData = data;
  },
  UPDATECONSULTLISTTAB: (state,num) => {
    const obj = state;
    obj.consultListTab = num;
  },
  UPDATELANGUAGE:(state,lang) => {
    const obj = state;
    obj.i18n = lang;
  }
}

const actions = {
  increment ({commit}) {
    commit('INCREMENT')
  },
  decrement ({commit}) {
    commit('DECREMENT')
  },
  updateIsX ({commit},flag) {
    commit('UPDATEISX',flag)
  },
  updateUserMsg({commit},data) {
    commit('UPDATEUSER',data)
  },
  updateLanguage({commit},data) {
    commit('UPDATELANGUAGE',data)
  },
  updateConsultListTab({commit},num){
    commit('UPDATECONSULTLISTTAB',num)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
