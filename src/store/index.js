import {createStore, createLogger} from 'vuex'
import request from "./modules/request.module";
import auth from './modules/auth.module'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  // В режиме отладки(разработки) включаем логирование
  plugins.push(createLogger())

}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false
    }
  },
  // Синхронные действия делаем в мутациях
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    openSidebar(state) {
      state.sidebar = true
    },
    closeSidebar(state) {
      state.sidebar = false
    }
  },
  actions: {
    // делаем, чтобы сообщение закрывалось само через какое-то время
    setMessage({commit}, message) {
      commit('setMessage', message)  // Вызываем мутацию
      setTimeout(() => {
        commit('clearMessage')        // Вызываем мутацию
      }, 5000)
    }
  },
  modules: {
    auth,
    request
  }
})
