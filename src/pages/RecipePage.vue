<template>
  <q-page class="row">
    <q-toolbar class="bg-white text-primary">
      <q-toolbar-title>Ingredients</q-toolbar-title>
    </q-toolbar>
    <div class="flex justify-center q-col-gutter-xs">
      <q-card clickable v-ripple v-for="ing in currentRecipe.ing" :key="ing[1]">
        <q-item-section>
          <q-item-label>{{ ing[0] }}</q-item-label>
          <q-item-label caption>{{ ing[1] }}</q-item-label>
        </q-item-section>
      </q-card>
    </div>

    <q-toolbar class="bg-white text-primary">
      <q-toolbar-title>Elaboració</q-toolbar-title>
    </q-toolbar>
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="(stp, index) in currentRecipe.stp" :key="stp">
        <q-item-section>
          <q-item-label overline>Pas {{ index + 1 }}</q-item-label>
          <q-item-label>{{ stp[0].toUpperCase() }}{{ stp.substring(1) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="end flex justify-center">
      <h6>Bon profit!</h6>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRecipeStore } from '../stores/recipes'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $store = useRecipeStore()
    const currentRecipe = computed(() => {
      if ($store.currentRecipe) {
        return JSON.parse(JSON.stringify($store.currentRecipe))
      } else {
        return ''
      }
    })
    return { currentRecipe }
  }
})
</script>

<style scoped lang="scss">
  .q-page {
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .q-toolbar__title {
    border-bottom: 2px solid $primary;
    margin: 40px 0px;
  }
  .end {
    width: 100%;
  }
  .end .h6 {
    margin-bottom: 100px;
  }
  .q-card {
    padding: 10px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 200px;
    background: white;
    margin: 10px;
    overflow: hidden;
    float: left;
    text-align: center;
    font-size: 1.3rem;
  }
  .q-card .text-caption {
    font-size: .8rem;
  }
  .q-list {
    width: 100%;
  }
  .q-item {
    padding: 20px;
    min-width: 100%;
  }
  .text-overline {
    text-transform: uppercase;
    font-size: 1.2em;
    margin-bottom: 10px;
  }
</style>
