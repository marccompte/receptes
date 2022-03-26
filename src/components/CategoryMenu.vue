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
import { defineComponent } from 'vue'
import { useRecipeStore } from '../stores/recipes'

export default defineComponent({
  name: 'CategoryMenu',
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
  setup () {
    const $store = useRecipeStore()
    const filterByType = async (event: Partial<Event>) => {
      let target = event.target as HTMLElement
      while (!target.classList.contains('q-item')) {
        target = target.parentNode as HTMLElement
      }
      await $store.selectCategory(target)
      $store.selectRecipe(target)
    }
    return {
      filterByType
    }
  }
})
</script>
