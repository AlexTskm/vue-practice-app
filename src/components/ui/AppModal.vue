<template>
  <div class="modal-backdrop" @click="$emit('close')">

  </div>
  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>

    <slot />
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>