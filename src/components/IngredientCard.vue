<template>
  <q-card
    clickable
    v-ripple
    >
    <q-item-section>
      <q-item-label>{{ ing.name }}</q-item-label>
      <q-item-label caption>{{ ing.description }}</q-item-label>
    </q-item-section>
  </q-card>
</template>

<script>
export default {
  name: 'IngredientCard',
  props: ['ing']
}
</script>
