import Vue from 'vue'
import Vuex from 'vuex'
import template from './template'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    template
  }
})
