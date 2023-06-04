<template>
  <app-loader v-if="loading"/>
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>


    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false"/>  <!-- Пришло событие создание заявки закрываем модальное окно-->
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "../components/ui/AppPage.vue";
import RequestTable from "../components/request/RequestTable.vue";
import {computed, ref, onMounted, watch} from "vue";
import AppModal from "../components/ui/AppModal.vue";
import RequestModal from "../components/request/RequestModal.vue";
import RequestFilter from "../components/request/RequestFilter.vue";
import {useStore} from "vuex";
import AppLoader from "../components/ui/AppLoader.vue";

export default {
  name: 'Home',
  emits: ['close'],
  components: {AppLoader, AppPage, RequestTable, AppModal, RequestModal, RequestFilter},
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    // watch(filter, val => console.log(val))

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')

      console.log('request/load requests=', requests)

      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests']
      .filter(request => {
        if (filter.value.name) {
          return request.fio.includes(filter.value.name)
        }
        return request
      })
      .filter(request => {
        if (filter.value.status) {
          return filter.value.status === request.status
        }
        return request
      })
    )

    console.log('request/requests requests=', requests)

    return {
      modal,
      requests,
      loading,
      filter
    }
  }
}
</script>
