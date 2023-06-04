// Модуль работы с базой данных
import axios from "../../axios/request";
import store from '../index'
export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests
    },
    addRequest(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        // Получаем token из auth.module.js
        // Получаем payload с формы и отправляем его на сервер
        const token = store.getters['auth/token']
        const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
        commit('addRequest', {...payload, id: data.name})

        console.log('Ответ с сервера=', data)

        // Выводим сообщение
        dispatch('setMessage', {
          value: 'Заявка успешно создана',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: `Ошибка создания ${e.message}`,
          type: 'danger'
        }, {root: true})
      }

    },
    async load({ commit, dispatch }) {
      try {
        const token = store.getters['auth/token']

        // console.log('token=', token)

        const {data} = await axios.get(`/requests.json?auth=${token}`)

        console.log('Получили с сервера data=', data)
        // Формируем из возврата data, массив
        const requests = Object.keys(data).map(id => ({...data[id], id}))

        console.log('Преобразованный массив requests=', requests)

        commit('setRequests', requests)
      } catch (e) {
        dispatch('setMessage', {
          value: `Ошибка создания ${e.message}`,
          type: 'danger'
        }, {root: true})
      }
    },
    async loadById({ commit, dispatch }, id) {
      try {
        const token = store.getters['auth/token']

        // console.log('token=', token)

        const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)

        console.log('loadById: Получили с сервера data=', data)

        return data

      } catch (e) {
        dispatch('setMessage', {
          value: `Ошибка получения по ID ${e.message}`,
          type: 'danger'
        }, {root: true})
      }
    },
    async remove({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']

        // console.log('token=', token)

        await axios.delete(`/requests/${id}.json?auth=${token}`)
        dispatch('setMessage', {
          value: 'Заявка удалена',
          type: 'primary'
        },{root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: `Ошибка удаления ${e.message}`,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({ dispatch }, request) {
      try {

        // debugger
        const token = store.getters['auth/token']

        // console.log('token=', token)

        await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
        dispatch('setMessage', {
          value: 'Заявка обновлена',
          type: 'primary'
        },{root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: `Ошибка создания ${e.message}`,
          type: 'danger'
        }, {root: true})
      }
    }
  },
  getters: {
    requests(state) {
      return state.requests
    }
  }
}