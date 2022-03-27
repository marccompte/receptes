<template>
  <div class="loading" v-if="loading">
    <q-spinner-cube
          color="primary"
          size="10em"
        />
    <p>Carregant receptes ...</p>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useRecipeStore } from './stores/recipes'

export default defineComponent({
  name: 'App',
  setup () {
    const $store = useRecipeStore()

    const loading = computed(() => $store.recipes.length === 0)

    onBeforeMount(() => {
      $store.worker.postMessage({
        type: 'init',
        data: JSON.parse(JSON.stringify($store.dbConfig))
      })
    })

    return {
      loading
    }
  }
})
</script>

<style scoped lang="scss">
  .loading {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 10000;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-shadow: 2px 2px  5px $primary;
  }
  .loading p {
    font-size: 2em;
    color: $primary;
  }
</style>
