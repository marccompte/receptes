<template>
  <q-page class="row">
    <q-toolbar class="bg-white text-primary">
      <q-toolbar-title>Ingredients</q-toolbar-title>
    </q-toolbar>
    <div class="flex justify-center q-col-gutter-xs">
      <q-card
        clickable
        v-ripple
        v-for="ing in currentRecipe.ing"
        :key="ing.key"
        :class="{ done: ing.done }"
        @click="toggleIngredient(ing)"
        >
        <q-item-section>
          <q-item-label>{{ ing.name }}</q-item-label>
          <q-item-label caption>{{ ing.description }}</q-item-label>
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
        return $store.currentRecipe
      } else {
        return ''
      }
    })
    const toggleIngredient = (ing) => {
      $store.currentRecipe.ing[ing.key].done = !$store.currentRecipe.ing[ing.key].done
    }
    return {
      currentRecipe,
      toggleIngredient
    }
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
  .q-card.done {
    background: white;
    color: #cacaca;
    text-decoration: line-through;
  }
  .q-card.done::after {
    content: 'fet';
    color: white;
    background: #a9dba9;
    padding: 2px 10px;
    border-bottom-left-radius: 5px;
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: .8em;
  }
  .q-card.done .text-caption {
    color: #cacaca;
    text-decoration: line-through;
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
    background: $seco;
    margin: 10px;
    overflow: hidden;
    float: left;
    text-align: center;
    font-size: 1.3rem;
    color: $primary;
    cursor: pointer;
  }
  .q-card .text-caption {
    font-size: .8rem;
    color: $primary;
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
