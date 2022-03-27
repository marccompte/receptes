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
          <span class="category-title" v-show="title" v-for="part in title" :key="part">{{ part }}</span>
        </q-toolbar-title>

        <div>v2</div>
      </q-toolbar>
    </q-header>

    <left-drawer ref="leftDrawer"/>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'
import LeftDrawer from 'components/LeftDrawer.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    LeftDrawer
  },

  setup () {
    const $store = useRecipeStore()
    const $route = useRoute()
    const leftDrawer = ref()
    $store.worker.onmessage = message => {
      const type = message.data.type.toLowerCase()
      if (type === 'init') {
        $store.recipes = message.data.data.items
        $store.categories = message.data.data.categories
      }
    }

    return {
      leftDrawer,
      toggleLeftDrawer () {
        leftDrawer.value.toggleLeftDrawer()
        // $store.leftDrawerOpen = !$store.leftDrawerOpen
      },
      title: computed(() => {
        if ($route.path === '/') {
          if ($store.selected.category) {
            return ['Receptes', $store.selected.category]
          } else {
            return ['Receptes']
          }
        } else {
          const currentRecipe = JSON.parse(JSON.stringify($store.currentRecipe))
          if (currentRecipe) {
            return [
              currentRecipe.cat,
              currentRecipe.tit.substring(0, 1).toUpperCase() + currentRecipe.tit.substring(1)
            ]
          } else {
            return ['Receptes', $store.selected.category]
          }
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: .6s;
    transition-property: all;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: scale(1.2);
  }
  .category-title {
    padding-right: .3em;
  }
  .category-title::before {
    content: '- '
  }
  .category-title:first-child::before {
    content: none;
  }
</style>
