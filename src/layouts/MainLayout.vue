<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Receptes <span class="category-title" v-show="category">{{ category }}</span>
        </q-toolbar-title>

        <div>v2</div>
      </q-toolbar>
    </q-header>

    <left-drawer/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useRecipeStore } from '../stores/recipes'
import LeftDrawer from 'components/LeftDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    LeftDrawer
  },

  setup () {
    const $store = useRecipeStore()

    $store.worker.onmessage = message => {
      const type = message.data.type.toLowerCase()
      if (type === 'init') {
        $store.recipes = message.data.data.items
        $store.categories = message.data.data.categories
        console.log($store.categories[0])
      }
    }

    onBeforeMount(() => {
      $store.worker.postMessage({ type: 'init', data: JSON.parse(JSON.stringify($store.dbConfig)) })
    })

    return {
      toggleLeftDrawer () {
        $store.leftDrawerOpen = !$store.leftDrawerOpen
      },
      category: computed(() => {
        return $store.selected.category
      })
    }
  }
})
</script>

<style scoped lang="scss">
  .category-title::before {
    content: '- '
  }
</style>
