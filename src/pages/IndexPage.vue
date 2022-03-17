<template>
  <q-page class="row">
    <q-card
      class="my-card text-indigo"
      v-for="recipe in recipes"
      :key="recipe.key"
      >
      <q-card-section class="title">
        <div class="text-subtitle2">{{ recipe.cat }} <em v-if="recipe.sub">{{ recipe.sub }}</em></div>
        <div class="text-h6">{{ recipe.tit }}</div>
      </q-card-section>

      <q-card-section class="abstract">
        <h6>Pas 1/{{ recipe.stp.length }}</h6>
        {{ recipe.stp[0] }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions class="absolute-bottom">
        <q-btn flat>Veure tota la recepta</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from '../components/models'
import { computed, defineComponent, ref } from 'vue'
import { useRecipeStore } from '../stores/recipes'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $store = useRecipeStore()
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ])
    const meta = ref<Meta>({
      totalCount: 1200
    })
    const recipes = computed(() => {
      return $store.recipes
    })
    return { todos, meta, recipes }
  }
})
</script>

<style scoped lang="scss">
h6 {
  padding: 0px;
  margin: 5px;
}
.title {
  height: 120px;
  background: $primary;
  color: $seco;
}
.abstract {
  height: 235px;
  overflow: hidden;
}
.q-page {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.q-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 200px;
  height: 400px;
  background: $seco;
  margin: 10px;
}
</style>
