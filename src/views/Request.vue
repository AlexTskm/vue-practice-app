<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{request.fio}}</p>
    <p><strong>Телефон</strong>: {{request.phone}}</p>
    <p><strong>Сумма</strong>: {{currency(request.amount)}}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status"/></p>

    <div class="form-control">
        <label for="status">Статус</label>
        <select id="status" v-model="status">
            <option value="done">Завершён</option>
            <option value="cancelled">Отменён</option>
            <option value="active">Активен</option>
            <option value="pending">Выполняется</option>
        </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChange">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
      Заявки с ID = {{$route.params.id}} нет
  </h3>

</template>

<script>
// Компонент для формирования страницы
import AppPage from "../components/ui/AppPage.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import AppLoader from "../components/ui/AppLoader.vue";
import AppStatus from "../components/ui/AppStatus.vue";
import {currency} from "../utils/currency";
import router from "../router";

export default {
  name: "Request",
  setup() {
    const loading = ref(true) // true, т.к на false выдаёт предупреждение
    const route = useRoute()  // текущий роутер, а не весь роутер
    const router = useRouter()
    const store = useStore()
    const request = ref({})
    const status = ref()

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', route.params.id)
      status.value = request.value?.status // присваеваем значение status с сервера, если они есть
      loading.value = false
    })
// Проверяем изменение в заявке
    const hasChange = computed(() => request.value.status !== status.value)

    console.log('Route.id=', route.params.id)

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }
    const update =  async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
      // router.push('/')
    }

    return {loading, request, currency, remove, update, status, hasChange}
  },
  components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>

</style>