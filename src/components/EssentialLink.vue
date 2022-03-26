<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :id="name"
    @click="filterByType"
  >
    <q-item-section
      v-if="name"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption>{{ subs.join(', ') }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRecipeStore } from '../stores/recipes'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    name: {
      type: String,
      default: ''
    },
    subs: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const $store = useRecipeStore()
    const getIcon = (category: string) => {
      if (category === 'Amanides') return 'fa-solid fa-carrot'
      else return 'fa-solid fa-print'
    }
    const filterByType = (event: Partial<Event>) => {
      let target = event.target as HTMLElement
      while (!target.classList.contains('q-item')) {
        target = target.parentNode as HTMLElement
      }
      $store.selected.category = target.id
      Object.values($store.categories).forEach((category: any) => {
        if (category.name === target.id) {
          category.isSelected = true
        } else {
          category.isSelected = false
        }
      })
      Object.values($store.recipes).forEach((recipe: any) => {
        if (recipe.cat === target.id) {
          recipe.isFiltered = false
        } else {
          recipe.isFiltered = true
        }
      })
    }
    return {
      filterByType,
      getIcon
    }
  }
})
</script>
