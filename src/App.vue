<template>
  <div class="loading" v-if="loading">
    <base-spinner label="Carregant receptes ..."/>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useRecipeStore } from './stores/recipes'
import BaseSpinner from './components/BaseSpinner.vue'

export default defineComponent({
  name: 'App',
  components: { BaseSpinner },
  setup () {
    const $store = useRecipeStore()

    const loading = computed(() => $store.recipes.length === 0)

    onBeforeMount(() => {
      $store.worker.postMessage({
        type: 'init',
        data: JSON.parse(JSON.stringify($store.dbConfig))
      })
    })

    $store.worker.onmessage = message => {
      const type = message.data.type.toLowerCase()
      if (type === 'init') {
        $store.recipes = message.data.data.items
        $store.categories = message.data.data.categories
      }
      if (type === 'login') {
        $store.isLoggingIn = false
        if (message.data.data.error) {
          $store.userIsAdmin = false
          $store.errors.login = 'Les credencials no són vàlides.'
        } else {
          $store.userIsAdmin = true
          $store.modals.login = false
        }
      }
    }

    return {
      loading
    }
  }
})
</script>

<style lang="scss">
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
