<template>
<!--  <main-layout></main-layout>-->
<!--  <auth-layout></auth-layout>-->
  <component :is="layout + '-layout'" v-if="layout"/>
</template>

<script>
import {computed} from "vue";
import {useRoute} from "vue-router";
import MainLayout from "./layout/MainLayout.vue";
import AuthLayout from "./layout/AuthLayout.vue";
export default {
  setup() {
    const route = useRoute()

    // console.log('route.meta=',computed(() => route.meta.layout))
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {MainLayout, AuthLayout}
}
</script>