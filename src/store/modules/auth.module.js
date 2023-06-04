import axios from "axios";
import {error} from "../../utils/error";

const TOKEN_KEY = 'jwt-token'
export default {
  namespaced: true, // для того чтобы названия action были локальны
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  mutations: {
    // Здесь пишем синхронный код изменяющий state
    setToken(state, token) {
      state.token = token
    // сохраняем token
      localStorage.setItem(TOKEN_KEY, token)

      console.log('Сохраняем token=', token)
    },
    logout(state) {
      // Обнуляем и удаляем token
      console.log('logout обнуляем token и удаляем его=', state.token)

      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions:{
    async login({ commit, dispatch }, payload) {
      try {
        // Подключение к Firebase
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})  // Будем ждать пока не выполниться

        console.log('Data=', data.idToken);

        commit('setToken', data.idToken)
        commit('clearMessage', null, {root: true})

        console.log('Попали после Submit payload=', payload, process.env.VUE_APP_FB_KEY)
        // Здесь будем делать запрос к серверу

      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {root: true})
        console.log(error(e.response.data.error.message));
        throw new Error() // Возвращаем ошибку для дальнейшей обработки
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) { // Символ _ указывает, что мы не работаем с первым параметром state
      return !!getters.token
    }
  }
}