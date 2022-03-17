<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
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

export default defineComponent({
  name: 'EssentialLink',
  props: {
    name: {
      type: String,
      default: ''
    },
    subs: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup () {
    const getIcon = category => {
      console.log(category)
      if (category === 'Amanides') return 'fa-solid fa-carrot'
      else return 'fa-solid fa-print'
    }
    return {
      getIcon
    }
  }
})
</script>
