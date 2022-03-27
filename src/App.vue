<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useRecipeStore } from './stores/recipes'

export default defineComponent({
  name: 'App',
  setup () {
    const $store = useRecipeStore()
    onBeforeMount(() => {
      $store.worker.postMessage({ type: 'init', data: JSON.parse(JSON.stringify($store.dbConfig)) })
    })
  }
})
</script>
