<template>
    <div class="breadcrumbs" v-if="back">
        <router-link to="/" class="text-white">Вернуться к списку заявок</router-link>
    </div>
    <div class="card">
        <h1 class="card-title">
            {{ title }}
            <slot name="header"/> <!-- Указываем место куда складываем контент-->
        </h1>


        <slot/> <!-- Указываем место куда складываем контент-->
    </div>

</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      required: true
    },
      back: {
        type: Boolean,
        default: false
      }
  },
  setup(props) {
    document.title = `${props.title} | Клон Банка`
  }
}
</script>

<style scoped>

</style>